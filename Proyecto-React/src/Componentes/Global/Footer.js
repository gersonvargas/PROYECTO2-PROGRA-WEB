import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import imgFooter from "./images/footer.jpg";

class Footer extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };
  render() {
    const { title, items } = this.props;
    return (
      <div className="color_footer">
        <div className="row  margenes-footer">
          <div className="col-sm-12 col-md-4 ">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Search Job</h5>
            <p>Search Job is the leading employment website in Latin America. It is the most visited job
              exchange in Colombia, Peru, Argentina, Uruguay, Guatemala, Ecuador and El Salvador, and the
              second in Honduras, Venezuela, Nicaragua, Cuba and Costa Rica. It is also present in Mexico,
                    Chile, Panama, the Dominican Republic, Bolivia, Paraguay and Puerto Rico.</p>
          </div>
          <hr className="clearfix w-100 d-md-none" />

          <div className="offset-md-1 col-sm-12 col-md-3 col-lg-3">

            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Menu</h5>
            <ul className="list-unstyled ">
              <li>
                <a href={items[0].url}>{items[0].title}</a>
              </li>
              <li>
                <a href={items[1].url}>{items[1].title}</a>
              </li>
              <li>
                <a href={items[2].url}>{items[2].title}</a>
              </li>
              <li>
                <a href={items[3].url}>{items[3].title}</a>
              </li>
              <li>
                <a href={items[4].url}>{items[4].title}</a>
              </li>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-sm-12 col-md-4 col-lg-4">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Your best option</h5>
            <img src={imgFooter} className="img-thumbnail" ></img>
          </div>
        </div>
        <hr className="clearfix w-100 d-md-none" />
            <div className="row">
              <div className="offset-md-4 offset-sm-4 offset-lg-4 col-sm-1 col-md-1 col-lg-1">
                <a className="btn btn-block btn-social  btn-twitter ">
                  <span className="fa fa-twitter"> </span>
                </a>
              </div>
              <div className="col-sm-1 col-md-1 col-lg-1">
                <a className="btn btn-block btn-social  btn-facebook ">
                  <span className="fa fa-facebook"> </span>
                </a>
              </div>
              <div className="col-sm-1 col-md-1 col-lg-1">
                <a className="btn btn-block btn-social  btn-github ">
                  <span className="fa fa-github"> </span>
                </a>
              </div>
              <div className="col-sm-1 col-md-1 col-lg-1">
                <a className="btn btn-block btn-social  btn-linkedin ">
                  <span className="fa fa-linkedin"> </span>
                </a>
              </div>
            </div>
          
        

        <div className="footer-copyright py-3 text-center">
          © 2018 Copyright
          </div>
      </div>
    );
  }
}

export default Footer;