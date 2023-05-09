/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
const AddChocolate = () => {

    const [saved, setSaved] = useState({})
    const handleSave = event =>{
        event.preventDefault()

        const form = event.target;
        const name = form.name.value;
        const country = form.country.value;
        const category = form.category.value;
        const chocolateData = {name, country, category}
        // console.log(chocolateData);

        fetch('http://localhost:5000/newadd',{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(chocolateData)
        })
        .then(res=>res.json())
        .then(data =>{
            setSaved(data)
            form.reset()
        })
    }
    return (
        <div className='flex flex-col'>

            <Link to='/'><button className='flex float-left ms-52 bg-slate-400 py-3 px-4 gap-2 rounded-lg'><span className='pt-1.5'><FaArrowLeft></FaArrowLeft></span>All Categories</button></Link>
            <form onSubmit={handleSave} className='ms-52 mt-4 mr-0 w-4/6 px-8 py-6 bg-slate-500'>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='name' placeholder="Chocolate name" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Country</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='country' placeholder="Country" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                <select name='category' className="select select-primary w-full">
                    <option disabled value='selected'>Category</option>
                    <option>Dark Chocolate</option>
                    <option>Milk Chocolate</option>
                    <option>Mango Chocolate</option>
                    <option>Guava Chocolate</option>
                    <option>Litchi Chocolate</option>
                    <option>Blackberry Chocolate</option>
                </select>
                </div>
                <button className="btn btn-block bg-orange-950">Save</button>
            </form>
        </div>
    );
};

export default AddChocolate;