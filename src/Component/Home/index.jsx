import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'


function index({data}) {

  const[name, setName] = useState('')
  const[price, setPrice] = useState('')

  const params = {
    name: name,
    price: price
  }

  const URL = `http://localhost:3000/posts`

  const check = {
    name: name.trim().length === 0,
    price: price.trim().length === 0
  }

  async function post(){
    if(check.name || check.price){
      alert('Topilmadi')
    } else {
      await axios.post(URL, params);
      window.location.reload()
    }
  }

  async function deleted(id) {
    await axios.delete(`${URL}/${id}`, {});
    window.location.reload()
  }

  return (
    <>
      <div className="container mt-4 d-flex flex-column justify-content-center bg-info">
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} className='form-control w-50 mx-auto' type="text" placeholder='Book' />
      </div>

      <div>
        <input value={price} onChange={(e) => setPrice(e.target.value)}  className='form-control mt-3 w-50 mx-auto' type="text" placeholder='price' />
      </div>

      <button className='btn btn-success mt-3' onClick={() => post()}>Add</button>

      {data.map(item => {
        return <div className='mx-auto d-flex mt-4' key={item.id}>
           <Link to={`/${item.id}`} className='me-5'>{item.name} </Link>
           <p>{item.price}$ </p>

           <button className='btn btn-danger ms-5' onClick={() => deleted(item.id)}>Delete</button>
        </div>
      })}
      </div>

    </>
  );
}

export default index;