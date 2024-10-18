import image1 from '../assets/img/logo.jpg';
import image2 from '../assets/img/app.jpg';
import image3 from '../assets/img/play.jpg';
import image4 from '../assets/img/pay.png'
import { FaFacebookF,FaInstagram,FaPinterest,FaYoutube,FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { ProductContext } from '../context/productContext';

const Footer = () => {

const {setActive}=useContext(ProductContext) 

    return (
        <footer className='border-t-2 py-10 bg-white print:hidden'>
            <div className="flex gap-10 max-w-7xl mx-auto justify-center">
                <div className="flex flex-col mb-2 ">
                    <img className=" h-[100px] w-[100px]" src={image1} alt="" />
                    <h4 className='my-2 text-xl font-bold'>Contact</h4>
                    <p> <span className='font-semibold mr-1'>Address:</span> House 37, Road-12 Sector 10 Uttara Dhaka</p>
                    <p> <span className='font-semibold mr-1'>Phone:</span> 0145652989</p>
                    <p> <span className='font-semibold mr-1'>Hours:</span> 10:00-18:00 Mon-Sat</p>
                    <div className="mt-2">
                        <h4 className='font-bold'>Follow us</h4>
                        <ul className="flex gap-2 my-1">
                            <li><Link to="#"> <FaFacebookF /></Link></li>
                            <li><Link to="#"> <FaTwitter /></Link></li>
                            <li><Link to="#"><FaInstagram /></Link> </li>
                            <li><Link to="#"><FaPinterest /></Link> </li>
                            <li><Link to="#"><FaYoutube/></Link> </li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-20">
                <div className="">
                    <h4 className='font-bold text-lg my-2'>About</h4>
                    <ul className='flex flex-col gap-2'>
                    <li className='hover:underline' onClick={()=>setActive('portfolio')}><Link to="/portfolio">Portfolio</Link></li>
                    <li className='hover:underline' onClick={()=>setActive('about')}><Link to="/about">About us</Link></li>
                    <li className='hover:underline' onClick={()=>setActive('contact')}><Link to="/contact">Contact us</Link></li>
                    <li className='hover:underline' onClick={()=>setActive('services')}><Link to="/services">Services</Link></li>
                    </ul>              
                </div>
                <div className="">
                    <h4 className='font-bold text-lg my-2'>My Accpunt</h4>
                    <ul className='flex flex-col gap-2'>
                    <li className='hover:underline' onClick={()=>setActive('cart')}><Link to="/cart">View cart</Link></li>
                    <li className='hover:underline' onClick={()=>setActive('contact')}><Link to="/contact">Help</Link></li>
                    </ul> 
                </div>

                <div className="col install">
                    <h4 className='font-bold text-lg my-2'>Install App</h4>
                    <p>From app store or Google Play.</p>
                    <div className="flex my-1 gap-1">
                        <img className='border-2 border-gray-400 rounded-md' src={image2} alt="" />
                        <img className='border-2 border-gray-400 rounded-md' src={image3} alt="" />
                    </div>
                    <p className='font-bold my-2'>Payment Via</p>
                    <img  src={image4} alt="" />
                </div>
                </div>
            </div>
             <div className="p-4 text-center">
                    <p className='font-semibold'>© Plan Interior design</p>
            </div>
        </footer>
    );
};

export default Footer;