import React, { useState } from 'react';
import ModalLogin from '../components/ModalLogin';
import { Link } from 'react-router-dom';

function Login(props) {
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
        <button className="openModalBtn" onClick={()=>{setOpenModal(true)}}>Login</button>
        <br></br><br></br>
        {openModal && <ModalLogin closeModal ={setOpenModal} />}
      </div>
      <br></br>
    </div>
  );
}

export default Login;