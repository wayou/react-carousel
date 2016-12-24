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
        <h1>react carousel</h1>
        <div className="demo">
          <Carousel data={this.getCarouselData()}></Carousel>
        </div>
      </div>
    );
  }
}

export default App;