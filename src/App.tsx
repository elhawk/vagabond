import React from 'react';
import './App.css';
import {LoginControl} from './LoginControl';
import {TripManager} from './trip';
import {TripView} from './TripView';

interface IAppState {
  isLoggedIn: boolean;
}

class App extends React.Component<{}, IAppState> {
  tripManager: TripManager;

  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
    this.tripManager = new TripManager();
    this.loginStateChangedCallback = this.loginStateChangedCallback.bind(this);
  }

  loginStateChangedCallback(loggedIn: boolean) {
    console.log("loginStateChangedCallback: " + loggedIn);
    this.setState({isLoggedIn: loggedIn});
  }

  render() {
    // TODO make this not suck.  Would prefer not to repeat the block for logged in versus not.
    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <LoginControl loginStateChangedCallback={this.loginStateChangedCallback}/>
          <TripView tripManager={this.tripManager}/>
        </div>
      );
    }
    else
    {
      return (
        <div className="App">
          <LoginControl loginStateChangedCallback={this.loginStateChangedCallback}/>
        </div>
      );
    }
  }
}

export default App;
