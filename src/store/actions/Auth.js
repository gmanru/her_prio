import * as actionTypes from './ActionsType'
import axios from 'axios'
import VK from 'vk-openapi'
import axiosInstance from "./axiosApi"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkExpTime = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/account/signin/', {
            username: username,
            password: password
        })
            .then(res => {

                if (res.data.err === 'true') {
                    // console.log(res.data.message);
                    alert(res.data.message)
                    dispatch(authFail(res.data.message))
                } else {
                    const token = res.data.data
                    const expTime = new Date(new Date().getTime() + 3600 * 1000)
                    localStorage.setItem('token', token)
                    localStorage.setItem('expDate', expTime)
                    dispatch(authSuccess(token))
                    dispatch(checkExpTime(3600))
                    // alert(res.data.message)
                }


            })
            .catch(error => {
                dispatch(authFail(error.message))
            })
    }
}

export const authSignup = (first_name, last_name, email, username, password, phone) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/account/signup/', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            username: username,
            password: password
        })
            .then(res => {
                if (res.data.err === 'true') {
                    // console.log(res.data.message);
                    alert(res.data.message)
                    dispatch(authFail(res.data.message))
                } else {
                    const token = res.data.data
                    const expTime = new Date(new Date().getTime() + 3600 * 1000)
                    localStorage.setItem('token', token)
                    localStorage.setItem('expDate', expTime)
                    dispatch(authSuccess(token))
                    dispatch(checkExpTime(3600))
                }

            })
            .catch(error => {
                dispatch(authFail(error.message))
            })
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const startSearch = () =>{
    return{
        type: actionTypes.SEARCH_START
    }
}

export const searchSuccess = (data) =>{
    return{
        type: actionTypes.SEARCH_SUCCESS,
        data : data
    }
}

export const searchFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const search = (query) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/search/', {
            query: query
        })
            .then(res => {
                if (res.data.err === 'true') {
                    // console.log(res.data.message);
                    // alert(res.data.message)
                    dispatch(searchFail(res.data.message))
                } else {
                    const data = res.data.data
                    dispatch(searchSuccess(data))
                }

            })
            .catch(error => {
                dispatch(searchFail(error.message))
            })
    }
}


export const handleLogin = (isLoggedIn) => {
    // VK.init({
    //     // apiId: '7519418'
    //     apiId: 7320659
    // });
    return dispatch => {
        dispatch({
            type: actionTypes.LOGIN_REQUEST
        }
    )
    var avatar = "", birthday = "", email = "";
    

    // axios.post('http://localhost:8000/api/account/login/')
    axios.get('http://localhost:8000/api/account/lll/login/vk-oauth2')
    .then((response) => {
        debugger
        // axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        // localStorage.setItem('access_token', response.data.access);
        // localStorage.setItem('refresh_token', response.data.refresh);
        // if (response.data.success == false)
        //     alert("Произошла ошибка!")
        // else {
        //     sessionStorage.setItem("token", token)
        //     isLoggedIn = true
        //     localStorage.setItem("token", token)

        //     VK.Api.call('photos.getAll', { extended: 1, count: 100, offset: 0, v: '5.80' }, r2 => {
        //         if (typeof r2.response.items !== 'undefined' && r2.response.items.length > 0) {
        //             avatar = r2.response.items[0].sizes[0].url
        //             VK.Api.call('users.get', {user_ids: r.session.mid, v: '5.80', fields: ['bdate', 'email']}, function(r3) {
        //                 if(r3.response) {
        //                     birthday = r3.response[0].bdate
        //                     function formatDate(date) {
        //                         var d = new Date(date),
        //                             month = '' + (d.getMonth() + 1),
        //                             day = '' + d.getDate(),
        //                             year = d.getFullYear();
                            
        //                         if (month.length < 2) 
        //                             month = '0' + month;
        //                         if (day.length < 2) 
        //                             day = '0' + day;
                            
        //                         return [year, month, day].join('-');
        //                     }

        //                     var rrr = avatar
        //                     debugger
        //                     axios.post("http://localhost:8000/api/account/set_user_data/", {
        //                         user_id: r.session.mid,
        //                         first_name: r.session.user.first_name,
        //                         last_name: r.session.user.last_name,
        //                         birthday: formatDate(birthday),
        //                         email: email,
        //                         avatar: avatar,
        //                         headers: {
        //                             Authorization: `Token 27dbb4dd8299792c8c52022f829da4ecec22f437`
        //                         }
        //                     })
        //                 }
        //             });
        //         }
        //     });

            
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: avatar,
            isLoggedIn: isLoggedIn, 
            avatar: avatar
        })
        // }
    })
    .catch(error => {
        console.log(error);
        return;
    });


    // //eslint-disable-next-line no-undef
    // VK.Auth.login((r) => {
    //     if (r.session) {
    //         const { expire, mid, secret, sid, sig, user } = r.session;
    //         const params = { expire, mid, secret, sid, sig };
    //         const token = Array.from(Object.keys(params), param => {
    //             return `${param}=${params[param]}`;
    //         }).join('&');
            
    //         var avatar = "", birthday = "", email = "";
    //         axiosInstance.post('/login', {
    //             username: mid
    //         })
    //         .then((response) => {
    //             debugger
    //             axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
    //             localStorage.setItem('access_token', response.data.access);
    //             localStorage.setItem('refresh_token', response.data.refresh);
    //             // if (response.data.success == false)
    //             //     alert("Произошла ошибка!")
    //             // else {
    //             //     sessionStorage.setItem("token", token)
    //             //     isLoggedIn = true
    //             //     localStorage.setItem("token", token)

    //             //     VK.Api.call('photos.getAll', { extended: 1, count: 100, offset: 0, v: '5.80' }, r2 => {
    //             //         if (typeof r2.response.items !== 'undefined' && r2.response.items.length > 0) {
    //             //             avatar = r2.response.items[0].sizes[0].url
    //             //             VK.Api.call('users.get', {user_ids: r.session.mid, v: '5.80', fields: ['bdate', 'email']}, function(r3) {
    //             //                 if(r3.response) {
    //             //                     birthday = r3.response[0].bdate
    //             //                     function formatDate(date) {
    //             //                         var d = new Date(date),
    //             //                             month = '' + (d.getMonth() + 1),
    //             //                             day = '' + d.getDate(),
    //             //                             year = d.getFullYear();
                                    
    //             //                         if (month.length < 2) 
    //             //                             month = '0' + month;
    //             //                         if (day.length < 2) 
    //             //                             day = '0' + day;
                                    
    //             //                         return [year, month, day].join('-');
    //             //                     }

    //             //                     var rrr = avatar
    //             //                     debugger
    //             //                     axios.post("http://localhost:8000/api/account/set_user_data/", {
    //             //                         user_id: r.session.mid,
    //             //                         first_name: r.session.user.first_name,
    //             //                         last_name: r.session.user.last_name,
    //             //                         birthday: formatDate(birthday),
    //             //                         email: email,
    //             //                         avatar: avatar,
    //             //                         headers: {
    //             //                             Authorization: `Token 27dbb4dd8299792c8c52022f829da4ecec22f437`
    //             //                         }
    //             //                     })
    //             //                 }
    //             //             });
    //             //         }
    //             //     });

                    
    //             dispatch({
    //                 type: actionTypes.LOGIN_SUCCESS,
    //                 payload: avatar,
    //                 isLoggedIn: isLoggedIn, 
    //                 avatar: avatar
    //             })
    //             // }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             return;
    //         });
    //     } else {
    //         dispatch({
    //             type: actionTypes.LOGIN_FAIL,
    //             isLoggedIn: isLoggedIn,
    //             error: true,
    //             payload: new Error('Ошибка авторизации')
    //         })
    //     }
    // }, 22) // запрос прав на доступ к photo
  }
}

