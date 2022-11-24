import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {useSelector,useDispatch} from "react-redux"
import {remove} from "../redux/shopSlice"
import AddEdit from './AddEdit.js'
import "./table.css"


const ShopTable = ({data,searchTerm,setModalShow,setVal, filter}) => {

  

  const shopdata = useSelector((state)=> state.Shop)

  const dispatch = useDispatch()
  

  const handleRemove=(id)=>{
    let confirm = window.confirm("Are you sure you want to delete this?")
    if(!confirm){
      return
    }
    dispatch(remove(id))
  }

  const handleEdit = (id)=>{
    let filtered = shopdata.filter((x)=> x.id === id);
    setVal(filtered[0])
    setModalShow(true)
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'atea',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Opening',
      dataIndex: 'openingdate',
      key: 'openingdate',
    },
    {
      title: 'Closing',
      dataIndex: 'closingdate',
      key: 'closingdate',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <div className='d-flex'>
        <button className='btn btn-sm btn-outline-warning shadow' onClick={()=>handleEdit(id)}>Edit Shop</button>
        <button className='btn btn-sm btn-outline-danger shadow' onClick={()=>handleRemove(id)}>Delete Shop</button>
      </div>,
    },
  ];
  return (
    <>
    <div className='table'>
    <Table columns={columns} dataSource={searchTerm ? data : filter ? data : shopdata} />
    </div>
    </>
  )
}

export default ShopTable