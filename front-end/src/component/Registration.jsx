import { useContext } from "react";
import { myContext } from "../Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Registraion.css";

export default function Register() {
  const nav = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
  } = useContext(myContext);

  const Register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        alert("Registration successful");
        nav("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error.response.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="main-register">
      <h1 className="main-head">Register</h1>
      <input
        className="reg-input"
        type="String"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br></br>
      <input
        className="reg-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />{" "}
      <br></br>
      <input
        className="reg-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br></br>
      <input
        className="reg-input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />{" "}
      <br></br>
      <button className="reg-button" onClick={Register}>
        Register
      </button>
      <br></br>
      <p>You have account ?</p>
      <Link to={"/"}>Login</Link>
    </div>
  );
}
