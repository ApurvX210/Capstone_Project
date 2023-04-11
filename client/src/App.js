import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useState, useEffect } from "react"
// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import axios from "axios";

function App() {
  const { user } = useAuthContext()
  const { dispatch } = useAuthContext()
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          localStorage.setItem('user', JSON.stringify(resObject))
          dispatch({ type: 'LOGIN', payload: resObject })
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  // const getUser = async () => {
  //   try {
  //     const url = `http://localhost:4000/auth/login/success`;
  //     axios.get(url, { withCredentials: true }).then(async (response)=>{
  //       const json = await response.json()

  //       if (response.ok) {
  //         // save the user to local storage
  //         localStorage.setItem('user', JSON.stringify(json))
  
  //         // update the auth context
  //         dispatch({ type: 'LOGIN', payload: json })
  
  //         // update loading state
  //       }
  //   }).catch((error) => {
  //     console.log("Not Valid")
  //   });
  //     // const response = await axios.get(url, { withCredentials: true });
  //     // const json = await response.json()

  //     // if (response.ok) {
  //     //   // save the user to local storage
  //     //   localStorage.setItem('user', JSON.stringify(json))

  //     //   // update the auth context
  //     //   dispatch({ type: 'LOGIN', payload: json })

  //     //   // update loading state
  //     // }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
