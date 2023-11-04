import { useContext } from "react"
import { myContext } from "../Context"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Register(){

    const nav=useNavigate()

    const {email,setEmail,password,setPassword}=useContext(myContext)

    const Register = async () => {
        try{
            const response = await axios.post("http://localhost:5000/user/register", {
                email,
                password,
            })
            
            if (response.data === 'User registered successfully') {
                alert('Registration successful');
                nav('/login');
              }
              console.log("reg user", response.data);
        } catch (error){
            console.log(error.response.data);
        }

    }




    return(
        <div>
            <h1>Register</h1>

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

      <button onClick={Register}>Register</button>
        </div>
    )
}