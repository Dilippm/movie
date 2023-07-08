const express = require("express");
const {uploadOptions} = require("../multer/multer");
const {
    adminLogin,
    getAdmin,
    updateAdmin,
    getUsers,
    updateuserStatus,
    getMovies,
    addMovie,
    updatemovieStatus,
    getOwners,
    changeOwnerStatus,
    addBanner,
    getBanners,
    deleteBanner,
    getAllBookings,
    getdashboarddetails,
    getDashboardChart,
    getMovieChart,
    getTheaterList,
    getAllUserBookings
   
} = require("../controllers/admin_Controller");
const verifyAdminToken = require("../Middlewares/AdminMIddleware")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id', uploadOptions.single("image"), updateAdmin)
adminRoute.post("/users/:id", verifyAdminToken, updateuserStatus);
adminRoute.post(
    "/movie/:id",
    uploadOptions.single("image"),
    verifyAdminToken,
    addMovie
);
adminRoute.post("/moviestatus/:id", verifyAdminToken, updatemovieStatus)
adminRoute.post("/owners/:id", verifyAdminToken, changeOwnerStatus)
adminRoute.post('/banners/:id', verifyAdminToken,addBanner)

/**GET Routes */
adminRoute.get('/:id', getAdmin)
adminRoute.get("/users/:id",verifyAdminToken, getUsers)
adminRoute.get("/movies/:id",verifyAdminToken, getMovies)
adminRoute.get("/owners/:id",verifyAdminToken, getOwners)
adminRoute.get('/allbanners/:id', verifyAdminToken,getBanners)
adminRoute.get('/allbookings/:id', verifyAdminToken, getAllBookings)
adminRoute.get('/dashboardrevenue/:id', verifyAdminToken, getdashboarddetails)
adminRoute.get('/dashboardchart/:id', verifyAdminToken, getDashboardChart)
adminRoute.get('/movieschart/:id',verifyAdminToken,getMovieChart)
adminRoute.get('/theaterschart/:id',verifyAdminToken,getTheaterList)
adminRoute.get('/alluserbookings/:id',verifyAdminToken,getAllUserBookings)

/**Delete Route */
adminRoute.delete('/deltebanner/:id', deleteBanner)

module.exports = adminRoute;