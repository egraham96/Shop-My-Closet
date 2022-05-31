import React, { useState } from 'react';
import './style.css';
import { useMutation} from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';


function ModalLogin ({closeModal}){
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
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
          <label htmlFor="email">  Email address:     </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">   Password:    </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
         <br></br>
        <div>
          <button className="login-button" type="submit">Submit</button>
        </div>
        <br></br>
      </form>
            <div className="footer">
                <button onClick={()=>closeModal(false)}>Cancel</button>
                <button>Continue</button>
            </div>
            </div>
    )
};

export default ModalLogin;
