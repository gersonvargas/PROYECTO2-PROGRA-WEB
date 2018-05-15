// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import Facebook from "../Global/icons/facebook.png";
import Github from "../Global/icons/github.png";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: this.props.usuario,
      about_me: this.props.about_me,
      red_social: this.props.red_social,
      trabajo_git: this.props.trabajo_git
    }
  }
  render() {
    return (
      <div className="card pl-3 pr-3">
        <img className="card-img-top img-fluid rounded" src={this.state.usuario.avatar_url} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{this.state.usuario.name ? this.state.usuario.name : this.state.usuario.login}</h5>
          <p className="card-text">{this.state.usuario.bio ? this.state.usuario.bio : this.state.about_me}</p>
          <p className="card-text">
            <small className="text-muted">

            </small>
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <i>{this.state.usuario.created_at}</i>
            <hr />
            <p>Follow me: </p>
            <a href={this.state.red_social}>
              <img className="rounded" src={Facebook} alt="Card image cap" />
            </a>
            <a href={this.state.trabajo_git}>
              <img className="rounded" src={Github} alt="Card image cap" />
            </a>
          </small>
        </div>
      </div>
    );
  }
}
class CardGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gerson: null,
      frander: null,
      marco: null,
      nacho: null,
      anuard: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    var self = this;
    //axios.get('https://api.github.com/users/gersonvargas')
    //marcoc22
    //NAchoAvalos
    //frander170896
    axios.get('https://api.github.com/users/marcoc22')
      .then(function (response) {

        self.setState({ marco: response.data })
      }).catch(function (res) {

      });
    axios.get('https://api.github.com/users/NAchoAvalos')
      .then(function (response) {

        self.setState({ nacho: response.data })
      }).catch(function (res) {

      });
    axios.get('https://api.github.com/users/gersonvargas')
      .then(function (response) {

        self.setState({ gerson: response.data })
      }).catch(function (res) {

      });
    axios.get('https://api.github.com/users/frander170896')
      .then(function (response) {

        self.setState({ frander: response.data })
      }).catch(function (res) {

      });
    axios.get('https://api.github.com/users/AnuardLuna')
      .then(function (response) {

        self.setState({ anuard: response.data })
      }).catch(function (res) {

      });
  }

  render() {
    return (
      <div className="card-group">

        {this.state.marco ? <Card usuario={this.state.marco}
          red_social={'https://www.facebook.com'}
          trabajo_git={'https://github.com/marcoc22'}
          about_me={'I am working as developer and I am studying at UNA, Costa Rica.'} /> : ''}

        {this.state.gerson ? <Card usuario={this.state.gerson}
          red_social={'https://www.facebook.com'}
          trabajo_git={'https://github.com/gersonvargas'}
          about_me={'I am working as an Oracle DBA at GBSYS company. Also, I am studying at UNA, Costa Rica.'} /> : ''}

        {this.state.frander ? <Card usuario={this.state.frander}
          red_social={'https://www.facebook.com'}
          trabajo_git={'https://github.com/frander170896'}
          about_me={'I am working as a developer, graduated from UNA. Currently I am studying at UNA, Costa Rica.'} /> : ''}

        {this.state.nacho ? <Card usuario={this.state.nacho}
          red_social={'https://www.facebook.com'}
          trabajo_git={'https://github.com/NachoAvalos'}
          about_me={'Currently I am studying at UNA, Costa Rica.'} /> : ''}

        {this.state.anuard ? <Card usuario={this.state.anuard}
          red_social={'https://www.facebook.com'}
          trabajo_git={'https://github.com/AnuarLuna'}
          about_me={'I am working and studying at UNA.'} /> : ''}
      </div>
    );
  }
}

export default CardGroup;
