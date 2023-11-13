import React from 'react';
import {  Route, Routes } from 'react-router-dom';

const Testing = () => {
  return (
    <Routes>
        <Route path="/testing&&token=:token" element={<h1>Verification</h1>}></Route>
    </Routes>
  );
};

export default Testing;
