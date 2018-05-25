// Dependencies
import React, { Component } from 'react';
import CardGroup from './CardGroup';


class Home extends Component {
    componentWillMount() {
        document.title = 'Home'
    }
  render() {
    return (
      <div className="Home">
        <h1>Te damos la bienvenida a nuestro sitio!</h1>
        <hr/>
        <h2><small><i>Propiedades que podrían interesarte:</i></small></h2>
        <CardGroup/>
      </div>
    );
  }
}

export default Home;
