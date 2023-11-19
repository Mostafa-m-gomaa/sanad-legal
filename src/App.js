import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Nav from './component/nav/Nav';
import Home from './component/home/Home';
import React, { useContext, useState ,useEffect ,createContext} from 'react';
import Who from './component/who-us/Who';
import Services from './component/service/Services';
import Contact from './component/contact/Contact';
import Footer from './component/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Articles from './component/articles/Articles';
import Models from './component/models/Models';
import Courses from './component/courses/Courses';
import Login from './component/login/Login';
import SignUp from './component/sign-up/SignUp';
import Sanad from './component/sanad/Sanad';
import Service from './component/khedma/Khedma';
import Pack from './component/package/Pack';
import Pay from './component/payPal/Pay';
import Lessons from './component/lessons/Lessons';




export const AppContext=createContext()

function App() {
 const [login,setLogin] =useState(false)
 const [paid ,setPaid]=useState(false)
 const [token,setToken] =useState("")
 const [userName,setUserName] =useState("")
 const [userEmail,setUserEmail] =useState("")
 const [userPhone,setUserPhone] =useState("")
 const [loader ,setLoader] =useState(false)
 const [route ,setRoute]=useState("https://api.sanad-legal.com/api")
 const [imgRoute ]=useState("https://api.sanad-legal.com/storage")
 const [refresh,setRefresh]=useState(false)
 const [price,setPrice]=useState("")


useEffect(()=>{
  if(sessionStorage.getItem("login")){
    setToken(sessionStorage.getItem("token"))
    setLogin(sessionStorage.getItem("login"))
    setUserName(sessionStorage.getItem("name"))
    setUserEmail(sessionStorage.getItem("email"))
    setUserPhone(sessionStorage.getItem("phone"))
  }

},[login])

useEffect(()=>{

  if(login && sessionStorage.getItem("paid") === "null"){
    setPaid(false)
  }
  else if(login && sessionStorage.getItem("paid") !== "null"){
    setPaid(true)
  }

},[login])
  return (
    <AppContext.Provider value={{
    imgRoute,
    route,
    setRoute,
    login,
    setLogin ,
    token,
    setToken ,
    setLoader ,
    refresh ,
    setRefresh ,
    paid ,
    setPaid ,
    price ,
    setPrice }}>

      <div className="App">
      <ToastContainer />
      {loader ?    <div className="spin-cont"><div className="spinner">
  <div className="rect1"></div>
  <div className="rect2"></div>
  <div className="rect3"></div>
  <div className="rect4"></div>
  <div className="rect5"></div>
</div></div>:null}

     <Nav />
     <Routes>
     <Route
       path="/"
       element={<Home />}
     />
     <Route path='who-us' element={<Who />}/>
     <Route path='services' element={<Services />}/>
     <Route path='contact' element={<Contact />}/>
     <Route path='articles' element={<Articles />}/>
     <Route path='sanad' element={<Sanad />}/>
     <Route path='courses' element={<Courses/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='sign-up' element={<SignUp/>}/>
     <Route path='service' element={<Service/>}/>
     <Route path='/packs' element={<Pack/>}/>
     <Route path='paypal/:price/:days' element={<Pay/>}/>
     <Route path='categ/:categId/:categTitle' element={<Models/>}/>
     <Route path='course/:courseId/:courseName' element={<Lessons/>}/>
  

   </Routes>
   <Footer />



  
  
 </div>
  
 </AppContext.Provider>
  );
}

export default App;
