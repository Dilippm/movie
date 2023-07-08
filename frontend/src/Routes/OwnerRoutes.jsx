import React from 'react'
import {Route,Routes} from 'react-router-dom'


import OwnerLogin from '../pages/Owner/OwnerLogin';
import OwnerRegister from '../pages/Owner/OwnerRegister';
import OwnerHome from '../pages/Owner/OwnerHome';
import OwnerProfile from '../pages/Profile/Ownerprofile';
import OwnerProtectedRoutes from './OwnerProtectedRoutes';
import OwnerPublicRoutes from './OwnerPublicRoutes';
import Theater from '../pages/Owner/Theater';
import Movies from "../pages/Owner/Movies"
import OwnerHeader from '../components/OwnerHeader';
import EditTheatre from '../pages/Owner/EditTheatre';
import OwnerRevenue from '../pages/Owner/OwnerRevenue';
import Bookings from '../pages/Owner/Bookings';
import UserDetails from '../pages/Owner/UserDetails';
import OwnerErrorPage from '../pages/ErrorPage/OwnerErrorPage'
const OwnerRoutes =()=>{
    return (
        <>
        <OwnerHeader/>
         <Routes>
         <Route path="/login" element={<OwnerPublicRoutes><OwnerLogin /></OwnerPublicRoutes>} />
          <Route path="/owner_register" element={<OwnerPublicRoutes><OwnerRegister /></OwnerPublicRoutes>} />
        
          <Route path="/home" element={<OwnerProtectedRoutes><OwnerHome /></OwnerProtectedRoutes>} />
          <Route path="/ownerprofile" element={<OwnerProtectedRoutes><OwnerProfile/></OwnerProtectedRoutes>} />
          <Route path="/owner_theater" element={<OwnerProtectedRoutes><Theater/></OwnerProtectedRoutes>} />
          <Route path="/owner_movies" element={<OwnerProtectedRoutes><Movies/></OwnerProtectedRoutes>} />
          <Route path ='/edit_theatre/:id' element={<OwnerProtectedRoutes><EditTheatre/></OwnerProtectedRoutes>}/>
          <Route path='/revenue_report' element={<OwnerProtectedRoutes><OwnerRevenue/></OwnerProtectedRoutes>}/>
          <Route path='/bookings' element ={<OwnerProtectedRoutes><Bookings/></OwnerProtectedRoutes>}/>
          <Route path='/owner_user' element ={<OwnerProtectedRoutes><UserDetails/></OwnerProtectedRoutes>}/>
          <Route path="*" element={<OwnerErrorPage/>} />
            </Routes>
        </>
      )
}
export default OwnerRoutes