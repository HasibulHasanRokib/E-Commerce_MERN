import { useContext, useState } from "react";
import { FaEnvelope, FaMap, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import {Link} from 'react-router-dom'
const Contact = () => {

  const{user}=useContext(AuthContext)
  const [subject,setSubject]=useState()
  const [message,setMessage]=useState()

  

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-8">
        <h2 className="text-4xl font-semibold">Contact Us</h2>
        <p className="mt-2">Leave a message. We love to hear from you</p>
      </div>
      <div className="grid grid-cols-2 items-center my-20">
        <div className="mx-auto">
          <span className=" font-thin">GET IN TOUCH</span>
          <h3 className="font-bold text-2xl">Visit our office today or Contact us</h3>
          <div className="my-8">
            <h5 className="font-bold">Head Office</h5>
            <ul className="mt-5">
              <li><FaMap className="inline-block mr-3"/><samp>Road 11, G-Block , Banani Dhaka</samp></li>
              <li><FaEnvelope className="inline-block mr-3"/><samp>plan@gmail.com</samp></li>
              <li><FaPhoneAlt className="inline-block mr-3"/><samp>+88 016346259738</samp></li>
              <li><FaRegClock className="inline-block mr-3"/><samp>Saturday to Thursday: 10 am to 8 pm</samp></li>
            </ul>
          </div>
        </div>
        <form className="flex flex-col gap-2">
        <span className="font-thin">LEAVE A MESSAGE</span>
        <h3 className="font-bold text-2xl">We love to here from you</h3>
        <input className="p-3 border-slate-300 border outline-none rounded-sm" value={user?.name} type="text" name="name" id="name" placeholder="Your Name" required />
        <input className="p-3 border-slate-300 border outline-none rounded-sm" onChange={(e)=>setSubject(e.target.value)} value={subject} type="text" name="subject" id="subject" placeholder="Subject" required />
        <textarea className="p-3 border-slate-300 border outline-none rounded-sm" onChange={(e)=>setMessage(e.target.value)} value={message}  name="message" id="message" placeholder="Your message" cols="" rows="5"></textarea>
        <Link className="font-semibold text-center block bg-sky-500 p-3 text-white rounded-md mt-2" to={`mailto:imteajur@gmail.com?subject=${subject}&body=${message}`}>
         Sent Message
        </Link>
        </form>
      </div>
    </div>
  )
}

export default Contact
