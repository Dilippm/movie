import React from 'react'
import {Route,Routes} from 'react-router-dom'

import UserPublicRoutes from './UserPublicRoutes'
import UserProtectedRoutes from './UserProtectedRoutes';
import Home from '../pages/Home';
import Movies from '../pages/Movies/Movies';

import User from '../pages/User/User';
import UserProfile from '../pages/Profile/userProfile';
import UserRegistration from '../pages/User/UserRegister';
import MoviePage from '../pages/User/MoviePage';
import SeatSelection from '../pages/User/SeatSelection';
import Bookings from '../pages/User/Bookings'
// import Header from '../components/Header';
import Error from "../pages/ErrorPage/ErrorPage"
import Successpage from '../components/Payment/Successpage';
import ShowBookings from '../pages/User/ShowBookings';
import WalletSuccess from '../components/Payment/WalletSuccess';
import EmailVerify from '../components/EmailVerify.jsx';
import TheaterPage from '../pages/User/TheaterPage';
const UserRoutes = () => {


 
  return (
    <>
    
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/login" element={<UserPublicRoutes><User /></UserPublicRoutes>} />
          <Route exact path="/register" element={<UserPublicRoutes><UserRegistration /></UserPublicRoutes>} />
          <Route exact path= "/:id/verify/:token" element={<UserPublicRoutes><EmailVerify/></UserPublicRoutes>}/> 
          <Route path="/profile" element={<UserProtectedRoutes><UserProfile /></UserProtectedRoutes>} />
          <Route path ='/viewmovie/:id' element ={<MoviePage/>}/>
          <Route path='/movieseats/:id' element ={<SeatSelection/>}/>
          <Route path ='/booking/:id' element={<UserProtectedRoutes><Bookings/></UserProtectedRoutes>}/>
          <Route path ='/checkout-success' element ={<UserProtectedRoutes><Successpage/></UserProtectedRoutes>}/>
          <Route path ='/bookings' element ={<UserProtectedRoutes><ShowBookings/></UserProtectedRoutes>}/>
          <Route path ='/wallet-success/:id' element={<UserProtectedRoutes><WalletSuccess/></UserProtectedRoutes>}/>
          <Route path='/theaters' element ={<TheaterPage/>}/>
          <Route path="*" element={<Error/>} />

        </Routes>
    </>
  )
}

export default UserRoutes
