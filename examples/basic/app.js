import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Carousel  from '../../src/main';

// const App = React.createClass({
class App extends Component {

  getRandomColor () {
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
        <div className="demo">
          <Carousel data={this.getCarouselData()}></Carousel>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('example'));
