import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/LoginScreen'
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from './features/user/userSlice';
import Profile from './screens/ProfileScreen';

function App() {
  let user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        // Logged In
        dispatch(login({
          uid: user.uid,
          email: user.email
      }));
      }else{
        // Logged Out
         dispatch(logout());
      }
    })
    return unsubscribe;
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
