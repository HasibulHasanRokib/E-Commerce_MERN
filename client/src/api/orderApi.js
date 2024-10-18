import {baseURL} from './authApi'

export const addOrder=async(formData)=>{
    const res = await fetch(`${baseURL}/api/orders/add-order`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formData)
    })

    const data = await res.json()
    return data;
}

export const fetchOrders=async()=>{
    const res = await fetch(`${baseURL}/api/orders/get-orders`,{
        method:"GET",
    })
    const data = await res.json()
    return data.orders;
}
export const fetchPlacedOrders=async()=>{
    const res = await fetch(`${baseURL}/api/orders/placed-orders`,{
        method:"GET",
    })
    const data = await res.json()
    return data.orders;
}
export const fetchOrderById=async(id)=>{
    const res = await fetch(`${baseURL}/api/orders/get-order/${id}`,{
        method:"GET",
    })
    const data = await res.json()
    return data.order;
}
export const updateOrderById=async(formData)=>{
    const{id,status}=formData;
    const res = await fetch(`${baseURL}/api/orders/update-order/${id}`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({status})
    })
    const data = await res.json()
    return data;
}
export const fetchOrderByUserId=async(id)=>{
    const res = await fetch(`${baseURL}/api/orders/user/get-order/${id}`,{
        method:"GET",
    })
    const data = await res.json()
    return data.order;
}
export const deleteOrderByUserId=async(id)=>{
    const res = await fetch(`${baseURL}/api/orders/delete-order/${id}`,{
        method:"DELETE",
    })
    const data = await res.json()
    console.log(data)
    return data;
}