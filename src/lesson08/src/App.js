import React, { Component } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import logo from './logo.svg';
import style from './App.css';


const BASE_URL = 'http://127.0.0.1';

const menu = [
    { id: 1, name: 'Home', link: BASE_URL + ''},
    { id: 2, name: 'News', link: BASE_URL + '/news'},
    { id: 3, name: 'Contact', link: BASE_URL + '/contact'},
];

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <Header logo={logo} menu={menu}/>
          <Content>
              <div>Lorem ipsum</div>
          </Content>
        <Footer />
      </div>
    );
  }
}

export default App;
