
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    // dispatch logout action
    dispatch({type:'LOGOUT'});
    fetch("http://localhost:4000/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .catch((err) => {
          console.log(err);
        });
  }

  return { logout }
}