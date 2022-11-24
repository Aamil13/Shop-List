import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';

import {useDispatch} from "react-redux"
import {add, edit} from "../redux/shopSlice"

export const dataarea = ['Thane', 'Pune', 'Mumbai', 'Suburban', 'Nashik', 'Nagpur', 'Ahmednagar', 'Solapur']
export const datacategory = ['Grocery', 'Butcher', 'Baker', 'Chemist', 'Stationery', 'shop']

const AddEdit = ({modalShow, setModalShow, val}) => {

 
  

 const dispatch = useDispatch()
 const shopdata = useSelector((state)=> state.Shop)
  const [preId, setPreId] = useState('')
  const [name , setName] = useState('')
  const [area, setArea] = useState('')
  const [category, setCategory] = useState('')
  const [openingdate, setOpeningDate] = useState('')
  const [closingdate, setClosingDate] = useState('')
  const [tolimit, setToLimit] = useState('')

  useEffect(()=>{
    if(openingdate){
      let newDate = new Date(openingdate)
      newDate.setDate(newDate.getDate()+1)
      setToLimit(new Date(newDate).toISOString().split("T")[0])
    }
  },[openingdate])

  const reset= ()=>{
    setPreId('')
  setName('')
  setArea('')
  setCategory('')
  setOpeningDate('')
  setClosingDate('')
  setModalShow(false) }

  useEffect(()=>{
    //modal edit
if(val !== null){
  setPreId(val?.id)
  setName(val?.name)
  setArea(val?.area)
  setCategory(val?.category)
  setOpeningDate(val?.openingdate)
  setClosingDate(val?.closingdate)
}else{
  reset()
}
  },[val])

  const letters = /^[A-Za-z]+$/;


  const handleAdd = (editCall)=>{
    if(!name || !area || !category || !openingdate || !closingdate){
      return alert("all fields are requided")
    }else if(!name.replaceAll(" ","").match(letters)){
      return alert('Only Alphabets are allowed in shop name')
    }
    else{
      
      let prev = shopdata.filter((x)=> x.name == name);
      
  if(prev.length){
    let confirm = window.confirm('Shop with this name already exists. Do you want to continue ?')
    if(confirm){
      if(editCall){
        let newObj = {id : preId ,name, area, category, openingdate, closingdate}
        dispatch(edit(newObj))
        reset()
      }else{
        let newObj = {id : Date.now() ,name, area, category, openingdate, closingdate}
      dispatch(add(newObj))
      reset()
      }
    
    }else{
      return
    }
  }else{
    if(editCall){
      let newObj = {id : preId ,name, area, category, openingdate, closingdate}
      dispatch(edit(newObj))
      reset()
    }else{
      let newObj = {id : Date.now() ,name, area, category, openingdate, closingdate}
    dispatch(add(newObj))
    reset()
    }
  }
    }
  }
  
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
        onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {val ? 'Update Shop' : 'Add New Shop'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mb-3'>
            <label>Shop Name :</label>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='form-control' placeholder='Enter shop name here'/>
        </div>
        <div className='mb-3 d-flex justify-content-between'>
        <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        {area ? area : 'Select Area'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dataarea.map((item,idx)=>(
            <Dropdown.Item onClick={()=> setArea(item)} key={idx}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        {category ? category : "Select Category"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {datacategory.map((item,idx)=>(
            <Dropdown.Item onClick={()=> setCategory(item)} key={idx}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
        </div>

        <div className='mb-3 d-flex justify-content-between'>
            <div className='w-75'>
                <label>Opening Date</label>
            <input type='date' value={openingdate} onChange={(e)=>setOpeningDate(e.target.value)} className='form-control' placeholder='Enter Opening Date'/>
            </div>
            <div className='w-75'>
                <label>Closing Date</label>
            <input type='date' disabled={!openingdate} min={`${tolimit}`} value={closingdate} onChange={(e)=>setClosingDate(e.target.value)} className='form-control' placeholder='Enter Closing Date'/>
            </div>
        </div>

        
        
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-secondary' onClick={()=>setModalShow(false)}>Cancel</Button>
        {val ?
        <Button className='btn-warning' onClick={()=>handleAdd(true)}>Update</Button>
        :
        <Button className='btn-success' onClick={()=>handleAdd(false)}>Add</Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default AddEdit