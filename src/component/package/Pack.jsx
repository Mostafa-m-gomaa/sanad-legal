import './pack.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Pack = () => {
    const {route ,setLoader ,imgRoute ,setPrice ,login}=useContext(AppContext)
  const [search ,setSearch]=useState("")
  const [packages,setPackages]=useState([])

  const clickLink =(e,price)=>{
if(!login){
    e.preventDefault()
    toast.error("قم بتسجيل الدخول اولا")
}
else{

    setPrice(price)
}

  }


  useEffect(()=>{
    fetch(`${route}/package`)
    .then(res=>res.json())
    .then(data=>{
      if(data.data){


        setPackages(data.data)
      }
    })
  },[])
  return (
 <div className="pack">
    <div className="container">
    <h1>يمكنك الاٍشتراك في باقاتنا من هنا</h1>
    <div>مرحبا بك </div>
    <div className="packs">
        {packages.map((pack,index)=>{
            return(
                <div className="pack-card" key={index}>
                 <img src={`${imgRoute}/${pack.image}`} alt="" />
                 <div className="txt">

                <div className="title">{pack.title}</div>
                <div className="desc">{pack.description}</div>
                 <div className="price">{pack.price} $</div>
                 <Link onClick={(e)=>clickLink(e,pack.price)} to={`/paypal/${pack.price}/${pack.expire_days}`}>اٍشترك الأن</Link>
                 </div>
                </div>
            )
        })}
    </div>
    </div>
 </div>
  )
}

export default Pack
