import axios from 'axios';
import React, { useRef, useState } from 'react'

const ProductInsert = () => {
  const [form,setForm]=useState({
    pname:'',
    price:0,
    file:null,
    fileName:''
  });
  const refImage=useRef();
  const [image,setImage]=useState('/img1.png')
  const {pname,price,file,fileName}=form;

  const onChangeForm=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const onChangeFile=(e)=>{
    setForm({
      ...form,
      file:e.target.files[0],
      fileName:e.target.value
    })
    const reader=new FileReader();
        reader.onload=(e)=>{
            setImage(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0])
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
    if(!window.confirm('새로운 상품을 등록하시겠습니까?'))  return;
    const formData=new FormData();
    formData.append('file',file);
    formData.append('pname',pname);
    formData.append('price',price);
    const config={
      Headers:{'content-type':'multipart/form-data'}
    };
    await axios.post('/product/insert',formData,config)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input  onChange={onChangeForm} value={pname} name='pname'/>
        <hr/>
        <input onChange={onChangeForm} value={price} name='price' type='number'/>
        <hr/>
        <input ref={refImage} onChange={onChangeFile} name='file' type='file' style={{display:'none'}}/>
        <img onClick={()=>refImage.current.click()}  src={image} alt="빈이미지"/>
        <button>등록</button>
        <button type="reset">취소</button>
      </form>
    </div>
  )
}

export default ProductInsert
