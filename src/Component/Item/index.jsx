import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios'

function index(props) {

  const {id} = useParams();
  const URL = `http://localhost:3000/posts`;
  const[data, setData] = useState([])
  const[name, setName] = useState('')
  const[price, setPrice] = useState('')
  const navigates = useNavigate();

  const params = {
    name: name,
    price: price
  }

  const check = {
    name: name.trim().length === 0,
    price: price.trim().length === 0
  }

  async function getData() {
    const req = await axios.get(`${URL}/${id}`)
    setData(req.data)
  }

  useEffect(() => {
    getData()
  }, [id])

  console.log(data);

   async function put() {
    if(check.name || check.price){
      alert('Topilmadi')
    } else {
      await axios.put(`${URL}/${id}`, params);
      window.location.reload();
    }
  }

  return (
    <div className='pt-4'>
      <div className="container bg-success text-white d-flex justify-content-around">
      <p>{data.name}</p>
      <p>{data.price}</p>

      <button className='btn btn-info' onClick={() => navigates(-1)}>Back</button>
      </div>

      <div className='mt-4 d-flex flex-column justify-content-center bg-info'>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} className='form-control w-50 mx-auto' type="text" placeholder='Book' />
      </div>

      <div>
        <input value={price} onChange={(e) => setPrice(e.target.value)}  className='form-control mt-3 w-50 mx-auto' type="text" placeholder='price' />
      </div>

      <button className='btn btn-success mt-3 w-50 mx-auto' onClick={() => put()}>Edit</button>
      </div>
    </div>
  );
}

export default index;