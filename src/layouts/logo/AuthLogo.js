// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import  MainLogo from '../../assets/images/logos/sdologo.jpg';

const AuthLogo = () => {
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
    <img src={MainLogo} alt="Logo" />
    </Link>
  );
};

export default AuthLogo;
