import React from 'react'

const Navbar = ({setModalShow, setVal}) => {

  const handleShowModal = ()=>{
    //setVal(null)
    setModalShow(true)
    setVal(null)
  }
  return (
    <div className='container-fluid mx-0 px-5 bg-light shadow py-3'>
        <div className='d-flex justify-content-between'>
            <h4 className='fw-light'>Shop List</h4>
            <button className='btn btn-dark shadow btn-sm' onClick={handleShowModal}>Add New Shop</button>
        </div>
    </div>
  )
}

export default Navbar