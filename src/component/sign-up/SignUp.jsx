import React, { useContext } from 'react'
import './signUp.css'
import { Link } from 'react-router-dom'
import laptop from"../../assets/laptop.png"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const history =useNavigate()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState(null)
  const {route ,setLoader}=useContext(AppContext)

  const handleEmail =(e)=>{
    setEmail(e.target.value)
  }

  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }
  const handleName =(e)=>{
    setName(e.target.value)
  }
  const handlePhone=(e)=>{
    setPhone(e.target.value)
  }
 
  const handleSign = async (event) => {
    event.preventDefault();
    setLoader(true)
  
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    try {
      const response = await fetch(`${route}/auth/register`, {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      console.log(response)
      setLoader(false)
      if (response.status=="Success") {
   toast.success("تم انشاء الحساب")
   history("/login")
      }
      if(response.errors.phone){
        toast.error(response.errors.phone[0])
      }
      if(response.errors.email){
        toast.error(response.errors.email[0])
      }
      else {
    toast.error("هناك خطأ بكلمة السر أو الأيميل حاول مرة أخري")
      }
    } catch (error) {
      console.error(error);
    
    }
  };


  return (
    <div className="sign-up">
        <div className="container">
        <div class="form-box">
<form class="form">
    <span class="title">انشاء حساب</span>
    <span class="subtitle">قم بانشاء حسابك مجانا</span>
    <div class="form-container">
			<input value={name} onChange={handleName} type="text" class="input" placeholder="الاسم كامل" />
			<input value={email} onChange={handleEmail} type="email" class="input" placeholder="الايميل" />
      <input type="text" value={phone} onChange={handlePhone} class="input" placeholder="رقم الهاتف" />
			<input type="password" value={password} onChange={handlePassword} class="input" placeholder="كلمة السر" />
    </div>
    <button onClick={handleSign}>انشاء</button>
</form>
<div class="form-section">

</div>
</div>
        </div>
    </div>
  )
}

export default SignUp
