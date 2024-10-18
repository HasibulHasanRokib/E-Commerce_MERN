import React, { useEffect, useState } from "react";
import {toast } from 'react-toastify';

export const ProductContext=React.createContext()

const ProductProvider=({children})=>{
const storedActive = localStorage.getItem('active') || 'home';
const [active, setActive] = useState(storedActive);
const [products, setProducts]=useState([])
const [searchFilter, setSearchFilter] = useState(products); 
const [priceRangeFilter, setPriceRangeFilter] = useState('any');
const [categoryFilter, setCategoryFilter] = useState('all');

useEffect(() => {
  localStorage.setItem('active', active);
}, [active]);

let filteredProducts=products;

  //....Search...
filteredProducts=filteredProducts?.filter((product)=>product.title.toLowerCase().includes(searchFilter))

  //...Price Range...
  if (priceRangeFilter !== 'any') {
    const [minPrice, maxPrice] = priceRangeFilter.split('-');
    filteredProducts = filteredProducts?.filter(
      (product) => product.regularPrice >= parseInt(minPrice) && product.regularPrice <= parseInt(maxPrice)
    );
  }

  //....Category Section....
  if (categoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter);
  }
  // add to cart section
  const [cartItems,setCartItems]=useState([]);

  const addToCart=(item)=>{
    const exist = cartItems.some((p)=>p.data._id ===item.data._id)
    if(exist){
      return  toast.warning('Product already added.');
    }else{
      setCartItems([...cartItems,item])
      toast.success('Product add to cart.')
      return;
    }
  }


    return <ProductContext.Provider value={{active,setActive,filteredProducts,setProducts,setSearchFilter,setPriceRangeFilter,setCartItems,setCategoryFilter,addToCart,cartItems}}>
        {children}
    </ProductContext.Provider>
}

export default ProductProvider;
