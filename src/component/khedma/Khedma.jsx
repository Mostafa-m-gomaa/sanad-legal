import React, { useState ,useContext} from 'react'
import '../sanad/sanad.css'
import { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Service = () => {
    const [file, setFile] = useState(null);
    const [title ,setTitle]=useState("")
    const [disc ,setDisc]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const {route ,setLoader }=useContext(AppContext)
    const type = 'service'

    const sendOrder = async (e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description',disc);
        formData.append('userName',name);
        formData.append('email',email);
        formData.append('type',type);
        formData.append('phone',phone);
        if(file){
            formData.append('pdf',file);
        }
    
    
        try {
          const response = await fetch(`${route}/service`, {
            method: 'POST',
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

    
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
<div className="sanad">
    <div className="container">
        <h1>يمكنك طلب خدمة قانونية خاصة بقضيه معينة من هنا</h1>
        <form action="" onSubmit={sendOrder}>
            <label htmlFor="">
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
        عنوان الخدمة
            </label>
            <label htmlFor="">
                <input value={disc} onChange={(e)=>setDisc(e.target.value)} type="text" />
                شرح المطلوب
            </label>
            <label htmlFor="">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                الاسم
            </label>
            <label htmlFor="">
                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                الايميل
            </label>
            <label htmlFor="">
                <input type="text"  required value={phone} onChange={(e)=>setPhone(e.target.value)} />
                رقم الهاتف            </label>
            <label htmlFor="">
                <input type="file"    accept="application/pdf" onChange={handleFileChange}/>
                ملف مرفق ان وجد
            </label>
            <button type='submit'> ارسال</button>
        </form>
    </div>
</div>
  )
}

export default Service
