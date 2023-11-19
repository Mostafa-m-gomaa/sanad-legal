import React, { useContext, useEffect, useState } from 'react'
import { PayPalScriptProvider ,PayPalButtons } from '@paypal/react-paypal-js';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pay.css'

const Pay = () => {
const param =useParams()
const {route,price}=useContext(AppContext)




const handleBuy = async ()=>{
  const formData = new FormData();
  formData.append('expire_days', param.days);
await fetch(`${route}/subscribe`, {
  method :"POST",
          headers:{
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          },
          body: formData,
        })
 .then(res=>res.json())
 .then(data=>{
 console.log(data)
})}

// window.paypal.Buttons({
//   createOrder: function(data, actions) {
//     return actions.order.create({
//       purchase_units: [{
//         amount: {
//           value: '600.00'
//         }
//       }]
//     });
//   },
//   onApprove: function(data, actions) {
//     return actions.order.capture().then(function(details) {
//       console.log(details);
//       toast.success("su")
//     });
//   }
// }).render('#pay-pal');




  return (
   <div className="pay-pal">
    <div className="container">
    <PayPalScriptProvider className="pay-container" options={{"client-id":"AajDl_am9PQK0lqUsukLYJw566g5b8ozE6zbhrw9N50d7-83TDlE_1Z6tbhDwwLdot-Zil58LHv4-Rc2"}}>
      <PayPalButtons 
    
        createOrder={(data, actions) => {
          return actions.order
              .create({
                  purchase_units: [
                      {
                          amount: {
                              // currency_code: currency,
                              value: `${param.price}.00`,
                          },
                      },
                  ],
              })
        
      }}
      onApprove={(data,actions)=>{
        return actions.order.capture().then(function (details) {
         if(details.status == "COMPLETED"){
            handleBuy()
          toast.success(" تم الدفع يرجي تسجيل الخروج ثم الدخول مرة أخري" )

         } 
         
        })
      }}
   
      />
      
    </PayPalScriptProvider>

    <div id="pay-pal"></div>
    <div className="price">price : {param.price}$</div>
    </div>
   </div>
  )
}

export default Pay
