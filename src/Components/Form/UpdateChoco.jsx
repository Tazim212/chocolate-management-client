/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateChoco = () => {

    const [service, setService] = useState({})

    const {id} = useParams();
    useEffect(()=>{

        fetch(`http://localhost:5000/data/${id}`)
        .then(res =>res.json())
        .then(data =>setService(data))
    }, [])
    const handleUpdate = event =>{
        event.preventDefault()

        const form = event.target;
        const name = form.name.value;
        const country = form.country.value;
        const category = form.category.value;

        const updated = {name, country, category}
        console.log(updated);

        fetch(`http://localhost:5000/update/${id}`,{
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updated)
        })
        .then(res=>res.json())
        .then(data=>{
            
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Your Data has been updated successfully',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                  setService(data)
            }
        })

    }
    return (
        <div>
            <form onSubmit={handleUpdate} className='ml-96 w-1/2'>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='name' defaultValue={service?.name} placeholder="Chocolate name" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Country</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='country' defaultValue={service?.country} placeholder="Country" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select name='category' defaultValue={service?.category} className="select select-primary w-full">
                        <option disabled value='selected'>Category</option>
                        <option>Dark Chocolate</option>
                        <option>Milk Chocolate</option>
                        <option>Mango Chocolate</option>
                        <option>Guava Chocolate</option>
                        <option>Litchi Chocolate</option>
                        <option>Blackberry Chocolate</option>
                    </select>
                </div>
                <button className="btn btn-block">Save</button>
            </form>
        </div>
    );
};

export default UpdateChoco;