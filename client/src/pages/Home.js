import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import i from '../images/side.webp'

const Home = () => {
  const {user} = useAuthContext()
  return (
    <div className="home">
      <div className='Hm'>
        <h2>Buy Delicious,Fresh, Gourmet</h2>
        <h2>Foods</h2>
        <p>Upto 40% Discount Offer Over All Latest Product</p>
        <button>Shop Now</button>
      </div>
      <img className="circle-img" src={i} alt="avatar_img" />
    </div>
    // <div class="container">
    // <img src='back.jpg'></img>
    // <div class="centered">Centered</div>
  
  )
}

export default Home