import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { 
  QUERY_PRODUCTS,
  QUERY_USER } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';


function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  const { user } = useQuery(QUERY_USER);


  const { products, cart } = state;


  useEffect(() => {
  async function getProduct() {
    try {
    // already in global store
    if (products.length) {
    setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data)  {
      await dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      await idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }

} catch(err) {
  console.log(err); 
}

} getProduct()
}, [products, data, loading, dispatch, id])
 

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  }

  return (
    <>
      <div className="detail-container">
        {currentProduct && cart ? (
          <div>
          <div className="detail-back">
            <Link to="/" >← Products</Link>
            </div>
            <br></br>
                <div className="detail-box">
                  <br></br>
                <div className="detail-card">
                    <p>
                      {currentProduct.name}
                    </p>
                      <p>
                        $ {currentProduct.price}{' '}
                      </p>
                    </div>
                    <br></br>

  
                    <div className="detail-card-content">
<div className="detail-card-image">
  {console.log(currentProduct.images)}
  {<img alt={currentProduct.images}
                     src={`/images/${currentProduct.images}`}
        />}
    </div>
    <div className="detail-description-box">
    {user ? ( <div className="inner-detail-box">
     <div className="detail-card-pt2">
                    <p>
                   {currentProduct.name}
                 </p>
                   <p>
                     $ {currentProduct.price}{' '}
                   </p>
                   </div>
                   <br></br>
                  <div className="detail-card-info">
                    <p>{user.firstName}</p>
                      <p>{currentProduct.description}</p>
                      </div>
                      </div>
                  ) : (
                    <div className="inner-detail-box">
                    <div className="detail-card-pt2">
                    <p>
                   {currentProduct.name}
                 </p>
                   <p>
                     $ {currentProduct.price}{' '}
                   </p>
                   </div>
                   <br></br>
                    <div className="detail-card-info">
                      <p>{currentProduct.description}</p>
                      </div>
                      </div>
                  )}        
 </div>
 </div>
                    <br></br>
                  <div className="detail-buttons-box">
                  <button className="detail-button" onClick={addToCart}>
                    Add to Cart
                  </button>
                  <br></br>
                  <button className="detail-button"
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                  >
                    Remove from Cart
                  </button>
                  <br></br>
                  </div>
                    </div>
                    <br></br><br></br>
            <div className="comment-storage">
            <CommentList comments={currentProduct.comments} 
            />
          </div>

          <div>
            <CommentForm productId={currentProduct._id} />
            </div>
          </div>


          ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
      </div>
    </>
  );
}

export default Detail;
