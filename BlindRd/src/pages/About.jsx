import '../index.css'
import Blind_Rd_Sign from '../img/Blind_Rd_Sign.jpeg'


import Footer from '../components/Footer'

export default function About() {
  return (
    <>



    <div className="about">



      <div className="about-visual">
        <div className="about-stripe"></div>

        <img
          src={Blind_Rd_Sign}
          alt="Blind Rd. brand"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            position: 'absolute',
            inset: 0,
          }}
          />
      </div>


      <div className="about-text">
        <p className="section-label">Who We Are</p>


        <h2>
          Made on the wrong side of the map.
              </h2>

        <p>
          Blind Rd. started with a simple idea: make clothes that don't ask
          for attention, but earn it. Every piece is designed for the roads
          you take when you're not following directions.
        </p>

        <p>
          We keep our runs small, our materials honest, and our margins tight
          so quality never gets traded for volume.
        </p>
        <p>Contact Us: BlindRd671@gmail.com</p>

        <div className="about-stats">
          <div>
            <p className="stat-val">100%</p>
            <p className="stat-label">Small-Batch</p>
          </div>

          <div>
            <p className="stat-val">2–3x</p>
            <p className="stat-label">Yearly Drops</p>
          </div>

          <div>
            <p className="stat-val">0</p>
            <p className="stat-label">Middlemen</p>
          </div>


        </div>
      </div>
    </div>
          <Footer />
          </>
  )
}