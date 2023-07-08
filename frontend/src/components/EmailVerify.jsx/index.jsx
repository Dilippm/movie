import {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import BaseURL from '../../config'
import styles from  './styles.modules.css';
import success from '../../assets/success.png'
import { Link, useParams } from 'react-router-dom';
const EmailVerify=()=>{
    const [validUrl,setValidUrl] =useState(false);
        const param = useParams()
useEffect(()=>{
    const verifyEmailUrl =async()=>{
        try {
            const url = `${BaseURL}user/${param.id}/verify/${param.token}`
        const {data} =await axios.get(url);
        console.log(data);
        setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false)
        }
    }
    verifyEmailUrl();
},[])
    return (
<Fragment>
{validUrl ?(
<div className={styles.container}>
<img src={success} alt="success_img" className={styles.success_img} />
<h1>Email verified Successfully</h1>
<Link to="/login">
    <button className={styles.green_btn}>Login</button>
</Link>
</div>
):(
    <h1>404 NotFound</h1>
)}
</Fragment>
    )
}
export default EmailVerify;