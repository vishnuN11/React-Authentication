import axios from 'axios'
import React,{useEffect, useState} from 'react'



export default function Profile() {
    const [name,setName]=useState('')
    const [file,setfile]=useState('')
    const [preview,setpreview]=useState('')
    const [userData,setUserData]=useState([])


    const handleChange=(e)=>{
        console.log(e.target.files);
        setfile(e.target.files[0])
        const imgurl=URL.createObjectURL(e.target.files[0])
        setpreview(imgurl)

    }

    const handleRegister=async(e)=>{
e.preventDefault()
const fd= new FormData()
fd.append("avatar",file)
fd.append("name",name)

const {data}= await axios.post("http://localhost:5000/api/user/register",fd,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
console.log(data.result);
setpreview("")
e.target.reset()
    }

    const getdata=async()=>{
        const {data}= await axios.get("http://localhost:5000/api/user/register")

        setUserData(data.result)
    }

    useEffect(()=>{
        getdata()
    },[])
  return (
    <div>
        <pre>{JSON.stringify(userData)}</pre>
        <form onSubmit={handleRegister}>
            <input type="text" onChange={e=>setName(e.target.value)} placeholder='enter name' /> <br />
          
            <input type="file" onChange={handleChange} />
            <button>register</button> <br /><br />
            <img src={preview} alt="" width="50" height="50"/>
        </form>
        {
            userData.map((item)=>{
                return(
                    <div key={item._id} style={{display:"flex",justifyContent:"space-between", width:"40%"}}>
<img src={"http://localhost:5000/"+item.pic} alt="" width={200} height={200} /> <br />
<h1>{item.name}</h1>
                        </div>
                )
            })
        }
    </div>

  
  )
}
