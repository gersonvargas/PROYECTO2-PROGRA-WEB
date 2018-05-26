import React, { Component } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import get_Jobs from './Jobs';
import JobItem from './JobItem';
import Lupa from '../Global/icons/lupa.png';

import '../Global/css/Search_Job/search_job.css';


class LateralFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isfiltrado: false,
            buscar: false,
            jobs: null,
            datosFiltrados: null,
            listaLocations: null,
            listaEmpresas: null,
            location: 'All',
            company: 'All'
        }
        //this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.filtrarSeleccion = this.filtrarSeleccion.bind(this);
        this.filterList = this.filterList.bind(this);
        this.filterListLocation = this.filterListLocation.bind(this);
        this.filterListCompany = this.filterListCompany.bind(this);
        this.contains = this.contains.bind(this);
        this.eliminaDuplicadosUbicacion = this.eliminaDuplicadosUbicacion.bind(this);
        this.containsCompany = this.containsCompany.bind(this);
        this.eliminaDuplicadosCompanys = this.eliminaDuplicadosCompanys.bind(this);
        this.filtrarLocalizacion = this.filtrarLocalizacion.bind(this);
    }
    filtrarLocalizacion(array, location2) {
        var updatedList = array;
        updatedList = updatedList.filter(function (item) {
            return item.location.toLowerCase().search(
                location2.toLowerCase()) !== -1;
        });
        return updatedList;
    }
    filtrarDescripcion(array, description) {

        var resultado = [];
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].description.indexOf(description) != -1) {
                resultado.push(array[i]);
            }
        }
        return resultado;
    }
    filtrarEmpresa(array, empresa) {
        var updatedList = array;
        updatedList = updatedList.filter(function (item) {
            return item.company.toLowerCase().search(
                empresa.toLowerCase()) !== -1;
        });
        return updatedList;
    }
    filtrarTipo(array, tipo) {

        var full = 'Full Time';
        var updatedList = array;
        updatedList = updatedList.filter(function (item) {
            return item.type.toLowerCase().search(
                full.toLowerCase()) !== -1;
        });
        return updatedList;
    }

    filtrarSeleccion(array, empresa, ubicacion, tipo) {

        var resultado = null;
        if (empresa.length > 0 && empresa != 'All') {
            resultado = this.filtrarEmpresa(array, empresa);
        }
        if (resultado && tipo) {
            resultado = this.filtrarTipo(resultado, tipo ? "Full Time" : "both");
        }
        return resultado;
    }


    handlerSubmit(event) {
        event.preventDefault();
        var photo = document.getElementById("fileToUpload");
        // the file is the first element in the files property
        var file = photo.files[0];
        var formData = new FormData();
        formData.append("fileToUpload", file);
        console.log(file);
       /* var data = JSON.stringify({
            'form':formData,
            "method": "insertarPropiedad"
        }
        )*/
        fetch("http://localhost/proyecto2-progra-web/server/index.php/propiedad/1", {
            method: "post",
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then((response) => {

            return response.json();
        })
            .then((res) => {
                console.log('El server responde: ' + res)
            })
    }

    //**   Filtering Location* */
    contains = (a, obj) => {
        var i = a.length;
        while (i--) {
            if (a[i].location === obj) {
                return true;
            }
        }
        return false;
    }
    eliminaDuplicadosUbicacion = (array) => {

        var resultado = [];
        var i;
        for (i = 0; i < array.length; i++) {
            if (!this.contains(resultado, array[i].location)) {
                resultado.push(array[i]);
            }
        }
        return resultado;
    }
    //**   End Filtering Location* */
    //**   Filtering companys* */
    containsCompany = (a, obj) => {
        var i = a.length;
        while (i--) {
            if (a[i].company === obj) {
                return true;
            }
        }
        return false;
    }
    eliminaDuplicadosCompanys = (array) => {

        var resultado = [];
        var i;
        for (i = 0; i < array.length; i++) {
            if (!this.containsCompany(resultado, array[i].company)) {
                resultado.push(array[i]);
            }
        }
        return resultado;
    }
    //**   End Filtering companys* */

    cambiaEstado(data, referencia) {
        referencia.setState({
            jobs: data
        });
        const filteredlocation = referencia.eliminaDuplicadosUbicacion(data);
        referencia.setState({
            listaLocations: filteredlocation
        });

    }
    filterList(event) {
        var updatedList = this.state.jobs;
        updatedList = updatedList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            datosFiltrados: updatedList,
            isfiltrado: true
        });
    }



    filterListLocation(event) {
        this.setState({
            location: event.target.value
        });
        var updatedList = this.state.jobs;
        if (event.target.value != 'All') {
            updatedList = updatedList.filter(function (item) {
                return item.location.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            updatedList = this.eliminaDuplicadosCompanys(updatedList);
            this.setState({
                listaEmpresas: updatedList
            });

        } else {
            this.setState({
                listaEmpresas: null
            });
        }
    }
    filterListCompany(event) {
        this.setState({
            company: event.target.value
        });
    }
    componentDidMount() {
        const prueba = get_Jobs(this.cambiaEstado, this);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-ms-6 col-md-3 col-lg-12 text-center">
                        <h3>Available Jobs</h3>
                    </div>
                </div>
                <div className="row jobs">
                    <div className="col-ms-8 col-md-3 col-lg-4" >
                        <h4>Bienes raices</h4>
                        <form onSubmit={this.handlerSubmit}>
                            <input type="file" name="fileToUpload" id="fileToUpload" />
                            <button type="submit" className="btn btn-primary btn-sm active">
                                <img className='mr-3 ml-3' src={Lupa} />
                                Filter
                            </button>

                        </form>

                    </div>
                    <div className="col-ms-4 col-md-9 col-lg-8 mt-2" >
                        <div className="input-group-prepend m-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                <img src={Lupa} />
                            </span>
                            <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text"
                                placeholder="Search" onChange={this.filterList} />
                        </div>
                        <p>
                            <small> <i className='m-3 b-2'>Job's List:</i></small>
                        </p>
                        {!this.state.jobs && !this.state.isfiltrado ?
                            <div className="alert alert-primary" role="alert">
                                <i><strong>Loading...</strong></i>
                            </div>
                            : !this.state.isfiltrado && !this.state.datosFiltrados ?
                                this.state.jobs.map(elemento => <div key={elemento.id}>
                                    <JobItem jobtitle={elemento.title}
                                        job_type={elemento.type}
                                        job_description={elemento.description}
                                        created_at={elemento.created_at}
                                        how_to_apply={elemento.how_to_apply}
                                        company_logo={elemento.company_logo}
                                        company_url={elemento.company_url}
                                        company={elemento.company}
                                    />
                                </div>
                                )
                                :
                                this.state.datosFiltrados.map(elemento => <div key={elemento.id}>
                                    <JobItem jobtitle={elemento.title}
                                        job_type={elemento.type}
                                        location={elemento.location}
                                        job_description={elemento.description}
                                        created_at={elemento.created_at}
                                        how_to_apply={elemento.how_to_apply}
                                        company_logo={elemento.company_logo}
                                        company_url={elemento.company_url}
                                        company={elemento.company}
                                    />
                                </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default LateralFilter;