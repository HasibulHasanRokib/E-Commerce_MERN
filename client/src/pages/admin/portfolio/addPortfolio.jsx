import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../../../components/firebase"
import { FaTrash } from "react-icons/fa";
import {useMutation} from '@tanstack/react-query'
import { addProject } from "../../../api/projectApi";
import {toast } from 'react-toastify';


const AddPortfolio = () => {

const [ files,setFiles] = useState([])
const [imageUploadError, setImageUploadError] = useState(false);
const [upLoading, setUpLoading] = useState(false);

const [formData,setFormData]=useState({
  title:"",
  type:"",
  location:"",
  architect:"",
  photography:"",
  imageUrls:[],
  description:""
})

const handleImageUpload = () => {
  if (files.length > 0 && files.length + formData.imageUrls.length <= 7) {
    const promises = [];
    setUpLoading(true)
    for (let i = 0; i < files.length; i++) {
      promises.push(storage(files[i]));
    }
    Promise.all(promises).then((urls) => {
      setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
      setImageUploadError(false)
      setUpLoading(false)

    }).catch((err) => {
      setImageUploadError("Image upload failed ( 2 mb max per image)")
      console.log(err.message)
    })

  } else {
    setImageUploadError("You can upload only 7 images per listing.")
    setUpLoading(false)
  }
}

const storage = async (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
      },
      (error) => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL))
      }
    )
  })
}

const handleChange= (e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
}

const handleDelete=(index)=>{
  setFormData({ ...formData, imageUrls: formData.imageUrls.filter((url, i) => i !== index) })
}
const navigate = useNavigate(); 

const {mutate,isError,error,isPending,reset}=useMutation({
  mutationFn:addProject,
  onSuccess:(data)=>{
    console.log(data)
    if(data.success === false){
     return toast.warning(data.message)
    }else{
     toast.success(data.message)
     navigate('/admin/all-portfolio')
     return;
    }
    }
})

const handleSubmit = (e)=>{
  e.preventDefault()
  const{title,location,type,architect,photography,imageUrls,description}=formData;
  if(!title || !location || !photography || !imageUrls)return
  mutate({title,location,architect,photography,imageUrls,type,description})
}


  return (
    <div>
      <h2 className="font-bold text-2xl ">Add Portfolio</h2>
      <form className="grid grid-cols-2 gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-col max-w-lg my-3">
        <label >Title:</label>
        <input onChange={handleChange} className="px-3 py-2 mt-1 outline-lime-50 rounded-md" type="text" name="title" id="title" />
        
        <label className="mt-3">Location:</label>
        <input onChange={handleChange}  className="px-3 py-2 mt-1 outline-lime-50 rounded-md"  type="text" name="location" id="location" />

        <label className="mt-3">Type:</label>
        <input onChange={handleChange} className="px-3 py-2 mt-1 outline-lime-50 rounded-md"  type="text" name="type" id="type" />

        <label className="mt-3">Architect:</label>
        <input onChange={handleChange} className="px-3 py-2 mt-1 outline-lime-50 rounded-md"  type="text" name="architect" id="architect"  />

        <label className="mt-3">Photography:</label>
        <input onChange={handleChange}  className="px-3 py-2 mt-1 outline-lime-50 rounded-md"  type="text" name="photography" id="photography"  />
        
        <label className="mt-3">Description:</label>
        <textarea onChange={handleChange}  className="px-3 py-2 mt-1 outline-lime-50 rounded-md"  name="description" id="description" cols="10" rows="5"></textarea>
        </div>


         {/* images... */}
         <div className="">
         <h5 className="font-bold">Add Images</h5>
         <p className="text-xs text-red-500">*Maximum 7 images can upload.</p>
         <p className="text-xs text-red-500">*Maximum size each (2MB) .</p>
         <div className="flex items-center border-2 px-2 rounded my-3 shadow-sm">
         <input onChange={(e)=>setFiles(e.target.files)} className="  rounded-md w-full my-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-sky-100" type="file" id='images' name='images' accept="image/*" multiple />
         <button type="button" className="py-2 px-3 border-2 rounded-md border-green-500 text-green-500 font-semibold" onClick={handleImageUpload}>
          {upLoading ? "Uploading":"Upload"}
          </button>
         </div>
         {formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>{
          return <div key={index} className="flex my-2 justify-between items-center px-3 rounded-md border-2 shadow-sm ">
           <img className="h-20 w-20 object-contain " src={url} alt="" />
           <button type="button" className="text-red-500" onClick={()=>handleDelete(index)}>
            <FaTrash size={20}/>
            </button>
          </div>
         })}
    
        <h5 className="text-red-700 text-xs text-center my-5">{imageUploadError && imageUploadError}</h5>
        <div className="flex gap-1">
        <Link to={'/admin/all-portfolio'} className="bg-slate-300 text-center py-2 rounded font-bold border w-full" type="submit">Cancel</Link>
        <button className="bg-green-500 text-white py-2 rounded font-bold border w-full" type="submit">{isPending ? 'Loading...':"Create"}</button>
        </div>
        {isError && <p onClick={()=>reset()} className='text-center text-red-500 mt-3'>{error?.message}</p>}

        </div>
      </form>
 
    </div>
  )
}

export default AddPortfolio
