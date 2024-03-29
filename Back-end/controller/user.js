const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = require("../model/userModel");
const productDatas = require("../model/productModel");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await schema.findOne({ email }); // Check if user already exists
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new schema({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};

// Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await schema.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60,
      });
      res.setHeader("Authorization", token);
      console.log(token, "requested token");

      res.status(200).json({ message: "welcome user", token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};

// const userGetProducts = async (req, res) => {
//   try {
//     const allProducts = await productDatas.find();
//     res.status(200).json({ message: "All Product List", allProducts });
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: "All Product List Not Found: ", error: error.message });
//     console.log(error);
//   }
// };


const userGetProducts = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await productDatas.find();

    // Fetch user's cart items
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await schema.findOne({ email: decoded.email });
    const userCart = user.cart;

    // Check if each product is in the user's cart
    const productsWithCartStatus = allProducts.map(product => ({
      ...product.toObject(),
      inCart: userCart.includes(product._id.toString()) // Check if product is in cart
    }));

    res.status(200).json({ allProducts: productsWithCartStatus });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};


// user can get product by category wise
const getCategoryWise = async (req, res) => {
  const categoryList = req.params.category;
  try {
    let categoryProducts;
    if (categoryList.toLowerCase() === "laptop") {
      categoryProducts = await productDatas.find({
        category: { $in: "laptop" },
      });
      return res.json(categoryProducts);
    }
    if (categoryList.toLowerCase() === "phone") {
      categoryProducts = await productDatas.find({
        category: { $in: "phone" },
      });
      return res.json(categoryProducts);
    }
    categoryProducts = await productDatas.find({
      category: { $in: categoryList },
    });
    return res.json(categoryProducts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// user add product to cart

const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productDatas.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verify user token
    const token = req.cookies.token; // Assuming token is sent via cookies
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await schema.findOne({ email: decoded.email });

    // Check if the product is already in the cart
    if (user.cart.includes(productId)) {
      return res
        .status(409)
        .json({ message: "Product is already in the cart" });
    }

    // Add the product to the cart
    user.cart.push(productId);
    await user.save();

    // Fetch updated user information with populated cart
    const updatedUser = await schema.findById(user._id).populate("cart");

    res.status(200).json({
      message: "Product added to cart successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productDatas.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await schema.findOne({ email: decoded.email });

    // Check if the product is in the cart
    const index = user.cart.indexOf(productId);

    if (index === -1) {
      return res.status(404).json({ message: "Product not in the cart" });
    }

    // Remove the product from the cart
    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", error: err.message });
  }
};


// user can get specific product details

const specificProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const specificProduct = await productDatas.findById(req.params.id);

    if (specificProduct) {
      return res
        .status(200)
        .json({ message: "Specific Product :", specificProduct });
    }
    return res.status(404).json({ error: "product not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await schema
      .findOne({ email: decoded.email })
      .populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cart.length === 0) {
      return res.status(200).json({ message: "User cart is empty" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};


// const getCart = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await schema
//       .findOne({ email: decoded.email })
//       .populate("cart");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ cart: user.cart });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
// };

module.exports = {
  userRegister,
  userLogin,
  userGetProducts,
  specificProduct,
  addToCart,
  getCategoryWise,
  getCart,
  removeFromCart,
};
