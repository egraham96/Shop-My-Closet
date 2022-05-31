/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalSignUp from '../components/ModalLogin';

function Signup(props) {
  const [openModal,setOpenModal]= useState(false)


  const renderBack = () => {
    if (!openModal) {
      return <div id="login-back"><Link to="/Home">← Go Back</Link></div>
    } else {
      return;
    }
  }

  return (
    <div className="login-container">
       {renderBack()}
      <div className="login-box">
      <button className="openModalBtn" onClick={()=>{setOpenModal(true)}}>Sign Up</button>
        <br></br><br></br>
        {openModal && <ModalSignUp closeModal ={setOpenModal} />}
        </div>
      <br></br>
    </div>
  );
}

export default Signup;
