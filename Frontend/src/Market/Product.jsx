import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const canEditQty = isAuthenticated && (user.role === 'cashier' || user.role === 'admin');

  // Convert original local URL to proxy URL
  function getImageUrl(originalUrl) {
    if (!originalUrl) return '';
    const filename = originalUrl.split('/').pop();
    return `https://meezantraders.onrender.com/proxy-image/${filename}`;
  }

  return (
    <div className="product">
      <img className="product-image" src={getImageUrl(product.images[0].image)} alt="product" />

      <div className="product-details">
        <p className="product-name">
          {product.name}
          {isAuthenticated && canEditQty && <> ({product.stock})</>}
        </p>

        <div className="price-div">
          <p className="price">Rs.{product.price}</p>
          <p className="discount">Rs.{product.price}</p>
        </div>

        <Link to={`/product/${product._id}`}>
          <p className="add">View product</p>
        </Link>
      </div>
    </div>
  );
}
