import React from 'react'
import{Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { USERS_FEATURE_KEY } from '../redux/user/user-reducer';
import { logOut } from '../redux/user/user-action';

export default function Navbar() {
    let history = useHistory();
    let dispatch = useDispatch();
    let userInfo = useSelector((state) => {
        return state[USERS_FEATURE_KEY];
    });

    let {isAuthenticated , loading , user} = userInfo;

    let logoutUser = () => {
        dispatch(logOut(history));
    };


    let aboutpage=(
        <React.Fragment>
            
            <Link className="nav-link active"  to="/about">About</Link>
          

        </React.Fragment>
    )

    let beforeLinks = (
      <React.Fragment>
          <li className="nav-item">
              <Link to='/login' className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
              <Link to='/register' className="nav-link">Register</Link>
          </li>
      </React.Fragment>
    );

    let afterLinks = (
        <React.Fragment>
            {
                user ? <li className="nav-item">
                    <Link to='/login' className="nav-link">
                        <img src={user.image} alt="" width="20" height="20" className="rounded-circle"/>
                        {user.name}</Link>
                </li> : null
            }
            <li className="nav-item">
                <Link to='#!' onClick={logoutUser} className="nav-link">Logout</Link>
            </li>
        </React.Fragment>
    );

  return (
    <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">primary</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID"
                        aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarID">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            {
                               !loading &&
                                   <React.Fragment>
                                       {
                                           !isAuthenticated ? null : aboutpage
                                       }
                                   </React.Fragment>
                           }
                          
                        </div>
                    </div>
                    <ul className='navbar-nav'>
                    {
                               !loading &&
                                   <React.Fragment>
                                       {
                                           !isAuthenticated ? beforeLinks : afterLinks
                                       }
                                   </React.Fragment>
                           }



                    </ul>
                </div>
            </nav>
    </div>
  )
}
