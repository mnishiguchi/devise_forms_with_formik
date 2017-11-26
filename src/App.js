import React, { Component } from 'react';
import logo from './logo.svg';
import SignUpForm from './components/SignUpForm';
import Rails from 'rails-ujs';
import 'semantic-ui-css/semantic.css';
import './App.css';

// For playing with rails-ujs
window.Rails = Rails;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Devise forms with Formik</h1>
        </header>

        <main>
          <div className="auth_module">
            <h2>Sign up</h2>
            <SignUpForm />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
