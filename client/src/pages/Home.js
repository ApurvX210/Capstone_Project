import { useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import i from '../images/store3.png'
// import i from '../images/back.jpg'

const Home = () => {
  const { user } = useAuthContext()
  return (
    <div className="home">
      <div className='Hm'>
        <h2>Buy delicious and fresh food</h2>

        <p>Upto 40% Discount Offer Over All Latest Product</p>
        <button class="btn">Shop Now</button>
      </div>
      <img className="circle-img" src={i} alt="avatar_img" />
    </div>
   
  )
}

export default Home