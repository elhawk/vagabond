import React from 'react';
import './App.css';
import {Header} from './Header';
import {LoginControl} from './LoginControl';
import {TripManager} from './trip';
import {TripView} from './TripView';

interface IAppState {
  // login related state
  isLoggedIn: boolean;
  userName: string;
}

class App extends React.Component<{}, IAppState> {
  tripManager: TripManager;

  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
    }
    this.tripManager = new TripManager();
    this.onLoggedInChange = this.onLoggedInChange.bind(this);
  }

  onLoggedInChange(loggedIn: boolean, userName: string) {
    console.log("userName" + userName);
    this.setState({isLoggedIn: loggedIn, userName: userName});
  }

  render() {
    let tripView = this.state.isLoggedIn ? <TripView tripManager={this.tripManager} /> : null;

    return (
      <div className="App">
        <Header onLoggedInChange={this.onLoggedInChange} isLoggedIn={this.state.isLoggedIn} userName={this.state.userName}/>
        <LoginControl onLoggedInChange={this.onLoggedInChange} isLoggedIn={this.state.isLoggedIn}/>
        {tripView}
      </div>
    );

  }
}

export default App;
