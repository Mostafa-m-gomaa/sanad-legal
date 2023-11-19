import React from 'react'
import './courses.css'
import './courses.css'
import { useState ,useEffect } from 'react';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
    const {route ,imgRoute ,setLoader ,login ,paid,setPaid}=useContext(AppContext)
    const [courses ,setCourses]=useState([])


    const watchCourse =(e,id)=>{
        if(!login){
            e.preventDefault()
            toast.error("قم بتسجيل الدخول اولا")
        }
        if(login && !paid){
            e.preventDefault()
            toast.error("عليك دفع ثمن الاشتراك أولا")
            console.log(paid)
        }
        // setLoader(true)
        // fetch(`${route}/course/show/${id}`,{
        //     headers:{
        //         "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
        //     }
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data)
        //     setLoader(false)
        // })
    }


    useEffect(()=>{
        fetch(`${route}/course`)
        .then(res => res.json())
        .then(data => {
          if(data.data){
              setCourses(data.data)
              console.log(data)
          }
        })
            },[])
  return (
<div className="courses">
    <div className="container">
        <h1>كورساتنا القانونية</h1>
        <div className="all-courses">
            {courses.map((course,index)=>{
                return(
                    <div className="course-card" key={index}>
                        <img src={`${imgRoute}/${course.image}`} alt="" />
                        <div className="title">{course.title}</div>
                        <div className="desc">{course.desc}</div>
                        <div className="inst">{course.instructor_name} الاستاذ</div>
                        <Link to={`/course/${course.id}/${course.title}`} onClick={(e)=>watchCourse(e,course.id)} className="watch">مشاهدة الكورس</Link>
                    </div>
                )
            })}
        </div>
    </div>
</div>
  )
}

export default Courses
