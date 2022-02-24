import { GET_USER_INFO, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./user-action-type";

export const USERS_FEATURE_KEY = 'user';

let initialState = {
    loading : false,
    isAuthenticated : false,
    token : null,
    errorMessage: '',
    user : {}
};


let userReducer=(state=initialState,action)=>{
    let {type,payload}=action
    switch(type){
        case REGISTER_USER_REQUEST:
            case LOGIN_USER_REQUEST:
            return{
...state,
loading:true
        };
        case REGISTER_USER_SUCCESS:
            case LOGIN_USER_SUCCESS:
                localStorage.setItem("token",payload.token)
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                token:payload.token

            };
            case REGISTER_USER_FAILURE:
              case  LOGIN_USER_FAILURE:
              case  LOGOUT:
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                return{
                    ...state,
                    loading:false,
                    isAuthenticated:false,
                    user:{}
                };
                case GET_USER_INFO:
                    localStorage.setItem("user",JSON.stringify(payload))
                    return{
                        ...state,
                        isAuthenticated:true,
                        user:payload
                    }
                default: return state
    }
}

export {userReducer}