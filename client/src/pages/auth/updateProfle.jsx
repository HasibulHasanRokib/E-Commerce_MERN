import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { app } from "../../components/firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useMutation} from "@tanstack/react-query"
import { toast } from "react-toastify"
import { userProfileUpdate } from "../../api/authApi"
import { AuthContext } from "../../context/authContext"
import { ProductContext } from "../../context/productContext"

const UpdateProfile = () => {

const {id}=useParams() 
const {dispatch}=useContext(AuthContext)
const {setActive}=useContext(ProductContext)
const navigate=useNavigate()
const fileRef=useRef()
const [file,setFile]=useState()
const [filePer,setFilePer]=useState(0)
const [fileErr,setFileErr]=useState(false)

const {user} = useContext(AuthContext)

const[formData,setFormData]=useState({
   name:user?.name,
   email:user?.email,
   phone:user?.phone,
   address:user?.address,
   avatar:user?.avatar,
   gender:user?.gender
})

const handleChange=(e)=>{
    const { id, value, type } = e.target; 
    if (type === "radio") {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
}


 useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
 },[file])

 const handleFileUpload=(file)=>{
  const storage=getStorage(app)
  const fileName= new Date().getTime() + file.name;
  const storageRef=ref(storage,fileName)
  const uploadTask=uploadBytesResumable(storageRef,file)

  uploadTask.on('state-changed',(snapshot)=>{
    const process=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    setFilePer(Math.round(process))
  },
  (error)=>{
    setFileErr(true)
    console.log(error.message)
  },
  ()=>{getDownloadURL(uploadTask.snapshot.ref)
  .then((downloadURL)=>setFormData({...formData, avatar:downloadURL}))
  }
  )
 }

 const {mutate,isError,isPending,error,reset} = useMutation({
    mutationFn:userProfileUpdate,
    onSuccess:(data)=>{
      if(data.success === false){
       return toast.warning(data.message)
      }else{
       dispatch({type:"update",payload:data.updateUser})
       toast.success(data.message)
       navigate(`/profile/${id}`)
       setActive('profile')
       return;
      }
      }
  })

 const handleUpdate=(e)=>{
    e.preventDefault()
    mutate({id,...formData})
 }


  return (
       <>
       <article className="border-b pb-3">
       <h2 className="font-semibold text-2xl">Update your profile</h2>
        <p>Use a permanent address where you can receive your order.</p>
       </article>
       <form className="flex flex-col max-w-xl mb-5" onSubmit={handleUpdate}>
       <div className="mt-4 grid grid-cols-1 p-4 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-3">
               <input onChange={(e)=>setFile(e.target.files[0])} accept="image/*" type="file" name="avatar" id="avatar" ref={fileRef} className="hidden" />
                <img className="h-12 w-12 rounded-full object-cover border shadow-sm" src={formData.avatar} alt="avatar" />
                <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={()=>fileRef.current.click()}>Change</button>
              </div>
              <div className="my-2">{fileErr ? (<p className="text-xs text-red-500">Uploading failed</p>):filePer > 0 && filePer <100 ? (<p className="text-blue-600 text-xs">{`Uploading ${filePer}%`}</p>):filePer===100 ? (<p className="text-green-600 text-xs">Upload successful</p>):''}</div>  
            </div>
          </div>
       
        <label>Name:</label>
        <input onChange={handleChange} value={formData.name} className="px-3 py-2 outline-none border shadow-sm" type="text" name="name" id="name" placeholder="Name(require)" required/>
        
        <label className="mt-4">Email:</label>
        <input  onChange={handleChange} value={formData.email} className="px-3 py-2 outline-none border shadow-sm" type="email" name="email" id="email" placeholder="Email(require)" disabled/>
        <span className="flex gap-4 mt-5 items-center">
          <label>Gender:</label>
          <input  onChange={handleChange}  type="radio" name="male" id="gender"  value="male" checked={formData.gender==='male'} />Male
          <input  onChange={handleChange}  type="radio" name="female" id="gender" value="female" checked={formData.gender==='female'} />Female
        </span>
        <label className="mt-4">Phone:</label>
        <input  onChange={handleChange} value={formData.phone} className="px-3 py-2 outline-none border shadow-sm" type="number" name="phone" id="phone" placeholder="Phone number(require)" required/>
       
        <label className="mt-4">Address:</label>
        <input  onChange={handleChange} value={formData.address} className="px-3 py-2 outline-none border shadow-sm" type="text" name="address" id="address" placeholder="Address(require)" required/>
        <div className="mt-4 flex gap-2 justify-end border-t-2 py-2">
        <button disabled={filePer > 0 && filePer <100 ? true : false} className="px-3 py-2 border shadow-sm bg-blue-500 text-white rounded-md" type="submit">{isPending ? "Loading...":"Update"}</button>
        <button onClick={()=>{navigate(`/profile/${id}`),setActive('profile')}} className="px-3 py-2 border shadow-sm rounded-md bg-white">Cancel</button>
        </div>
        {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
       </form>
       </>
  )
}

export default UpdateProfile