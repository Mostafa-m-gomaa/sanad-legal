import './lessons.css'
import React from 'react'
import { useState ,useEffect } from 'react';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player';

const Lessons = () => {
const param =useParams()
const {route ,imgRoute ,setLoader ,login ,paid,setPaid}=useContext(AppContext)
const [lessons,setLessons]=useState([])
const [videoLink,setVideoLink]=useState('')
const [showVideo,setShowVideo]=useState(false)

const palyVideo =(url)=>{
setVideoLink(url)
setShowVideo(true)
}

    useEffect(()=>{
        fetch(`${route}/course/show/${param.courseId}`,{

            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`    
            }
        }
        )
        .then(res => res.json())
        .then(data => {
          if(data.data.lessons){
              setLessons(data.data.lessons)
          }
        })
            },[])
  return (
  <div className="lessons">
  {showVideo ?  <div className="video-cont">
        <div className="over" onClick={()=>setShowVideo(false)}></div>
        <ReactPlayer
        className="video"
        url={videoLink} 
        controls={true} 
      />
    </div> :null}
    <div className="container">
        <h2>{param.courseName}</h2>
    <div className="in-lessons">
        {lessons.map((lesson ,index)=>{
            return(
                <div className="lesson-card" key={index}>
                    <img src={`${imgRoute}/${lesson.image}`} alt="" />
                    <div className="name">{lesson.title}</div>
                    <button onClick={()=>palyVideo(lesson.url)}>مشاهدة</button>
                </div>
            )
        })}
    </div>
    </div>
  </div>
  )
}

export default Lessons
