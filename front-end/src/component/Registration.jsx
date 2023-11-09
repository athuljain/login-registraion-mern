import { useContext } from "react"
import { myContext } from "../Context"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

export default function Register(){

    const nav=useNavigate()

    const {email,setEmail,password,setPassword,confirmPassword,setConfirmPassword,name,setName}=useContext(myContext)

    const Register = async () => {
        try{
            const response = await axios.post("http://localhost:5000/user/register", {
                name,
                email,
                password,
                confirmPassword,
            })
            
            if (response.status === 201) {
                alert('Registration successful');
                nav('/');
              } else {
                alert('Registration failed');
              }
            } catch (error) {
              console.log(error.response.data);
              alert('Registration failed');
            }
          }




    return(
        <div>
            <h1>Register</h1>

            <input
        type="String"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> <br></br>

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
         <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /> <br></br>

      <button onClick={Register}>Register</button>

      <br></br>
      <p>You have account ?</p>
      <Link to={'/'}>Login</Link>
        </div>
    )
}