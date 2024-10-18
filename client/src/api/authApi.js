export const baseURL = 'http://localhost:3000';

const token = localStorage.getItem('jsonwebtoken')

export const signUp = async(user)=>{
  const res= await fetch(`${baseURL}/auth/user/signup`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(user)
    })

    return await res.json();
}
export const login = async(user)=>{
  const res= await fetch(`${baseURL}/auth/user/login`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(user),
        credentials:"include"
    })
    const data= await res.json();
    return data;
}
export const userProfile = async()=>{
  const res= await fetch(`${baseURL}/auth/user/profile`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`
        },
    })
const data= await res.json();
return data.user;
}
export const userProfileUpdate = async(formData)=>{
  
  const{id,name,gender,avatar,address,phone}=formData
  const res= await fetch(`${baseURL}/auth/user/profile-update/${id}`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({name,gender,address,avatar,phone})
    })
const data= await res.json();
return data;
}

export const fetchUsers = async()=>{
  const res= await fetch(`${baseURL}/auth/user/users`,{
        method:"GET",
    })
const data= await res.json();
return data.users;
}

export const forgotPassword = async(email)=>{
 
  const res= await fetch(`${baseURL}/auth/user/forgot-password`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email})
    })
const data= await res.json();
return data;
}

export const resetPassword = async(formData)=>{
 const {newPassword,confirmPassword,token}=formData;
  const res= await fetch(`${baseURL}/auth/user/reset-password/${token}`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({newPassword,confirmPassword,})
    })
const data= await res.json();
console.log(data)
return data;
}

