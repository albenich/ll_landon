import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js'
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return ( 
        <div>
          <Header />
          <Main />
          <Footer />  
        </div>
    );
  }
}
export default App;
