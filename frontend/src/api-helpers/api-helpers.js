import axios from 'axios';
import BaseURL from '../config'




/**Owner side get movie */
export const getAllMovies = async (currentPage, moviesPerPage) => {
  try {
    const ownerToken = localStorage.getItem("ownertoken");
    const res = await axios.get(`${BaseURL}movie/movies`, {
      headers: {
        Authorization: `Bearer ${ownerToken}`,
      },
      params: {
        page: currentPage,
        limit: moviesPerPage,
      },
    });

    if (res.status !== 200) {
      
      
      return null;
    }

    const data = res.data;
    return data;
  } catch (err) {
   
    
    return null;
  }
};

/** user Login */
export const sendUserAuthRequest = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}user/login`, {
      email: data.email,
      password: data.password
    });
    
    const resData = res.data;
    return resData;
  } catch (err) {
  
    
    throw err
  }
};
/**User Register */
export const sendUserRegister = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}user/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    
    
    throw err
  }
}

/** Admin Login  */
export const adminLogin = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}admin/login`, {
      email: data.email,
      password: data.password,
    });

    const resData = res.data;
   
    localStorage.setItem("admintoken",resData.token)
    return resData;
  } catch (err) {
   
    
    throw err
    
  }
};


/** Owner Login */
export const ownerLogin = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}owner/login`, {
     
      email: data.email,
      password: data.password,
      
    });
      
    const resData = res.data;
    
    return resData;
  } catch (err) {
    
    
    throw err
   
  }
}


/**Owner Register */
export const OwnerSignup = async(data)=>{
  try {
    
    const res = await axios.post(`${BaseURL}owner/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
  
    return resData;
  } catch (err) {
   
    
    throw err
  }
}

/** Get user Profile */
export const UserProfiles = async()=>{
  const id= localStorage.getItem("userId");

  
  const res = await axios.get(`${BaseURL}user/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;
  
  
  return resData
}
/**update user profile */
export const updateUserProfile= async(data,image)=>{
  
try {
  const id= localStorage.getItem("userId");
  const formData = new FormData();
  formData.append("image",image);
  formData.append("userdata",JSON.stringify(data))
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
     
    },
    withCredentials: true,
  };
  const res = await axios.post(`${BaseURL}user/${id}`,formData,config);
  const resData = res.data;
    return resData;
  
} catch (error) {

  
    throw error
  
}
}
/** Get Admin Profile */
export const AdminProfiles = async()=>{
  const id= localStorage.getItem("adminId");
  const res = await axios.get(`${BaseURL}admin/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;

  return resData
}
/**update admin profile */
export const updateAdminProfile= async(data,image)=>{
  
  try {
    const id= localStorage.getItem("adminId");
    const formData = new FormData();
    formData.append("image",image);
    formData.append("admindata",JSON.stringify(data))
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      },
      withCredentials: true,
    };
    const res = await axios.post(`${BaseURL}admin/${id}`,formData,config);
    const resData = res.data;
      return resData;
    
  } catch (error) {
   
    
      throw error
    
  }
  }

  /** Get Owner Profile */
export const OwnerProfiles = async()=>{
  const id= localStorage.getItem("ownerId");
  const res = await axios.get(`${BaseURL}owner/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;

  
  return resData
}
/**update owner profile */
export const updateOwnerProfile= async(data,image)=>{
  
  try {
    const id= localStorage.getItem("ownerId");
    const formData = new FormData();
    formData.append("image",image);
    formData.append("ownerdata",JSON.stringify(data))
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      },
      withCredentials: true,
    };
    const res = await axios.post(`${BaseURL}owner/${id}`,formData,config);
    const resData = res.data;
      return resData;
    
  } catch (error) {
   
    
      throw error
    
  }
  }

  /**get all users */
  export const getUsers = async (page, limit) => {
    const id = localStorage.getItem("adminId");
    const token = localStorage.getItem("admintoken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${BaseURL}admin/users/${id}`,config, {
      params: { page, limit }, 
    });
  
    if (res.status !== 200) {
      throw new Error("Unexpected error");
    }
  
    const resData = res.data;
   
    return resData;
  };
  /**get All user Owner */
  export const getusersOwner = async (page, limit) => {
    try {
      const id = localStorage.getItem("ownerId");
      const token = localStorage.getItem('ownertoken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${BaseURL}owner/users/${id}`,config, {
        params: { page, limit },
      });
  
      const resData = res.data;
  
      return resData;
    } catch (error) {
      // Handle error
      
      
      throw error;
    }
  };
  
  /* get movies*/
  export const getMovies = async (page, limit) => {
    const id = localStorage.getItem('adminId');
    const token = localStorage.getItem('admintoken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    };
    const res = await axios.get(`${BaseURL}admin/movies/${id}`, config);
    if (res.status !== 200) {
      throw new Error('Unexpected error');
    }
    const resData = res.data;
    return resData;
  };
  

  /* Add Movie*/
  export const AddMovie = async (movieData, file) => {
    try {
      const id = localStorage.getItem('adminId');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('admindata', JSON.stringify(movieData));
      const admintoken = localStorage.getItem('admintoken')
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${admintoken}`,
        },
        withCredentials: true,
      };
  
      const res = await axios.post(`${BaseURL}admin/movie/${id}`, formData, config);
      const resData = res.data;
      return resData;
    } catch (error) {
      
      
      throw error;
    }
  };
 
/**Specific Movie */
  export const getMovieDetails = async (id) => {
    try {
      
      const token = localStorage.getItem('admintoken')
      
      const response = await axios.get(`${BaseURL}movie/editmovie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data.movie;
      } else {
        throw new Error('Failed to fetch movie details');
      }
    } catch (error) {
  
      

      throw new Error('Failed to fetch movie details');
    }
  };
  /**Edit Movie */
