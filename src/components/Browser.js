import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import KittyRenderer from './KittyRenderer';
import LoadingSpinner from './LoadingSpinner';
import KittySearch from './KittySearch';

class Browser extends Component {
  constructor(props){
    super(props);
    this.state = {
      kittyId: '',
      kitty: null,
      isLoading: false,
    };


    this.handleChange = this.handleChange.bind(this);
    this.searchKitty = this.searchKitty.bind(this);
    this.searchRandomKitty = this.searchRandomKitty.bind(this);
  }
  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store

    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }

  handleChange(event) {
    const { target: { value }} = event;
    const kittyId = Number(value);
    this.setState({
      kittyId
    });
  }

  searchRandomKitty() {
    this.setState({
      isLoading: true
    });
    this.findRandomKitty();
  }

  async findRandomKitty(){
    const ckContract = this.context.drizzle.contracts.CryptoKitties;
    const totalSupplyString = await ckContract.methods.totalSupply().call();
    const kittyRandom = Number(totalSupplyString);
    const randomKittyId = Math.floor((Math.random() * kittyRandom) + 1);
    this.findKitty(randomKittyId);
  }

  async findKitty(kittyId){
    try {
      const ckContract = this.context.drizzle.contracts.CryptoKitties;
      const contractPromise = ckContract.methods.getKitty(kittyId).call();
      const imageResponse = await fetch(`https://api.cryptokitties.co/kitties/${kittyId}`);
      const jsonRequest = imageResponse.json();
      const [contractResult, imageResult ] = await Promise.all([contractPromise, jsonRequest]);

      const { generation, genes, birthTime: birthTimeUnix } = contractResult;
      const { image_url: imageURL } = imageResult;
      const btDate = new Date(Number(birthTimeUnix) * 1000);
      this.setState({
        kitty: {
          generation,
          genes,
          birthTime: btDate.toDateString(),
          imageURL,
        },
        isLoading: false,
        error: null
      });
    } catch(err) {
      const message = err.message;
      this.setState({
        error: message,
        isLoading: false,
        kitty: null
      });
      console.error(err);
    }
  }

  searchKitty(){
    const { kittyId } = this.state;
    const kittyIdNum = Number(kittyId);
    if (Number.isInteger(kittyIdNum) && kittyIdNum > 0) {
      this.setState({
        isLoading: true
      });
      this.findKitty(kittyIdNum);
    } else {
      this.setState({
        error: `Enter an integer greater than 1`,
        kitty: null,
        isLoading: false
      });
    }
  }
  render() {
    const { kitty, isLoading, error } = this.state;

    return (
      <div className="browser">
        <div className="browser-title">
          <h1>
            Kitty Browser
          </h1>
        </div>
        <KittySearch
          searchKitty={this.searchKitty}
          searchRandomKitty={this.searchRandomKitty}
          onChange={this.handleChange}
          value={this.state.kittyId} />
        { (kitty && !isLoading) && (
          <KittyRenderer kitty={kitty} />
        )}
        {
          (isLoading) && (
            <LoadingSpinner loadingText={'Fetching Kitty...meow'}/>
        )}
        {
          (!isLoading && error) && (
            <div className="error">
              {error}
            </div>
          )
        }
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
