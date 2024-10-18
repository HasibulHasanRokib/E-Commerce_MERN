import { baseURL } from "./authApi"

export const addProject=async(project)=>{
    const res = await fetch(`${baseURL}/api/admin/add-project`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(project)
    })

    return res.json()
}

export const allProjects = async() =>{
    const res = await fetch(`${baseURL}/api/all-projects`,{
        method:"GET"
    })
    const data = await res.json()
    const reversedProjects = data.projects.reverse();
    return reversedProjects;
}

export const getProjectsByLimit = async() =>{
    const res = await fetch(`${baseURL}/api/all-projects?limit=3`,{
        method:"GET"
    })
    const data = await res.json()
    return data.projects;
}

export const getProject=async(id)=>{
const res = await fetch(`${baseURL}/api/project/${id}`,{
    method:"GET"
}) 
const data = await res.json()
return data.project;
}

export const getProjectBySlug=async(slug)=>{
const res = await fetch(`${baseURL}/api/view/project/${slug}`,{
    method:"GET"
}) 
return await res.json()
}

export const updateProject=async(updateData)=>{
    const{id,title,location,type,architect,photography,imageUrls,description}=updateData;
    const res = await fetch(`${baseURL}/api/admin/update-project/${id}`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({title,location,type,architect,photography,imageUrls,description})
    })
    return await res.json()
}

export const deleteProject=async(id)=>{
const res = await fetch(`${baseURL}/api/admin/delete-project/${id}`,{
    method:"DELETE"
}) 
return await res.json()
}