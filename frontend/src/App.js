import {Routes, Route, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {adminActions, ownerActions, userActions} from './store';

import UserRoutes from './Routes/Userroutes';
import AdminRoutes from './Routes/AdminRoutes';
import OwnerRoutes from './Routes/OwnerRoutes';

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const isOwnerLoggedIn = useSelector((state) => state.owner.isLoggedIn);
 
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            dispatch(userActions.login());
        } else if (localStorage.getItem("adminId")) {
            dispatch(adminActions.login());
        }else if(localStorage.getItem("ownerId")){
          dispatch(ownerActions.login());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isUserLoggedIn && window.location.pathname === "/profile") {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);
    useEffect(() => {
        if (isUserLoggedIn && (window.location.pathname === "/login" || window.location.pathname === "/register")) {
            navigate("/");
        }
    })
    return (
        <div>
            <ToastContainer/>

            <Routes>
                <Route exact="exact" path="/*" element={<UserRoutes />}/>
                <Route exact="exact" path="/admin/*" element={<AdminRoutes />}/>
                <Route exact="exact" path="/owner/*" element={<OwnerRoutes />}/>

            </Routes>

        </div>
    );
};

export default App;
