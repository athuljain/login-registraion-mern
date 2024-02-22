import { useContext } from "react";
import { myContext } from "../Context.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Login.css";

export default function Login() {
  const nav = useNavigate();

  const { email, setEmail, password, setPassword, setUserToken } =
    useContext(myContext);

  console.log("userEmail:", email);
  console.log("userPassword", password);

  const Login = async () => {
    try {


      if (  !email || !password  ) {
        alert("Please fill in all fields");
        return;
      }


      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(response.data);
      console.log("token in frontEnd", data.token);
      console.log("Login successful", data.message);
      setUserToken(data.token);
      alert("Login Success!!!!");
      nav("/home");
    } catch (error) {
      console.log(error.response.data);
      alert("Registration failed!!!");
    }
  };
  return (
    <div className="login-container">
      <h1 className="login-head">Login</h1>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br></br>
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br></br>
      <button className="login-btn" onClick={Login}>
        Login
      </button>
      <p>Dont have account ?</p>
      <Link to={"/register"}>Sign Up</Link>
    </div>
  );
}
