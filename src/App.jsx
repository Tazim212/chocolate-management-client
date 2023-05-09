/* eslint-disable no-unused-vars */
import { Link, useLoaderData } from 'react-router-dom';
import { FaRegEdit, FaTimes } from "react-icons/fa";
import './App.css'
import { useState } from 'react';
import Swal from 'sweetalert2';


function App() {

  const chocolates = useLoaderData()
  // eslint-disable-next-line no-unused-vars

  const [del, setDel] = useState(chocolates)
  const {_id, name, country, category} = del;
 
  const handleDelete = _id => {
    // console.log(_id)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) =>{
    if (result.isConfirmed) {

      fetch(`http://localhost:5000/data/${_id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(data => {

          if (data.deletedCount > 0) {

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            const remaining = del.filter(item => item._id !== _id)
            setDel(remaining)
          }
        })
    }
      })
    }

  return (
    <div className='flex flex-col'>
      <div className='mb-4'>
      <Link to="/newadd" className='float-left'><button className='text-base text-white bg-slate-700 px-4 py-3 rounded-lg'>+ New collection</button></Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>_Id</th>
              <th>Name</th>
              <th>Country</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {del.map((chocos) => (
              <tr key={chocos._id}>
                <td>{chocos._id}</td>
                <td>{chocos.name}</td>
                <td>{chocos.country}</td>
                <td>{chocos.category}</td>
                <td className='flex'>
                  <Link to={`update/${chocos._id}`}><button><FaRegEdit></FaRegEdit></button></Link> <button onClick={() => handleDelete(chocos._id)} className='ps-3'><FaTimes></FaTimes></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
