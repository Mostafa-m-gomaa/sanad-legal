import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import './article.css'
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Articles = () => {
  const [articles ,setArticles]=useState([])
  const {route ,setLoader ,imgRoute}=useContext(AppContext)
  const [search ,setSearch]=useState("")

const changeSearch =()=>{
  setLoader(true)
 
  fetch(`${route}/article/search/${search}`)
    .then(res=>res.json())
    .then(data =>{
      
     setLoader(false)
    if(data.status === "success"){
      setArticles(data.data)
    }
    else{
      toast.warning(data.msg)
    }
    })
}

  useEffect(()=>{
    fetch(`${route}/article`)
    .then(res=>res.json())
    .then(data=>{
      if(data.data){
        setArticles(data.data)
        console.log(data.data)
      }
    })
  },[])
  return (
<div className="articles">

    <div className="container">
          <h1>أحدث المقالات القانونية</h1>
      
        <div className="all-art">
          
          <div className="arts">
            {articles.map((art,index)=>{
              return(
                <div className="article-card" key={index}>
                  <h2 className="title">{art.title}</h2>
                  <div className="desc">{art.desc}</div>
                  {art.pdf ? <a href={`${imgRoute}/${art.pdf}`} target='_blank'>اطلع علي الملف</a>:<div> لا يوجد ملف</div>}
                  {art.image ? <img src={`${imgRoute}/${art.image}`} alt="" />:<div> لا يوجد صورة</div>}
                  
                </div>
              )
            })}
          </div>
          <div className="search">
            <div className="title">ابحث في مقالاتنا </div>
            <div className="srch-btn">
            <input placeholder='ابحث هنا' value={search} onChange={(e)=>setSearch(e.target.value)} type="text" />
            <button onClick={changeSearch}>بحث</button>
            </div>
          </div>
        </div>
    </div>
</div>
  )
}

export default Articles
