import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';

function Upload(props) {
  const [formState, setFormState] = useState({ name: '', description: '', price: '', images: '', quantity: '' });
  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const { data } = await addProduct({
      variables: {
        name: formState.name,
        description: formState.description,
        images: formState.images,
        price: formState.price,
        quantity: formState.quantity,
      },
    });
    setFormState('');
  } catch (err) {
      console.error(err);
  }
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


/*const [images, setImages] = useState([]);
const [imageURLs, setImageURLs] = useState([]);

useEffect(() => {
if (images.length < 1) return;
const newImageUrls = [];
images.forEach(image => newImageUrls.push(URL.createObjectURL( image) ));
setImageURLs(newImageUrls) ;
}, [images]);

function onImageChange(e) {
setImages([...e.target.files]);
}
*/

return(<div className="upload-container">
<div className="upload-back">
<Link to="/">← Go Back</Link>
</div>
<br></br>
<div>
<h2>Upload New Product</h2>
</div>
<br></br>
<form className="upload-form" onSubmit={handleFormSubmit}>
  <br></br>
  <div>
    <label htmlFor="name">Product Name:  </label>
    <input
      placeholder="Product Name"
      name="name"
      type="name"
      id="name"
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="description">Product Description:  </label>
    <input
      placeholder="Product Description
      
      
      "
      name="description"
      type="description"
      id="description"
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="price">Price:  </label>
    <input
      placeholder="Product Price"
      name="price"
      type="price"
      id="price"
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="quantity">Product Quantity:  </label>
    <input
      placeholder="Product Quantity"
      name="quantity"
      type="quantity"
      id="quantity"
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="images">Images:  </label>
    <input
      placeholder="Product Images"
      name="images"
      type="file" multiple accept="image/*"
      id="images"
      onChange={handleChange}
    />
  </div>
  <br></br>
  <div>
    <button className= "upload-button" type="submit">Submit</button>
  </div>
  <br></br>
</form>
<br></br><br></br>
<br></br><br></br>
</div>
);
}

export default Upload;