export const editMovie = async (movieId, movieData,file) => {
  try {

    
    const admintoken = localStorage.getItem('admintoken');
    const formData = new FormData();
      formData.append('image', file);
      formData.append('admindata', JSON.stringify(movieData));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${admintoken}`,
        },
        withCredentials: true,
      };
    const response = await axios.post(`${BaseURL}movie/editedmovies/${movieId}`, formData, config)

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to edit movie');
    }
  } catch (error) {
    console.error('Failed to edit movie:', error);
    throw new Error('Failed to edit movie');
  }
};
/**GET All Owners */
 export const getOwnerDetail = async()=>{
  let id = localStorage.getItem("adminId");
  const admintoken = localStorage.getItem('admintoken');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${admintoken}`,
    },
    withCredentials: true,
  };
  const res = await axios.get(`${BaseURL}admin/owners/${id}`,config);

  if(res.status!==200){
    return console.log("unexpected error");
  }
 
  
  const resData = res.data;
  return resData
 }
 
 /**Get movies in theater */
 export const getownerMovies =async()=>{
  const id= localStorage.getItem("ownerId");
  const res = await axios.get(`${BaseURL}owner/movies/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }
  const resData = res.data.movies;
 
  return resData

 }
 /**Add thatre */
 export const AddTheatre = async (theatreData) => {
  try {
    const token = localStorage.getItem("ownertoken");
    const response = await axios.post(`${BaseURL}owner/add_theatre`, theatreData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status!==200) {
      throw new Error('Failed to add theatre');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(`Failed to add theatre: ${error.message}`);
  }
};
/**Get theatre list of owner */
export const GetTheatres = async () => {
  try {
    const token = localStorage.getItem('ownertoken');
    const id = localStorage.getItem('ownerId');
     
    const response = await axios.get(`${BaseURL}owner/theatre/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // if (response.status !== 200) {
    //   throw new Error('Failed to get theaters');
    // }
 
    const data = response.data;
   
    

    return data.theaters;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};
/**Get Theatre Details */
export const getTheatreDetails = async(id)=>{
  try {
   
    const token =localStorage.getItem('ownertoken');
    const response =await axios.get(`${BaseURL}owner/edittheatre/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })

    if(response.status===200){
      return response.data.theatre;
    }else{
      throw new Error('Failed to fetch thatre details');
    }
  } catch (error) {
    
    

      throw new Error('Failed to fetch theatre details');
  }

}
/**Edit theatre */
export const updateTheatreDetails = async ( theatreId, updatedDetails) => {
  try {
  let token = localStorage.getItem("ownertoken")

    // Make the API request to update the theater details
    const response = await axios.post(`${BaseURL}owner/updatetheatre/${theatreId}`, updatedDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the updated theater details if necessary
    return response.data;
  } catch (error) {
    throw new Error('Failed to update theater details');
  }
};
/**Get Specific movie to User */
export const getMovieById = async(id)=>{
  try {
    const res = await axios.get(`${BaseURL}movie/usermovie/${id}`);

    if (res.status !== 200) {
      
      
      return null;
    }

    const data = res.data;
    
    return data;
  } catch (err) {
    
    
    return null;
  }
  
}
export const getTheatresByMovie = async (id) => {
  try {

    const response = await axios.get(`${BaseURL}user/movie/${id}`);
 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch theatres');
  }
};


export const fetchDataByTheatreId = async (id) => {
  try {

    const response = await axios.get(`${BaseURL}user/theatres/${id}`);
   
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch theatre data');
  }
};
/**Rserved thereter */
export const theatreReserve = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('Please log in to make a reservation.');
    }
    const currentDate = new Date().toISOString().split('T')[0]; 
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
    if (data.Date === currentDate && data.Time < currentTime) {
      throw new Error('Selected time is in the past. Please choose a valid show timing.');
    }

   
    
    const response = await axios.post(`${BaseURL}user/reservation`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error('Failed to update theater details');
  }
};

/** getmovies by language */
export const getMoviesByLanguage = async (selectedLanguage, currentPage) => {
  try {
    const response = await axios.get(`${BaseURL}movie/moviesbylan`, {
      params: {
        language: selectedLanguage,
        page: currentPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getDistinctLanguages =async()=>{
  try {
    const response = await axios.get(`${BaseURL}movie/movieslan`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
/** user bookings */
export const getBookingsForUser = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${BaseURL}booking/userbookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**Admin side banner  */
export const getBanners = async () => {
  try {
    const id = localStorage.getItem("adminId");
    const admintoken = localStorage.getItem("admintoken");
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admintoken}`,
      },
      withCredentials: true,
    };

    const response = await axios.get(`${BaseURL}admin/allbanners/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};
/***Add banner  */
export const addBanner = async (bannerData) => {
  try {
    const id = localStorage.getItem("adminId");
    const admintoken = localStorage.getItem("admintoken");
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admintoken}`,
      },
      withCredentials: true,
    };
    const response = await axios.post(`${BaseURL}admin/banners/${id}`, bannerData, config);

  
    return response.data;
  } catch (error) {
    throw new Error('Failed to add banner');
  }
};
/**render banner to user */
export const getuserBanners =async()=>{
  try {
   const id = localStorage.getItem("userId")
    const response = await axios.get(`${BaseURL}user/userbanner/${id}`);
   
    return response.data;
  } catch (error) {
    throw error;
  }
}
/**cancle booking */
export const cancelBooking =async(id)=>{
  try {
   
    
    const token = localStorage.getItem("token")
    const config = {
      headers: {
      
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.delete(`${BaseURL}booking/cancelbooking/${id}`,config);
    return response.data;
  } catch (error) {
    throw error;
  }
  
}
/**wallet booking */
export const walletBooking = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${BaseURL}user/walletpay/${id}`,
      null,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
/**get all booking for admin */
export const getAllBookingsAdmin = async () => {
  try {
    const token = localStorage.getItem("admintoken");
    const id = localStorage.getItem("adminId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}admin/allbookings/${id}`, config);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};
