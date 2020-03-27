import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../../styles/App/ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <div>
        <img
          src='https://media0.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif'
          className='error-gif'
        />
      </div>
      <div>
        <Link to='/'>Back To Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
