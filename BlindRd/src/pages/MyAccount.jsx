import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/MyAccount.css'

import Mr_Chow from '../img/Mr_Chow.png'
import Latte_Stone from '../img/Latte_Stone.png'
import chief_2 from '../img/chief_2.png'
import Hafa_1 from '../img/Hafa_1.png'
import Hafa_2 from '../img/Hafa_2.png'
import Boy_Rota from '../img/Boy_Rota.png'
import Koi from '../img/Koi.png'
import Saguan from '../img/Saguan.png'
import spanku from '../img/spanku.png'
import woven_pokeball from '../img/woven_pokeball.png'

const productImages = {
  'Mr. Chow': Mr_Chow,
  'Latte Stone': Latte_Stone,
  'Woven Poke Ball': woven_pokeball,
  'Saguan': Saguan,
  'SPANKU': spanku,
  'Puntan Patgon': Boy_Rota,
  'Koi': Koi,
  'Hafa Adai - Primary': Hafa_1,
  'Hafa Adai': Hafa_2
}

const url = 'http://localhost:8085/'

export default function MyAccount() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${url}api/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load wishlist');
        return res.json();
      })
      .then((data) => setWishlist(data))
      .catch((err) => {
        console.error(err);
        setError('Could not load wishlist.');
      })
      .finally(() => setLoading(false));
  }, []);

  const removeFromWishlist = async (product_id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${url}api/wishlist/${product_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to remove item');

      setWishlist((prev) => prev.filter((item) => item.product_id !== product_id));
    } catch (err) {
      console.error(err);
      setError('Could not remove item.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Welcome, {user?.first_name}!</h1>
        <button onClick={handleLogout}>Log Out</button>

        <h2>My Wishlist</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-card" key={item.product_id}>
                <img
                  src={productImages[item.name]}
                  alt={item.name}
                  className="wishlist-img"
                />
                <div className="wishlist-info">
                  <p className="wishlist-name">{item.name}</p>
                  {item.price && (
                    <p className="wishlist-price">${Number(item.price).toFixed(2)}</p>
                  )}
                  <button onClick={() => removeFromWishlist(item.product_id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}