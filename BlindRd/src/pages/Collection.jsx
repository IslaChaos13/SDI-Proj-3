import { useState, useEffect } from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import '../css/Collection.css'

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

export default function Collection() {
  const [collection, setCollection] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [status, setStatus] = useState('')

  const url = 'http://localhost:8085/'
  const product = `${url}product`

  useEffect(() => {
    fetch(product)
      .then(res => res.json())
      .then(json => setCollection(json))
  }, [])

  const openModal = (item) => {
    setSelectedProduct(item)
    setStatus('')
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const addToWishlist = async (item) => {
    const token = localStorage.getItem('token')

    if (!token) {
      setStatus('Please log in to add items to your wishlist.')
      return
    }

    try {
      setStatus('Adding...')

      const res = await fetch(`${url}api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: item.product_id }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add to wishlist')
      }

      setStatus('Added to wishlist!')
    } catch (err) {
      console.error(err)
      setStatus(err.message)
    }
  }

  return (
    <>
      <Navbar />

      <div className="c-product-grid">
        {collection.map(item => (
          <div className="c-product-card" key={item.product_id}>
            <div className="c-product-img" onClick={() => openModal(item)}>
              <img
                src={productImages[item.name]}
                alt={item.name}
              />

              <div className="c-product-overlay">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToWishlist(item)
                  }}
                >
                  Quick Add
                </button>
              </div>
            </div>

            <div className="c-product-info">
              <div>
                <div className="c-product-name">{item.name}</div>
                <div className="c-product-sub">{item.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img
              src={productImages[selectedProduct.name]}
              alt={selectedProduct.name}
              className="modal-img"
            />
            <h2>{selectedProduct.name}</h2>
            {selectedProduct.price && (
              <p className="modal-price">${Number(selectedProduct.price).toFixed(2)}</p>
            )}
            <p className="modal-description">{selectedProduct.description}</p>

            <button
              className="btn btn-primary"
              onClick={() => addToWishlist(selectedProduct)}
            >
              Add to Wishlist
            </button>

            {status && <p className="modal-status">{status}</p>}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}