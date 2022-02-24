import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { login } from '../redux/user/user-action';

export default function LoginNew() {
    let history=useHistory()
    let dispatch=useDispatch()

  let [emptyForm , setEmptyForm] = useState(false);

    let [user, setUser] = useState({
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        emailError : null,
        passwordError : null
    });

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

    // submitLogin
    let submitLogin = (e) => {
        e.preventDefault();
        if(user.email !== '' && user.password !== ''){
            dispatch(login(user, history));
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
                <div className="card-header bg-primary text-white">
                    <p className="h4">Login Here</p>
                </div>
                <div className="card-body bg-light">
                    <form onSubmit={submitLogin}>
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
                            <input type="submit" className="btn btn-primary btn-sm" value="Login"/>
                        </div>
                    </form>
                    <small>
                        Don't have an Account ?
                        <Link to='/register' className="text-dark"> Register</Link>
                    </small>
                </div>
                
            </div>
        </div>
    </div>
</div>
  )
}
