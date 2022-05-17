import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import CategoryMenu from '../CategoryMenu';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(data)

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="product-list">
      <br></br>
      <div className="product-header">
      <h2>Our Products:</h2>
      <h3> Click on each listing for more information and to purchase. </h3>
      <p> You <b>must</b> be logged in to read or write comments or to purchase items. </p>
      <p>Thank you for shopping with us!</p>
      </div>
      <br></br>
      <CategoryMenu />
      <br></br>
      {state.products.length ? (
        <div className="product-div">
          {filterProducts().map((product) => (
            <ProductItem
            key={product._id}
            _id={product._id}
            name={product.name}
            description={product.description}
            image={[product.images[0]]}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
