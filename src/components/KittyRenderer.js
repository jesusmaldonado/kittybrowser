import React from 'react';

const KittyRenderer =  ({ kitty } = {}) => (
  <div className="browser-kittyrenderer">
    <img className="browser-kittyrenderer-image" src={kitty.imageURL} alt="loading"/>
    <div className="browser-kittyrenderer-info">
      <h5> Genes </h5>
      <p> {kitty.genes}</p>
      <h5> Generation </h5>
      <p> {kitty.generation} </p>
      <h5> Birth Time </h5>
      <p> {kitty.birthTime} </p>
    </div>
  </div>
);

export default KittyRenderer
