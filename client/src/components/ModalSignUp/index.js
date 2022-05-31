import React, { useState } from 'react';
import './style.css';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';


function ModalSignUp ({closeModal}){
        const [formState, setFormState] = useState({ email: '', password: '' });
        const [addUser, {error}] = useMutation(ADD_USER);
      
        const handleFormSubmit = async (event) => {
          event.preventDefault();
          const mutationResponse = await addUser({
            variables: {
              email: formState.email,
              password: formState.password,
              firstName: formState.firstName,
              lastName: formState.lastName,
            },
          });
          const token = mutationResponse.data.addUser.token;
          Auth.login(token);
        };
      
        const handleChange = (event) => {
          const { name, value } = event.target;
          setFormState({
            ...formState,
            [name]: value,
          });
        };
      

    return ( 
        <div className="modalContainer">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <br></br>
        <figure aria-hidden="true">
    <div class="person-body"></div>
    <div class="neck skin"></div>
    <div class="head skin">
      <div class="eyes"></div>
      <div class="mouth"></div>
    </div>
    <div class="hair"></div>
    <div class="ears"></div>
    <div class="shirt-1"></div>
    <div class="shirt-2"></div>
  </figure>
        <div>
          <label htmlFor="firstName">First Name:  </label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:  </label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:  </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:  </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <button className= "login-button" type="submit">Submit</button>
        </div>
        <br></br>
      </form>
      <br></br><br></br>
      <br></br><br></br>
    </div>
  );
}

export default ModalSignUp;

