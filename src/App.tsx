import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginControl />
    </div>
  );
}

function LoginControl() {
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
