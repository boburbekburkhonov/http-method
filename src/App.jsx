import { useState, useEffect } from 'react'
import axios from 'axios';
import Home from './Component/Home'
import Item from './Component/Item'
import {Routes, Route} from 'react-router-dom'

function App() {

  const[data, setData] = useState([]);

  const URL = `http://localhost:3000/posts`

  async function getData() {
    const req = await axios.get(URL);

    setData(req.data)
  }


  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Routes>

        <Route path='/' element={<Home data={data} />} />
        <Route path='/:id' element={<Item />} />

      </Routes>
    </>
  )
}

export default App
