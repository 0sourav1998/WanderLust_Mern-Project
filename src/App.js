import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from "../src/components/Signup"
import Login from "../src/components/Login"
import Dashboard from './components/Dashboard';
import Listing from './components/Listing';
import MyListing from './components/MyListing';
import Bookmark from './components/Bookmark';
import CreateListing from './components/CreateListing';
import ListingDetails from './components/ListingDetails';

function App() {
  return (
   <Routes>
    <Route element={<Signup/>} path="/signup" />
    <Route element={<Login/>} path="/login" />
    <Route element={<Dashboard/>}>
       <Route element={<Listing/>} path="/dashboard/all"/>
       <Route element={<MyListing/>} path="/dashboard/mylistings"/>
       <Route element={<Bookmark/>} path="/dashboard/bookmark"/>
       <Route element={<CreateListing/>} path="/dashboard/createListing"/>
       <Route element={<ListingDetails/>} path="/dashboard/listing/:id"/>
    </Route>
   </Routes>
  );
}

export default App;
