import React, { Component, Children } from 'react';
import { drizzleConnect } from 'drizzle-react';
import LoadingSpinner from '../components/LoadingSpinner';

class Loading extends Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    if (window.web3 === undefined || this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(this.props.children);
    }

    return(
      // Display a loading indicator.
      <LoadingSpinner loadingText={'Loading dApp...'}/>
    );
  }
};

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
}

export default drizzleConnect(Loading, mapStateToProps);
