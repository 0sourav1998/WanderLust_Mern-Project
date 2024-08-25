import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from "../src/components/Signup"
import Login from "../src/components/Login"
import Dashboard from './components/Dashboard';

function App() {
  return (
   <Routes>
    <Route element={<Signup/>} path="/signup" />
    <Route element={<Login/>} path="/login" />
    <Route element={<Dashboard/>} path='/dashboard'/>
   </Routes>
  );
}

export default App;
