import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.jpg"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import "./nav.css"
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import burger from '../../assets/burger.png'


function Nav(props) {
  const history =useNavigate()
  const {route}=useContext(AppContext)
  const {login,setLogin ,refresh,setRefresh}=useContext(AppContext)
  const [active ,setActive]=useState("")
  const [categs,setCategs]=useState([])



  

const clickBurger =()=>{
  document.querySelector(".nav .list").classList.toggle("list-show")
}
const clickLink =()=>{
  document.querySelector(".nav .list").classList.remove("list-show")
}

const clickOnLink =(e)=>{
const elements = document.querySelectorAll(".nav .list a");
elements.forEach(element => {
  element.classList.remove("active");
});


setActive(e.target.innerHTML)
sessionStorage.setItem("active",e.target.innerHTML)
e.target.classList.add("active")

document.querySelector(".nav .list").classList.toggle("list-show")
}
const logOut =()=>{
  setLogin(false)
  sessionStorage.clear()
  clickOnLink()
  }
useEffect(()=>{
if(sessionStorage.getItem("active")){
  document.querySelectorAll(".nav .list a").forEach(element=>{
    if(element.innerHTML === sessionStorage.getItem("active")){
      element.classList.add("active")
    }
  })
}
},[])



useEffect(()=>{
  fetch(`${route}/mcateg`)
  .then(res=>res.json())
  .then(data=>{
    if(data.data){
      setCategs(data.data)
      console.log(data.data)
    }
  })
},[])

  return (
    <div className="nav">
    <div className="container">
     
      <div className="list">
        <Link onClick={clickOnLink} to="/who-us">من نحن</Link>
        <Link onClick={clickOnLink} to="/services">خدماتنا</Link>
        <Link onClick={clickOnLink} to="/articles">مقالات قانونية</Link>
        <Link  className='library' to="/">المكتبة
        <div className="library-list">
       
        {categs.map((categ=>(
     <Link onClick={()=>{setRefresh(!refresh); clickLink()}} to={`categ/${categ.id}/${categ.title}`} key={categ.id}> {categ.title} </Link>
        )))}

<Link to='courses' onClick={clickLink} >الكورسات </Link>
        </div>
        </Link>
        <Link onClick={clickOnLink} to="/contact">تواصل معنا</Link>
        <Link  className='library' to="/">
اشتري خدمة
        <div className="library-list">
<Link to='/sanad' onClick={clickLink}>توفير سند قانوني </Link>
<Link to='/service' onClick={clickLink} >اطلب خدمة قانونية </Link>

       </div>
        </Link>
        <Link onClick={clickOnLink} to="/packs">الاشتراك في المنصة</Link>
        <Link onClick={clickOnLink} to="/">الرئيسية</Link>
        {login ?  <Link onClick={logOut} to="/login">تسجيل الخروج</Link> : <Link onClick={clickOnLink} to="/login">تسجيل الدخول</Link> }
       
      </div>
      <img  src={logo} alt="" />
      <img onClick={clickBurger} src={burger} className='burger' alt="" />
        </div>
    </div>
  )
}

export default Nav