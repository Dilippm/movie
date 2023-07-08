import axios from 'axios';
import React, { useState } from 'react';
import BaseURL from '../../config';


const PayButton =({reservationDetails})=>{
    const id = localStorage.getItem("userId")
    const handleCheckout =() =>{
axios.post(`${BaseURL}payment/create-checkout-session`,{
    reservationDetails,
  id
}).then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
    }
}).catch((err)=>{
    console.log(err.message);
})
    }
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    const buttonStyle = {
      marginLeft: '150px',
      marginTop: '20px',
      height: '50px',
      width: '150px',
      backgroundColor: isHovered ? 'red' : 'purple',
      fontSize: '25px',
   
      color: 'white',
      cursor: 'pointer',
      borderRadius: '50px',
    };
    return(
<>
<button
      style={buttonStyle}
      onClick={() => handleCheckout()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    <b>Payment</b>  
    </button>


</>
    )
}
export default PayButton;