// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import Visita from "../Global/icons/visita.png";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_url: this.props.company_url,
      company_name: this.props.company_name,
      company_logo: this.props.company_logo
    }
  }
  render() {
    return (
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">{this.state.company_name}</h5>
          <p className="card-text">
            <img className="card-img-top img-fluid rounded" src={this.state.company_logo} alt="Card image cap" />

          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">

            <a className='btn btn-primary' target="_blank" href={this.state.company_url}> Visit us
              <img className="rounded" src={Visita} alt="Card image cap" />
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
      apple_url: null,
      microsft_url: null,
      microsft_logo: null
    }
  }
  render() {
    return (
      <div className="card-group p-3">

        <Card
          company_name={'Microsft'}
          company_logo={'http://github-jobs.s3.amazonaws.com/b5365b6a-260c-11e8-9128-3e3ad804da5f.jpg'}
          company_url={'https://www.microsoft.com'}
        />
        <Card
          company_name={'Apple'}
          company_logo={'http://github-jobs.s3.amazonaws.com/26029982-44ba-11e8-8daf-6b1d47e5d047.jpeg'}
          company_url={'https://www.apple.com/'}
        />
        <Card
          company_name={'Bolt Labs'}
          company_logo={'http://github-jobs.s3.amazonaws.com/4e7deaba-4023-11e8-94aa-cb3faf9b4e3d.PNG'}
          company_url={'https://www.bolttoken.org/'}
        />
      </div>
    )
  }
}

export default CardGroup;
