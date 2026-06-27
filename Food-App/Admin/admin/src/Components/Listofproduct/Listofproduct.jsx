import React, { useState } from 'react'
import { useEffect } from 'react'
import './Listofproduct.css'

const Listofproduct = () => {

 const [products,setProducts] = useState([])
  
 useEffect(()=>{
   fetchProduct();
 },[]);
  
 const fetchProduct = async ()=>{
    const response = await fetch ("http://localhost:4000/getproduct");
    const data = await response.json()
    setProducts(data)
  }
    
 const removeproduct = async (id) => {
  await fetch(`http://localhost:4000/removeproduct/${id}`, {
    method: "DELETE"
  });
  
  fetchProduct();
}

  return (
    <div  className='product-list'>
       <h1>All Product List </h1>
       <div className='product-list-format'>
       <p>Product</p>
       <p>Title</p>
       <p>Old Price</p>
       <p>New Price</p>
       <p>Category</p>
       <p>Remove</p>
      </div>
      <div className='listproduct-allproduct'>
        {products.map((item,i)=>(
          <div key={i} className='product-list-format listproduct-format'>
            <img src={item.images[0]} alt="" className='product-image' />
            <p>{item.name}</p>
            <p>{item.old_price}</p>
            <p>{item.new_price}</p>
            <p>{item.category}</p>
            <p onClick={()=>{removeproduct(item.id)}}>X</p>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Listofproduct
