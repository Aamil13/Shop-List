import React, { useState, useEffect } from 'react'
import AddEdit from '../components/AddEdit'
import Navbar from '../components/Navbar'
import ShopTable from '../components/ShopTable'
import { dataarea, datacategory} from '../components/AddEdit'
import {useSelector} from 'react-redux'
import './home.css'


const Home = () => {

    let currDate = new Date().toISOString().split("T")[0]
    let currentDate = new Date().getTime()

    const [modalShow, setModalShow] = useState(false)
    //for editing value
    const [val, setVal] = useState(null)
    const [filter, setFilter] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState([])
    const shopdata = useSelector((state)=> state.Shop)
    //for filter
    const [areaFilter, setAreaFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [status, setstatus] = useState('')


    const handleFilter = () =>{
        let prevData = shopdata;
        
        if(areaFilter && categoryFilter){
            let filtered = prevData.filter((x)=>{
                return(
                    x.area === areaFilter &&
                    x.category === categoryFilter
                )
            }) 
            setData(filtered)
            setFilter(true)
        }else if(!areaFilter && !categoryFilter){
            setData(prevData)
            setFilter(false)
        }
        else{
            let filtered = prevData.filter((x)=>{
                return(
                    x.area === areaFilter ||
                    x.category === categoryFilter
                )
            })
            setData(filtered)
            setFilter(true)
        }
    }

    useEffect(()=>{
        handleFilter()
    },[areaFilter,categoryFilter])

    const statusFilter = ()=>{
        if(data.length){
            let prevData = data
               
            if(status === 'Open'){
               
            let filtered = prevData.filter((x)=> new Date(x.openingdate).getTime() <= currentDate && new Date(x.closingdate).getTime() >= currentDate)
            setData(filtered)
            setFilter(true)
            }else if(status === 'Close'){
                
                let filtered = prevData.filter((x)=> {
                    return(
                        new Date(x.openingdate).getTime() > currentDate ||
                        new Date(x.closingdate).getTime() < currentDate
                    )
                })
                setData(filtered)
                setFilter(true)
            }else if(status === ''){
            setData([...prevData])
            setFilter(false)
            }

        }else{
            let prevData = shopdata
            
            if(status === 'Open'){
                
            let filtered = prevData.filter((x)=> new Date(x.openingdate).getTime() <= currentDate && new Date(x.closingdate).getTime() >= currentDate)
            setData(filtered)
            setFilter(true)
            }else if(status === 'Close'){
                
                let filtered = prevData.filter((x)=> {
                    {
                        return(
                            new Date(x.openingdate).getTime() > currentDate ||
                            new Date(x.closingdate).getTime() < currentDate
                        )
                    }
                })
                setData(filtered)
                setFilter(true)
            }else if(status === ''){
            setData(prevData)
            setFilter(false)
            }
        }
    }

    useEffect(()=>{
        statusFilter()

        return setData(shopdata)
    },[status])
  
  const hanldeSearch = (val)=>{
    let searchFor = val.toLowerCase()
    let prevData = data.length ? data : shopdata;// prev only shopdata
   let filtered = prevData.filter((x)=> x.name.toLowerCase().includes(searchFor));
    setData(filtered)
  }

  useEffect(()=>{
    if(searchTerm){
      hanldeSearch(searchTerm)
    }
   
  },[searchTerm])

  return (
    <>
    <Navbar setModalShow={setModalShow} setVal={setVal}/>
    <AddEdit modalShow={modalShow} setModalShow={setModalShow} val={val}/>
    <div className='m-4'>
        <div className='d-flex justify-content-between filter-div flex-wrap'>
        <h6 className='fw-light'> </h6>

        <div className='d-flex align-items-center justify-content-center sub-filter-div flex-wrap'>
            <div className='d-flex mx-4'>
        <input className='form-control' type='search' placeholder='search by shop name' value={searchTerm} onChange={e=> setSearchTerm(e.target.value)}/>
        </div>
        {/* area filter */}
        <div className='d-flex '>
            <div>
        <p className='fw-light mx-2 pt-2'>Filter By Area</p>
        </div>
        <div>
            <select className='form-control'  onChange={e=>setAreaFilter(e.target.value)}>
                <option value=''>All</option>
                {dataarea.map((item,idx)=>(
                    <option key={idx}>{item}</option>
                ))}
            </select>
            </div>
            </div>
        {/* category filter */}
        <div className='d-flex'>
        <div>
            <p className='fw-light mx-2 pt-2'>Filter By Category</p>
        </div>
        <div>
            <select className='form-control' onChange={e=>setCategoryFilter(e.target.value)}>
                <option value=''>All</option>
                {datacategory.map((item,idx)=>(
                    <option key={idx}>{item}</option>
                ))}
            </select>
            </div>
        </div>
        {/* date filter */}
        <div className='d-flex '>
        <div>
            <p className='fw-light mx-2 pt-2'>Filter By Opening</p>
        </div>
        <div>
            <select className='form-control' onChange={e=>setstatus(e.target.value)}>
                <option value=''>All</option>
                <option>Open</option>
                <option>Close</option>
            </select>
            </div>
        </div>
        </div>
        </div>
        
    <ShopTable data={data} searchTerm={searchTerm} modalShow={modalShow} setModalShow={setModalShow} setVal={setVal} filter={filter} />
    </div>
    </>
  )
}

export default Home