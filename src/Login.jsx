import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [email, setemail] = useState('skill')
    const [password, setpass] = useState('zxx')
    const [satte, setstate] = useState([])
    const [error, seterror] = useState()

    

    const handleLogin=async(e)=>{
        e.preventDefault()
// console.log(email,pass);

const {data}=await axios.post("http://localhost:5000/api/auth/login",{email,password})
console.log(data);
setstate(data)
if(data.success){
    localStorage.setItem("token",JSON.stringify(data.token))
}
else{
    seterror(data.message)
}
    }

    const handleLocalData=async(e)=>{
const {data}=await axios.get("http://localhost:5000/api/user",{
    headers:{
        Authorization:JSON.parse(localStorage.getItem("token"))
    }
})
console.warn(data);

// console.log(JSON.parse(localStorage.getItem("token")));
    }
  return (
    <div className='container'
    >
       <pre>{JSON.stringify(satte)}</pre>
<div className="row">
    <div className="col-md-6">
        {
            error ? <div className="alert alert-danger">{error}</div>:null

        }
        <div className="card">
            <div className="card-header">
                
            </div>
            <div className="card-body">
     <form onSubmit={handleLogin}>
     <input
     onChange={e=>setemail(e.target.value)} value={email} type="text" className='form-control' placeholder='email' /><br />
                  
                  
                    <input value={email}  value={password} onChange={e=>setpass(e.target.value)}
                    type="text" className='form-control' placeholder='password' /><br />
                   
                   
                    <input 
                     type="submit" className='btn btn-sm btn-success' /><br />
     </form>

     <button onClick={handleLocalData}
      className='btn btn-success'>getdata</button>
                </div>
        </div>
    </div>
</div>
    </div>
  )
}
