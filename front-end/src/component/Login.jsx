import { useContext } from "react"
import { myContext } from "../Context.js"
import axios from "axios"
import { Link,useNavigate } from "react-router-dom"

export default function Login(){

            const nav=useNavigate()

            const {email,setEmail,password,setPassword,setToken}=useContext(myContext)

            console.log("userEmail:",email);
            console.log("userPassword",password);
            const Login = async ()=>{
                try{
                    const response = await axios.post("http://localhost:5000/user/login",{
                        email,
                        password
                    },
                    {
                        withCredentials:true,
                    })
                    const data=response.data
                    console.log(response.data);
                    console.log("token in frontEnd", data.token);
        console.log("Login successful", data.message);
                    alert("Login Success!!!!")
                    nav("/home")
                }catch(error){
                    console.log(error.response.data);
                    alert('Registration failed!!!');
                }
                
            }
    return(
        <div>
            <h1>Login</h1>
            <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br></br>

      <button onClick={Login}>Login
      </button>

      <p>Dont have account ?</p>
      <Link to={'/register'}>Sign Up</Link>



      
        </div>
    )
}