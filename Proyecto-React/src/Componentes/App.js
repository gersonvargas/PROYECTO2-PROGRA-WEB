// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';

// Data
import items from './Global/Menu';
import './Global/css/Global/content.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="container">
        <Header
          title="Codejobs"
          items={items}
        />
        <Content body={children} />
        <Footer
          title="Codejobs"
          items={items}
        />
      </div>
    );
  }
}

export default App;
