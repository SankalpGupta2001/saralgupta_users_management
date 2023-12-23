import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';
import DetailScreen from './screens/DetailScreen';
import NewUser from './screens/NewUser';
import Header from './components/header';
import "./App.css";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className='app'>
          <Routes>
            <Route path="/" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/update/:id" element={<UpdateScreen />} />
            <Route path="/detail/:id" element={<DetailScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
