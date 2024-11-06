import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pagination from './pagination';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='fullPage'>
    <Pagination/>
  </div>
);