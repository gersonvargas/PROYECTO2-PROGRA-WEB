import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './css/Global/footer.css';
import './css/Global/header.css';
import banner from "./images/banner-jobs3.jpg";
import user from "./icons/usuario.png";

import logoHeader from "./icons/reunion.png";
import Home from "./icons/home.png";
import Login from "../Login";
import Carrusel from './Carrousel';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
        this.handleShowLogin = this.handleShowLogin.bind(this);
    }
    handleShowLogin() {
        this.setState({ showLogin: true });
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    };

    render() {
        const { title, items } = this.props;
        return (
            <div>
                <div className="color_header navbar-fixed-top " >
                    <nav className="navbar navbar-expand-sm navbar-light  font-weight-bold margenes-header">
                        <a className="navbar-brand" href={items[0].url}>
                            <img src={logoHeader} width="30" height="30" alt="Logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto negro">
                                {items && items.map((item, key) => {
                                    if (key === 0)
                                        return <li className='nav-item' key={key}><Link className='btn active' to={item.url}>{item.title}</Link></li>

                                    return <li className='nav-item' key={key}><Link className='btn' to={item.url}>{item.title}</Link></li>
                                }
                                )}
                                <li className="nav-item" >{this.state.showLogin ? <Login /> : ''}</li>
                            </ul>

                        </div>
                        
                    </nav>
                </div>
                <div className="row mt-0">

                    <Carrusel />
                </div>

            </div>

        );
    }
}

export default Header;
