import { baseURL } from "./authApi"

export const createProduct=async(product)=>{
    const res = await fetch(`${baseURL}/api/admin/create-product`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(product)
    })

    return await res.json()
}

export const fetchProducts = async(page) =>{
    const res = await fetch(`${baseURL}/api/products?page=${page}&limit=20`,{
        method:"GET"
    })
    const data = await res.json()
    return data;
}
export const fetchOutOfStockProducts = async() =>{
    const res = await fetch(`${baseURL}/api/out-of-stocks`,{
        method:"GET"
    })
    const data = await res.json()
    return data.outOfStockProducts;
}
export const fetchNewProducts = async() =>{
    const res = await fetch(`${baseURL}/api/products/new-arrivals`,{
        method:"GET"
    })
    const data = await res.json()
    return data.newArrivals;
}
export const fetchProductById = async(id) =>{
    const res = await fetch(`${baseURL}/api/product/${id}`,{
        method:"GET"
    })
    const data = await res.json()
    return data.productInfo;
}
export const fetchProductBySlug = async(slug) =>{
    const res = await fetch(`${baseURL}/api/view/product/${slug}`,{
        method:"GET"
    })
    const data = await res.json()
    return data.product;
}

export const deleteProduct = async(id) =>{
    const res = await fetch(`${baseURL}/api/admin/delete-product/${id}`,{
        method:"DELETE"
    })
    const data = await res.json()
    return data;
}
export const updateProduct = async(data) =>{
    const{title,brand,regularPrice,discountPercentage,rating,imageUrls,description,stock,category,id}=data
    const res = await fetch(`${baseURL}/api/admin/update-product/${id}`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({title,brand,regularPrice,discountPercentage,rating,imageUrls,description,stock,category})
    })
    return await res.json()
   
}

