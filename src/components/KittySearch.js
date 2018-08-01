import React from 'react';

const KittySearch = ({searchKitty, searchRandomKitty, onChange, value}) => (
  <div className="browser-kittySearch">
    <div className="browser-kittySearch-inputContainer">
      <label> Kitty ID: </label>
      <input className="browser-kittySearch-inputContainer-input"
        type="number"
        id="kittyid"
        onChange={onChange}
        value={value}/>
    </div>
    <div className="browser-kittySearch-buttonContainer">
      <button
        className="browser-kittySearch-buttonContainer-button browser-kittySearch-buttonContainer-find"
        type="button"
        onClick={searchKitty}>
        Find Kitty
      </button>
      <button
        className="browser-kittySearch-buttonContainer-button browser-kittySearch-buttonContainer-random"
        type="button"
        onClick={searchRandomKitty}>
        Random Kitty
      </button>
    </div>
  </div>
);

export default KittySearch
