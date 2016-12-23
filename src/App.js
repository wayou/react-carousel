import React, { Component } from 'react';
import logo from './logo.svg';
import Carousel from './Carousel';
import './App.css';

class App extends Component {

  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getCarouselData() {
    let data = [];
    for (var i = 0; i < 5; i++) {
      data.push({
        imgUrl: 'http://placehold.it/375x125/' + this.getRandomColor() + '/000000?text=' + (i + 1),
        url: '',
        title: Math.random().toString(36)
      })
    }
    return data;
  }

  render() {
    return (
      <div className="App">
        {
          // <div className="App-header">
          //   <img src={logo} className="App-logo" alt="logo" />
          // </div>
        }
        <div className="demo">
          <Carousel autoPlay={true} data={this.getCarouselData()}></Carousel>
        </div>
      </div>
    );
  }
}

export default App;