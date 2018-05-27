import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
//import {container} from 'react-bootstrap';

import Header from './Componentes/Header';
import Footer from './Componentes/Footer';

class Index extends Component {

  render() {
    return (
      <div className="container text-center text-md-left">
        <Header />
        <Footer />
      </div>
    );
  }

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();