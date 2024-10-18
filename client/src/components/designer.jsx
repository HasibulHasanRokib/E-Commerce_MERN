import { Link } from 'react-router-dom'
import { FaFacebookF,FaInstagram,FaYoutube,FaTwitter } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Designer = ({item}) => {

const {user} = useContext(AuthContext)

  return (
    <>
    <div className="bg-white  p-4 rounded-md border shadow-sm ">
    <div className="flex gap-4">
        <img className='w-24 h-24 object-cover rounded-md border' src={item?.avatar}  alt="image" />
        <div className="">
            <h5 className='font-semibold text-sm'>📍{item.address}</h5>
            <p className='text-sm capitalize'>{item.status}</p>
            <ul className='flex gap-2 mt-4'>
                <li className='hover:text-blue-500'><Link to={""}><FaFacebookF/></Link></li>
                <li className='hover:text-blue-500'><Link to={""}><FaTwitter/></Link></li>
                <li className='hover:text-blue-500'><Link to={""}><FaInstagram/></Link></li>
                <li className='hover:text-blue-500'><Link to={""}><FaYoutube/></Link></li>
            </ul>
        </div>
    </div>
    <article className='py-3'>
        <h2 className='text-lg font-bold'>{item?.name}</h2>
        <p className='text-sm'>{item?.description.slice(0,250)}...</p>
    </article>
{/* imteajur@gmail.com */}
    {user ? 
    <Link to={`mailto:imteajur@gmail.com?subject=Contact with Designer ${item.name}`}>
    <button className='bg-gray-700 p-2 font-semibold rounded-md text-white w-full'>Design with <samp className='uppercase'> {item?.name.slice(0,5)}</samp></button>
    </Link>
    :
    null
    }
</div>
    </>
  )
}

export default Designer
