
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './component/Registration.jsx';
import Login from './component/Login.jsx';
import {myContext} from './Context.js'

function App() {

  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const values={
    email,setEmail,
    password,setPassword
  }

  return (
    <div className="App">
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Routes>
            <Route path='/' element={<Register />}/>
            <Route path='/login' element={<Login />} />
        </Routes>
        </myContext.Provider>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