/**get booking to owner */
export const getAllBookingsOwner = async()=>{
  try {
    const token = localStorage.getItem("ownertoken");
    const id = localStorage.getItem("ownerId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}owner/allbookings/${id}`, config);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}
/* admindadhboard cards */
export const adminFetchData =async()=>{
  try {
    const token = localStorage.getItem("admintoken");
    const id = localStorage.getItem("adminId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}admin/dashboardrevenue/${id}`, config);
   
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
 
}
/**admin dahsboard chart */
export const adminChartFetch = async()=>{
  try {
    const token = localStorage.getItem("admintoken");
    const id = localStorage.getItem("adminId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}admin/dashboardchart/${id}`, config);
    
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}
/* ownerdadhboard cards */
export const ownerFetchData =async()=>{
  try {
    const token = localStorage.getItem("ownertoken");
    const id = localStorage.getItem("ownerId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}owner/dashboardrevenue/${id}`, config);
  
    
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
 
}
/**owner dahsboard chart */
export const ownerChartFetch = async()=>{
  try {
    const token = localStorage.getItem("ownertoken");
    const id = localStorage.getItem("ownerId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}owner/dashboardchart/${id}`, config);
    
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}

/**User theater detials  */
export const getTheaters =async()=>{
  try {
    const response = await axios.get(`${BaseURL}user/gettheaterdetails`);
  
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}
/*** Booking Details for Admin */
export const getBookingsForAdmin = async()=>{
 
  try {
    const token = localStorage.getItem("admintoken");
    const id = localStorage.getItem("adminId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}admin/alluserbookings/${id}`, config);
    
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}
/**Booking Details for Owner */
export const getBookingsForOwner =async()=>{
  try {
    const token = localStorage.getItem("ownertoken");
    const id = localStorage.getItem("ownerId")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}owner/alluserbookings/${id}`, config);
    
    return response.data;


  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
}

/**Get All Upcomming Movies */
export const getAllUpcommingMovies =async()=>{
  try {
   
    const response = await axios.get(`${BaseURL}movie/allupcommingmovies`);
    
    return response.data;


  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}