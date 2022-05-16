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
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

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
      <div className="detailcontainer">
        {currentProduct && cart ? (
          <div>
          <div className="back">
            <Link to="/" >← Products</Link>
            </div>
            <br></br>

                <div className="cardtitleprice">
                    <p>
                      {currentProduct.name}
                    </p>
                      <p>
                        $ {currentProduct.price}{' '}
                      </p>
                    </div>

<div className="cardimagecontent">
                  <div className="cardimage">
                    <figure className="detailimage">
                      <img
                        alt={currentProduct.name}
                        src={`/images/${currentProduct.images[0]}`}
                      />
                    </figure>
                  </div>
 
                  {user ? (
                  <div className="cardcontent">
                    <p>{user.firstName}</p>
                      <p>{currentProduct.description}</p>
                      </div>
                  ) : (
                    <div className="cardcontent">
                      <p>{currentProduct.description}</p>
                      </div>
                  )}
                  </div>

                  <div>
                  <button className="cardbutton" onClick={addToCart}>
                    Add to Cart
                  </button>
                  <button className="cardbutton"
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                  >
                    Remove from Cart
                  </button>
                  </div>

            <div>
            <CommentForm productId={currentProduct._id} />
            </div>

              <div>
                comments:
              </div>

            <div>
            <CommentList comments={currentProduct.comments} />
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
