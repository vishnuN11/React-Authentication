import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { registerUser } from '../redux/user/user-action';

export default function Register() {

    let history = useHistory();
    let dispatch = useDispatch();

    let [emptyForm , setEmptyForm] = useState(false);
    let [user, setUser] = useState({
        name : '',
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        nameError : null,
        emailError : null,
        passwordError : null
    });


    let handleUsername = (e) => {
        setUser({...user, name : e.target.value});
        let regExp = /^[a-zA-Z0-9]{4,10}$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError , nameError : ''});
        }
        else{
            setUserError({...userError , nameError : 'Enter a proper Name'});
        }
    };

    // handle Email
    let handleEmail = (e) => {
        setUser({...user, email : e.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError , emailError : ''});
        }
        else{
            setUserError({...userError , emailError : 'Enter a proper Email'});
        }
    };

    // handle password
    let handlePassword = (e) => {
        setUser({...user, password : e.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError , passwordError : ''});
        }
        else{
            setUserError({...userError , passwordError : 'Enter a proper Password'});
        }
    };

    // submitRegister
    let submitRegister = (e) => {
        e.preventDefault();
        if(user.name !== '' && user.email !== '' && user.password !== ''){
            dispatch(registerUser(user, history));
        }
        else{
            setEmptyForm(true);
        }
        
    };

  return (
    <div className="container mt-3">
    <div className="row">
        <div className="col-md-4 m-auto animated flipInY">
            {
                emptyForm &&
                    <div className="alert alert-danger alert-dismissible animated zoomIn">
                        <button className="close" onClick={e => setEmptyForm(false)}>
                            <i className="fa fa-times-circle"/>
                        </button>
                        <small className="font-weight-bold">Please fill in the details</small>
                    </div>
            }
            <div className="card">
                <div className="card-header bg-secondary text-white">
                    <p className="h4">Register Here</p>
                </div>
                <div className="card-body bg-light">
                    <form onSubmit={submitRegister}>
                        <div className="form-group">
                            <input
                                name="name"
                                value={user.name}
                                onChange={handleUsername}
                                type="text" className={`form-control ${userError.nameError ? 'is-invalid' : ''}`} placeholder="Name"/>
                            {
                                userError.nameError ? <small className="text-danger">{userError.nameError}</small> : null
                            }
                        </div>
                        <div className="form-group">
                            <input
                                name="email"
                                value={user.email}
                                onChange={handleEmail}
                                type="email" className={`form-control ${userError.emailError ? 'is-invalid' : ''}`} placeholder="Email"/>
                            {
                                userError.emailError ? <small className="text-danger">{userError.emailError}</small> : null
                            }
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                value={user.password}
                                onChange={handlePassword}
                                type="password" className={`form-control ${userError.passwordError ? 'is-invalid' : ''}`} placeholder="Password"/>
                            {
                                userError.passwordError ? <small className="text-danger">{userError.passwordError}</small> : null
                            }
                        </div>
                        <div>
                            <input type="submit" className="btn btn-secondary btn-sm" value="Register"/>
                        </div>
                    </form>
                    <small>
                        Have an Account ?
                        <Link to='/login' className="text-dark"> Login</Link>
                    </small>
                </div>
                
            </div>
        </div>
    </div>
</div>

  )
}
