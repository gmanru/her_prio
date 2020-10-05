import * as actionTypes from '../actions/ActionsType'
import { updateObjects } from '../utility'

const user = JSON.parse(localStorage.getItem('user'));

const iniState = {
    token: null,
    error: null,
    loading: false,
    searchData : null,

    isLoggedIn: true ? user != null : false, 
    name: '',
    error: '', // добавили для сохранения текста ошибки
    isFetching: false, // добавили для реакции на статус "загружаю" или нет

    year: 2018,
    photos: [],
    isFetching: false,
    error: ''
}

const authStart = (state, action)=>{
    return updateObjects(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) =>{
    return updateObjects(state, {
        error: null,
        loading: false,
        token: action.token
    })
}

const authFail = (state, action) =>{
    return updateObjects(state,{
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action)=>{
    return updateObjects(state, {
        token: null
    })
}


const searchStart = (state, action)=>{
    return updateObjects(state, {
        error: null,
        loading: true
    })
}

const searchSuccess = (state, action) =>{
    return updateObjects(state, {
        error: null,
        loading: false,
        token: action.data
    })
}


const searchFail = (state, action) =>{
    return updateObjects(state,{
        error: action.error,
        loading: false
    })
}


const reduser = (state=iniState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action);
        case actionTypes.AUTH_FAIL : return authFail(state, action);

        case actionTypes.SEARCH_FAIL : return searchFail(state, action);
        case actionTypes.SEARCH_START : return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS : return searchSuccess(state, action);
        
        case actionTypes.LOGIN_REQUEST: return { ...state, isFetching: true, error: '', isLoggedIn: action.isLoggedIn }

        case actionTypes.LOGIN_SUCCESS: return { ...state, isFetching: false, name: action.payload, isLoggedIn: action.isLoggedIn }
        
        case actionTypes.LOGOUT: return { ...state, isFetching: false, isLoggedIn: action.isLoggedIn }

        case actionTypes.LOGIN_FAIL: return { ...state, isFetching: false, isLoggedIn: false, error: action.payload.message }

        case actionTypes.GET_PHOTOS_REQUEST: return { ...state, year: action.payload, isFetching: true, error: '' }

        case actionTypes.GET_PHOTOS_SUCCESS: return { ...state, photos: action.payload, isFetching: false, error: '' }

        case actionTypes.GET_PHOTOS_FAIL: return { ...state, error: action.payload.message, isFetching: false }


        default:
            return state
    }
}

export default reduser