export const handleLogout = (isLoggedIn) => {
    VK.init({
        // apiId: '7519418'
        apiId: 7320659
    });
    return dispatch => {
        dispatch({
        type: actionTypes.LOGIN_REQUEST
        })

        //eslint-disable-next-line no-undef
        VK.Auth.logout() // запрос прав на доступ к photo
        // axios.get('http://localhost:8000/api/account/logout/', {withCredentials: true}).then((response) => {
        //     console.log(response);
        // })
        // .catch(error => {
        //     console.log(error);
        //     return;
        // });
        const response = axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
            // return response;

        dispatch({
            type: actionTypes.LOGOUT,
            isLoggedIn: false
        })
        localStorage.removeItem("token")
    }
}

export const handleSession = () => {
    VK.init({
        // apiId: '7519418'
        apiId: 7320659
    });
    return dispatch => {
        dispatch({
        type: actionTypes.LOGIN_REQUEST
        })

        //eslint-disable-next-line no-undef
        VK.Auth.getLoginStatus(function(response){
            if(response.session)
            {
                // пользователь авторизован
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                    isLoggedIn: true
                })
            }
            else
            {
                // пользователь не авторизован
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                    isLoggedIn: false
                })
            }
        });
    }
}


let photosArr = []
let cached = false

function makeYearPhotos(photos, selectedYear) {
  let createdYear,
    yearPhotos = []

  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear()
    if (createdYear === selectedYear) {
      yearPhotos.push(item)
    }
  })

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count)

  return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
  //eslint-disable-next-line no-undef
  VK.Api.call('photos.getAll', { extended: 1, count: count, offset: offset, v: '5.80' }, r => {
    try {
      photosArr = photosArr.concat(r.response.items)
      if (offset <= r.response.count) {
        offset += 200 // максимальное количество фото которое можно получить за 1 запрос
        getMorePhotos(offset, count, year, dispatch)
      } else {
        let photos = makeYearPhotos(photosArr, year)
        cached = true
        dispatch({
          type: actionTypes.GET_PHOTOS_SUCCESS,
          payload: photos
        })
      }
    } catch (e) {
      dispatch({
        type: actionTypes.GET_PHOTOS_FAIL,
        error: true,
        payload: new Error(e)
      })
    }
  })
}

export const getPhotos = (year) => {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_PHOTOS_REQUEST,
      payload: year
    })

    if (cached) {
      let photos = makeYearPhotos(photosArr, year)
      dispatch({
        type: actionTypes.GET_PHOTOS_SUCCESS,
        payload: photos
      })
    } else {
      getMorePhotos(0, 200, year, dispatch)
    }
  }
}

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (token === undefined) {
//             dispatch(authLogout());
//         } else {
//             const expTime = new Date(localStorage.getItem('expTime'));
//             if (expTime <= new Date()) {
//                 dispatch(authLogout());
//             } else {
//                 dispatch(authSuccess(token));
//                 dispatch(checkExpTime((expTime.getTime() - new Date().getTime()) / 1000));
//             }
//         }
//     }
// }

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log("token");
        console.log(token);
        if (token === null) {
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(token));
        }
    }
}