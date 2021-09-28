import axios from 'axios'
import { USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/user.constants";

export const register = ({ username, email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { username, email, password }
    })
    try {
      const { data } = await axios.post('/api/users/register/', {
        username, email, password
      })
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: err.response && err.response.data.message ? err.resposne.data.message : err.message
      })
    }
  }
}