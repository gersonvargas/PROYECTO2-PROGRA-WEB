// Dependencies
import React, { Component } from 'react';
import about_us from "../Global/images/About.jpg";
import '../Global/css/About/about.css';

import CardGroup from './CardGroup';
class About extends Component {
    componentWillMount() {
        document.title = 'About'
    }
    render() {
        return (
                <div className="About">
                    <div className='row'>
                
                        <div className='col-md-6 mt-3 mb-3'>
                            <img src={about_us} className="img-fluid" alt="about us" id="" />
                        </div>
                
                        <div className='col-md-6 mt-3'>
                            <h1>Nuestro sitio:</h1>
                            <p><small>Look it, find it...</small></p>
                            <p>Fundado el 20 de mayo de 2018, nuestro sitio brinda 
                                el servicio de bienes raíces, una fuente confiable, en donde puede encontrar
                                su casa, apartamento sonñado.</p>
                            <p>Trabajamos para brindar un excelente servicio e información altamente confiable.</p>
                            <h3>Nuestros desarrolladores:</h3>
                            <CardGroup/>
                        </div>
                
                       
                    </div>
                </div>
                );
    }
}

export default About;
