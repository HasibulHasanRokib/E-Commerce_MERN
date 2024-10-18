import { baseURL } from "./authApi"

export const addService=async(formData)=>{
    const res = await fetch (`${baseURL}/api/service/add-services`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formData)
    })
    const data = await res.json()
    return data;
}

export const allService=async()=>{
    const res = await fetch (`${baseURL}/api/service/all-services`,{
        method:"GET",
    })
    const data = await res.json()
    console.log(data)
    return data.services;
}

export const userService=async(id)=>{
    const res = await fetch (`${baseURL}/api/service/user/services/${id}`,{
        method:"GET",
    })
    const data = await res.json()
    return data.services;
}
export const deleteService=async(id)=>{
    const res = await fetch (`${baseURL}/api/service/delete-services/${id}`,{
        method:"DELETE",
    })
    const data = await res.json()
    console.log(data)
    return data;
}