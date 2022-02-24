import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function Todo() {
    const[state,setState]=useState({
        fname:'',
        lname:''
    })

    const [inputData,setInputData]=useState([])

    const [edit,setEdit]=useState({
        fname:'',
        lname:''
    })

    const [productId,setProductId]=useState('')


    const editChange=(e)=>{
        setEdit({
            ...edit,
            [e.target.name]:e.target.value
        })
    }
   

    

    const getAlldat=async()=>{
        const {data}= await axios.get("http://localhost:5000/todos")
        setInputData(data.result)
       
}

const delet=async(id)=>{
    const result=await axios.delete(`http://localhost:5000/todos/${id}`)
    getAlldat()
}
    useEffect(() => {
      getAlldat()
    }, []);

    const changeData=(e)=>{
        setState({...state,
            [e.target.name]:e.target.value
        })
    }


   



    const submitData=async(e)=>{
e.preventDefault()

const result= await  axios.post("http://localhost:5000/todo",state)
              
getAlldat()
    }

    const updateData=async()=>{
        const result =await axios.put(`http://localhost:5000/todo/${productId}`,edit)

        getAlldat()
    }
  return <div>
      {/* <pre>{JSON.stringify(mahiti)}</pre> */}
      <div className="container">
          <form onSubmit={submitData}>
 <div className="input-group">
 <input type="text"  className='form-control' name='fname' value={state.fname}  onChange={changeData}/>
      <input type="text" className='form-control' name='lname' value={state.lname} onChange={changeData}/>
      <input type="submit" className='btn btn-sm btn-success' value="submit" />
 </div>
      </form>
      </div>

      <div className='container'>
{/* <pre>{JSON.stringify(inputData)}</pre> */}
      <div className="row">
          <div className="col-md-6">
              <div className="card-body">
                  {
                      inputData.map(item=><h1 key={item._id}>{item.fname} {item.lname} 
                      <button onClick={delet.bind(this,item._id)}>delet</button>
                         <button onClick={e=>{
                             setEdit({
                                fname:item.fname,
                                lname:item.lname
                            })
                            setProductId(item._id)
                         }
                             
                         }
                         type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update">
                           edit
                         </button>
                          </h1>)
                  }
              </div>
          </div>
      </div>
  </div>

  <div>
     <div className="modal fade" id="update" >
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
             <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div className="modal-body">
             <input type="text" name='fname' value={edit.fname} onChange={editChange} className='input-group'/> <br />

             <input type="text" name='lname' value={edit.lname} onChange={editChange} className='input-group'/>
             <button onClick={updateData} data-bs-dismiss="modal">update</button>
           </div>
            
         </div>
       </div>
     </div>
     
  </div>
  </div>
  
}
