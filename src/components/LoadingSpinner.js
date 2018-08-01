import React from 'react';

const LoadingSpinner = ({ loadingText }) => (
  <div className="loading">
    <h1>{loadingText}</h1>
    <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
  </div>
);

export default LoadingSpinner
