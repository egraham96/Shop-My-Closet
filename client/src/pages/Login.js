import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

function Login(props) {
  const [openModal,setOpenModal]= useState(false)

  const renderBack = () => {
    if (!openModal) {
      return <div id="login-back"><Link to="/signup">← Go to Signup</Link></div>
    } else {
      return;
    }
  }


  return (
    <div className="login-container">
       {renderBack()}
      <div className="login-box">
        <h1>Hey, click on button to open the modal</h1>
        <button className="openModalBtn" onClick={()=>{setOpenModal(true)}}>Open</button>
        <br></br><br></br>
        {openModal && <Modal closeModal ={setOpenModal} />}
      </div>
      <br></br>
    </div>
  );
}

export default Login;