import { baseURL } from "./authApi"

export const addDesigner=async(data)=>{
    const res = await fetch(`${baseURL}/api/designers/create-designer`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    })
  return await res.json()
}

export const fetchDesigners=async()=>{
    const res = await fetch(`${baseURL}/api/designers`,{
        method:"GET",
    })
  return await res.json()
}

export const fetchDesignerById=async(id)=>{
    const res = await fetch(`${baseURL}/api/designer/${id}`,{
        method:"GET",
    })
  return await res.json()
}

export const updateDesigner=async(data)=>{
    const res = await fetch(`${baseURL}/api/designers/update-designer/:id`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    })
  return await res.json()
}

export const deleteDesigner=async(id)=>{
    const res = await fetch(`${baseURL}/api/designers/delete-designer/${id}`,{
        method:"DELETE",      
    })
  return await res.json()
}