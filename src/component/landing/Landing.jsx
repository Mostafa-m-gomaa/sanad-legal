import React from 'react'
import './landing.css'
import logo from '../../assets/logo.jpg'

const Landing = () => {
  return (
<div className="landing">
    
        <div className="left">
            <div className="container">
                <p>المبادئ والقواعد القانونية من النصوص النظامية ومما استقر عليه العمل في الاحكام القضائية ، نُقدم لأعضاء منصتنا مكتبة متنوعة من صيغ الدعاوى واللوائح والمذكرات والعقود بالإضافة الى الأبحاث القانونية ومكتبة كورسات لشرح الانظمة في مختلف افرع القانون ، لدينا رؤية في تنفيذ الخدمات المساندة للمتقاضين واستراتيجيات إدارة الدعاوى وفق افضل الممارسات المهنية، يمكنكم طلب خدمة قانونية من قسم اطلب خدمة قانونية، تفضل بتصفح اقسام موقعنا لمعرفة المزيد،،
</p>
            </div>
        </div>
        <div className="right">
        <div className="container">

                <img src={logo} alt="" />
             <div>سند القانون </div>
             <div>اخلربة اليت حتتاجها، النتائج اليت تسعى اليه</div>
             <div>منصة متخصصة يف الدراسات والصيغ القانونية العملية</div>
            
        </div>
        </div>
    
</div>
  )
}

export default Landing
