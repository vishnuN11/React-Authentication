import axios from "axios"
import { GET_USER_INFO, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./user-action-type"
import { setAuthToken } from "../../util/seAuth"





const registerUser=(user,history)=>{
    return async(dispatch)=>{

    
    try {
        dispatch({type:REGISTER_USER_REQUEST});
        let dataurl='http://127.0.0.1:5000/users/register';
        let response=await axios.post(dataurl,user);
        dispatch({type:REGISTER_USER_SUCCESS,payload:response.data});
        history.push("/login")

    } catch (error) {
        console.log(error.response.data.errors);
            let errorList = error.response.data.errors;
            
            dispatch({ type : REGISTER_USER_FAILURE , payload : error});
    }
}
}




const login=(user,history)=>{
    return async(dispatch)=>{

    
    try {
        dispatch({type:LOGIN_USER_REQUEST});
        let dataurl='http://127.0.0.1:5000/users/login';
        let response=await axios.post(dataurl,user);
        dispatch({type:LOGIN_USER_SUCCESS,payload:response.data});
        dispatch(getUserInfo())
        history.push("/")
       

    } catch (error) {
        console.log(error.response.data.errors);
            let errorList = error.response.data.errors;
            
            dispatch({ type : REGISTER_USER_FAILURE , payload : error});
    }
}
}



let getUserInfo = () => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.getItem('token'));
        }
        try{
            let response = await axios.get('http://127.0.0.1:5000/users/');
            dispatch({type : GET_USER_INFO , payload : response.data});
        }
        catch (error) {
            console.log(error);
        }
    }
};



let logOut = (history) => {
    return async (dispatch) => {
        try {
            dispatch({type : LOGOUT});
            history.push('/');
        }
        catch (error) {
            console.error(error);
        }
    };
};


export {registerUser,login,logOut}