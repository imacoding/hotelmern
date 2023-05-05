import { LOGIN_SUCCES, LOGIN_FAILURE, LOGOUT } from '../actions/types';


const INTIAL_STATE = {
    isAuth: false,
    errors: [],
    username: ''
}


export const authReducer = (state= INTIAL_STATE, action) => {
  //  console.log('action type:', action.type);
 // console.log('current state:', state);
    switch(action.type){

        case LOGIN_SUCCES:
            return Object.assign({}, state, {isAuth: true, errors:[], username: action.username});
        
        case LOGIN_FAILURE:
            return Object.assign({}, state, {errors: action.errors});

        case LOGOUT:
            return Object.assign({}, state, {isAuth: false});

        default:
            return state;
    }
}

