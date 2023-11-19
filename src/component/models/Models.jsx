import React, { useContext, useEffect, useState } from 'react'
import './models.css'
import { AppContext } from '../../App'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Models = () => {
    const {route ,imgRoute,paid ,refresh ,setLoader ,login}=useContext(AppContext)
    const [models,setModels]=useState([])
    const [orderForm,setOrderForm]=useState(false)
    const param =useParams()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [desc,setDesc]=useState("")
    const [modelId,setModelId]=useState("")
    const [pdfUrl,setPdfUrl]=useState("")
    const [showPdf,setShowPdf]=useState(false)
    const [pdfData, setPdfData] = useState(null);
    const [showConfirm ,setShowConfirm]=useState(false)
    const iframeRef = React.createRef();
    const [serchKey,setSerchKey]=useState("")



    const disableTouch = () => {
        const iframe = iframeRef.current;
        if (iframe) {
          iframe.style.pointerEvents = 'none';
        }
      };

    const fetchPDF = async (id) => {
      try {
        // Replace 'your-api-endpoint' with your actual API endpoint
        const response = await fetch(`${route}/model/servePdf/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Replace with your user token
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
  
        const pdfBlob = await response.blob();
        setPdfData(pdfBlob);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
  
    const stepToDownload =(id)=>{

        fetchPDF(id)
        setShowConfirm(true)
    }
    const downloadPDF = async () => {
     setShowConfirm(false)
        if (pdfData) {
          // Create a blob URL for the PDF data
          const pdfUrl = window.URL.createObjectURL(pdfData);
    
          // Create a hidden anchor element and trigger a click to download the file
          const a = document.createElement('a');
          a.href = pdfUrl;
          a.download = 'downloaded-file.pdf'; // Specify the desired file name
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
    
          // Clean up the blob URL and remove the anchor element
          window.URL.revokeObjectURL(pdfUrl);
          document.body.removeChild(a);
        }
      };

    const makingOrder =(id)=>{
        setOrderForm(true)
        setModelId(id)
    }

    const servePdf =(id)=>{
     
        fetch(`${route}/model/servePdf/${id}`,{
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`    
            }
        })
        .then(res=>{console.log(res)
        if(res.ok){
setPdfUrl(`${route}/model/servePdf/${id}`)
setShowPdf(true)
        }
        
        })
       
    }
    const sendOrder = async (e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData();
        formData.append('model_id', modelId);
        formData.append('user_name',name);
        formData.append('user_number',phone);
        formData.append('user_email',email);
        if(desc){

            formData.append('description',desc);
        }

    
        try {
          const response = await fetch(`${route}/order`, {
            method: 'POST',
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData
          })
          .then(res=>res.json());
          setLoader(false)
          if (response.status=="success") {
      console.log(response)
      toast.success("تمت الارسال")
      
          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }
      };
      const searchFun =()=>{
        if(serchKey !== ""){
setLoader(true)
          fetch(`${route}/model/search/${serchKey}`)
          .then(res=>res.json())
          .then(data=>{console.log(data)
            setLoader(false)
          if(data.data){
            setModels(data.data)
          }
          else if(data.status === "faild"){
            toast.error("غير موجود")
          }
          })
        }
      }

    useEffect(()=>{
fetch(`${route}/mcateg/show/${param.categId}`)
.then(res=>res.json())
.then(data=>{
    if(data.data.models){
        setModels(data.data.models)
    }
})
    },[refresh])
    useEffect(()=>{
      console.log(paid)
if(login){
    setEmail(sessionStorage.getItem("email"))
    setPhone(sessionStorage.getItem("phone"))
    setName(sessionStorage.getItem("name"))
}
    },[])
  return (
    
 <div className="models">
    {showConfirm ?   <div className="confirm">
    <div>تحميل الملف</div>
    <div className="btns">
      <button className='yes' onClick={downloadPDF} >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
{orderForm ?  <div className="making-order">
    <div onClick={()=>setOrderForm(false)}  className="over"></div>
<form action="" onSubmit={sendOrder}>
    <div>بعد ارسال البيانات التالية سيقوم موظف من خدمة العملاء التواصل معكم و ارسال النموذج المطلوب</div>
    <label htmlFor="">
        
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
        الاسم
    </label>
    <label htmlFor="">
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" />
        رقم الهاتف
    </label>
    <label htmlFor="">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" />
        الايميل
    </label>
    <label htmlFor="">
       <textarea  onChange={(e)=>setDesc(e.target.value)} value={desc}  cols="30" rows="10"></textarea>
        اضافة مع طلب النموذج
    </label>
    <button type='submit'>ارسال الطلب</button>
</form>
 </div> : null}

 {showPdf ?
    <div className='pdf-cont'>
        <div className="over" onClick={()=>setShowPdf(false)}></div>
  
        
          <iframe
            src={`${pdfUrl}?token=${encodeURIComponent(sessionStorage.getItem("token"))}`}
            // width="100%"
            // height="500px"
            title="PDF Viewer"
            allow="touch" 
            scrolling="yes" // Enable the iframe's built-in scrollbar
        
          ></iframe>
      </div> : null}
    <div className="container">
<h1>{param.categTitle}</h1>
<div className="serch">
  <label htmlFor="">
    يمكنك البحث من هنا 
    <input type="text" placeholder='اكتب هنا' value={serchKey} onChange={(e)=>setSerchKey(e.target.value)} />
  <button onClick={searchFun}>بحث</button>
  </label>
</div>
<div className="models-cont">
    {models.map((model ,index)=>{
        return(
            <div className="model-card" key={index}>
                {model.image ? <img src={`${imgRoute}/${model.image}`} alt="" /> : <div> لا يوجد صور</div>}
                <div className='title'>{model.title}</div>
                <div className="desc">{model.desc}</div>
                {paid ? <div className='download' onClick={()=>servePdf(model.id)} > تحميل الملف</div> :   <div className='any'><div onClick={()=>makingOrder(model.id)} className="order">اطلب هذا النموذج</div> <Link to="/packs"> أو اٍشترك في المنصة من هنا</Link></div>}
               {/* <button onClick={()=>servePdf(model.id)}>ddddd</button> */}
            </div>
        )
    })}
</div>
    </div>


 </div>
  )
}

export default Models
