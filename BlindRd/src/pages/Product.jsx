import "../css/Product.css";
import Aaron from "../img/Aaron.png";
import Jess from "../img/Jess.png";
import RJ from "../img/RJ.png";


export default function Product() {
  return (
    <div className="product-grid">

      <div className="product-card">
        <div className="product-img">
          <img src={Jess} alt="Jess" />
          <div className="product-overlay">
            <a href="#" className="btn btn-primary">Quick Add</a>
          </div>
        </div>
        <div className="product-info"></div>
      </div>

      <div className="product-card">
        <div className="product-img">
          <img src={Aaron} alt="Aaron" />
          <div className="product-overlay">
            <a href="#" className="btn btn-primary">Quick Add</a>
          </div>
        </div>
        <div className="product-info"></div>
      </div>

      <div className="product-card">
        <div className="product-img">
          <img src={RJ} alt="RJ" />
          <div className="product-overlay">
            <a href="#" className="btn btn-primary">Quick Add</a>
          </div>
        </div>
        <div className="product-info"></div>
      </div>

    </div>
  );
}