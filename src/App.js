import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginScreen />
    </div>
  );
}

function LoginScreen() {
  return (
    <div>
      <h1>Log In</h1>
      <form>
        UserName: <textarea />
        Password: <textarea />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default App;
