import { useEffect, useRef, useState } from 'react'
import Demo from '../../../assets/img/user.png'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../../components/firebase'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { addDesigner } from '../../../api/designerApi'
import { toast } from 'react-toastify'

const AddDesigner = () => {

  const navigate = useNavigate()

  const fileRef=useRef()
  const [file,setFile]=useState()
  const [filePer,setFilePer]=useState(0)
  const [fileErr,setFileErr]=useState(false)

  const [formData,setFormData]=useState({name:"",email:"",description:"",address:"",avatar:"",gender:"",status:"",fbLink:"",twitterLink:"",instagramLink:"",youtubeLink:""})


  const handleChange = (e)=>{
    const { id, value, type } = e.target; 
  if (type === "radio") {
    setFormData({ ...formData, [id]: value });
  } else {
    setFormData({ ...formData, [id]: value });
  }
  }

  const {mutate,isError,isPending,error,reset} = useMutation({
    mutationFn:addDesigner,
    onSuccess:(data)=>{
      console.log(data)
      if(data.success === false){
       return toast.warning(data.message)
      }else{
       toast.success(data.message)
       navigate('/admin/all-designers')
       return;
      }
      }
  })

  const handleAddDesigner=(e)=>{
    e.preventDefault()
    mutate(formData)
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
      console.log(process)
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
  

  return (
    <div>
    <h2 className="font-semibold text-2xl">Add Designer</h2>
    <form className="max-w-xl" onSubmit={handleAddDesigner}>
    <div className="flex gap-2 items-center my-4">
      <img className='h[5rem] w-[5rem] rounded-full object-contain border-2 border-slate-400 shadow-md' ref={fileRef}  src={formData.avatar||Demo} alt="" />
      <input onChange={(e)=>setFile(e.target.files[0])} accept="image/*" ref={fileRef}  type="file" name="avatar" id="avatar" hidden/>
      <button className="px-3 py-2 rounded-sm border text-sm bg-white shadow-sm outline-neutral-200"  onClick={()=>fileRef.current.click()} type="button">Add Image</button>
      <p className="text-center text-sm">
        {fileErr?(<span className="text-red-700">Upload failed.</span>):filePer>0 && filePer<100 ?(<span>{`Uploading ${filePer}%`}</span>):filePer===100?(<span className="text-green-600">Upload successfully.</span>):''}
      </p>
      </div>  
      <div className="flex flex-col gap-3">
        <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="name" id="name" placeholder="Name" required />
        <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="email" name="email" id="email" placeholder="abc@exmple.com" required />
        <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="address" id="address" placeholder="Address" required />
        <span className="flex gap-4">
          <input onChange={handleChange} type="radio" name="male" id="gender"  value="male"  checked={formData.gender==='male'} />Male
          <input onChange={handleChange} type="radio" name="female" id="gender" value="female" checked={formData.gender==='female'}   />Female
        </span>
        <select className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" onChange={handleChange} name="status" id="status" required>
          <option value="">Select status</option>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
          <option value="available in 2 weeks">Available in 2 weeks</option>
        </select>

       <textarea onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" name="description" id="description" cols="30" rows="5" placeholder="Description"></textarea>
       <div className="flex flex-col gap-2">
          <label className="font-semibold"># Social Media Links</label>
          <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="fbLink" id="fbLink" placeholder="Facebook Link" />
          <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="twitterLink" id="twitterLink" placeholder="Twitter Link" />
          <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="instagramLink" id="instagramLink" placeholder="Instagram Link" />
          <input onChange={handleChange} className="px-3 py-2 rounded-sm border shadow-sm outline-neutral-200" type="text" name="youtubeLink" id="youtubeLink" placeholder="Youtube Link" />
        </div>
        <button className="px-3 py-2 rounded-sm border text-white font-semibold bg-green-500 shadow-sm outline-neutral-200" type="submit">{isPending ? "Loading":"Create"}</button>
        <button onClick={()=>navigate('/admin/all-designers')} className="px-3 py-2 rounded-sm text-white font-semibold bg-slate-500 border shadow-sm outline-neutral-200" type="button">Cancel</button>
      </div> 
    
    </form>
    {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}
    </div>
  )
}

export default AddDesigner
