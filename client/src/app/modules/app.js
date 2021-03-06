import { logoutUser } from '../routes/login/modules/login';

import { url } from '../../utils/url';

const UPDATE_USER = 'UPDATE_USER'

const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
const LOAD_USER_FAIL = 'LOAD_USER_FAIL'

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  }
}

function loadUserSuccess() {
  return {
    type: LOAD_USER_SUCCESS
  }
}

function loadUserFail(payload) {
  return {
    type: LOAD_USER_FAIL,
    payload
  }
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  }
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(url + `api/v1/users/`, 
      { method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(loadUserFail(jsonData))
        } else {
          dispatch(loadUserSuccess())
          dispatch(updateUser(jsonData));
        }
      })
  }
}

const initialState = {
  errorMessage: '',
  fullName: '',
  userId: '',

  isFetchingUserSuccessful: false,
  isFetchingUser: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: true,
        isFetchingUSer: false
      })
    case LOAD_USER_FAIL:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: false,
        isFetchingUSer: false,

        errorMessage: action.payload.error
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        userId: action.payload.user._id,
        fullName: action.payload.user.fullname,
      })
    default: return state;
  }
}