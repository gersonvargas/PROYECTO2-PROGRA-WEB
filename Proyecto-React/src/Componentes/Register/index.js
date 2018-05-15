// Dependencies
import React, { Component } from 'react';
import register_img from "../Global/images/registro.jpg";
import '../Global/css/Register/register.css';
//import '../Global/css/Global/content.css';

class Register extends Component {
    componentWillMount() {
        document.title = 'Register'
    }
    render() {
        return (

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                {/*<img src={register_img} alt="Register"/>*/}
                <h1> Registro</h1>
                <img src={register_img} alt="Register"/>
                <p>Al regístrate en Job-Search-Delta usted obtendrá múltiples beneficios referente a la bolsa de trabajo que se maneja, podrás analizar diferentes ofertas de trabajo que se ofrecen y ser postulantes de las mismas directamente.
Actualmente se encuentra puestos de trabajo en la mayoría de las áreas lo cual ayudaría a obtener mayores posibilidades de empleo.
Además, puede obtener información directamente del sitio de la pagina la que quieras postular.
Los usuarios tendrán múltiple opciones de filtrado según sus necesidades o su áreas especifica de trabajo lo que le permite tener opciones mas especificas acorde a su experiencia y estudios.
</p>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="register text-center">

                        <form className="register-form" action="" method="">
                            <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Register</legend>

                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <input className="form-control" type="text" placeholder="Full Name" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                        <input type="radio" id="male" name="gender"/>
                                        <label htmlFor="male"><span></span>Male</label>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">
                                        <input type="radio" id="female" name="gender"/>
                                        <label htmlFor="female"><span></span>Female</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <input className="form-control" type="email" placeholder="Email" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <input className="form-control" type="password" placeholder="Password" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <input className="form-control" type="password" placeholder="Confirm Password" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <input className="form-control" type="text" placeholder="Job" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <select className="form-control" id="province" name="province" required>
                                            <option value="">Select a province</option>
                                            <option value="1">San José</option>
                                            <option value="2">Alajuela</option>
                                            <option value="3">Heredia</option>
                                            <option value="4">Cartago</option>
                                            <option value="5">Guanacaste</option>
                                            <option value="6">Puntarenas</option>
                                            <option value="7">Limón</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" name="file" required/>
                                            <label className="custom-file-label" htmlFor="customFile">Attach CV</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <button className="btn btn-primary" type="button" name="finalize">Finalize</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Register;
