import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";
import {useState} from 'react'

const API=process.env.REACT_APP_API


function Media(){

const [name, setname]= useState('')

const handleSubmit = async (e:any)=>{
    e.preventDefault()
    const res = await fetch(`${API}/media`,{
        method: 'POST',
        //headers:{
        // 'Content-Type': 'application/json'
        //}
        // body: JSON.stringify ({
            
        // })
    })
    const data = await res.json()
    console.log(data)
}

 return(
    <>
    <Header/>
    <div className="row">
        <div>
            <form onSubmit={handleSubmit} className="card card-body">
                <div className="form-group">
                    <input type="text" 
                    onChange={(e) => setname(e.target.value)}
                    value ={name}
                    className="form-control" 
                    placeholder="Name"
                    autoFocus/>
                </div>
                <button className="btn btn-primary btn-block">
                    create
                </button>
            </form>
        </div>
    </div>
    <Footer/>
    </>
 )
}

export default Media;