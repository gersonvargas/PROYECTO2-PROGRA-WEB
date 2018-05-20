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
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    {/*<img src={register_img} alt="Register"/>*/}
                    <h1> Registro</h1>
                    <img src={register_img} alt="Register" />
                    <p>Al regístrate en Job-Search-Delta usted obtendrá múltiples beneficios referente a la bolsa de trabajo que se maneja, podrás analizar diferentes ofertas de trabajo que se ofrecen y ser postulantes de las mismas directamente.
    Actualmente se encuentra puestos de trabajo en la mayoría de las áreas lo cual ayudaría a obtener mayores posibilidades de empleo.
    Además, puede obtener información directamente del sitio de la pagina la que quieras postular.
    Los usuarios tendrán múltiple opciones de filtrado según sus necesidades o su áreas especifica de trabajo lo que le permite tener opciones mas especificas acorde a su experiencia y estudios.
</p>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
                    <div className="register text-center">

                        <form className="register-form" action="" method="">
                            <fieldset className="scheduler-border">
                                <legend className="scheduler-border">Registrar</legend>

                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="nombre"><span></span>Nombre completo</label>
                                        <input className="form-control" name='nombre' type="text" placeholder="Nombre completo" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                        <input type="radio" id="male" name="gender" />
                                        <label htmlFor="male"><span></span>Male</label>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">
                                        <input type="radio" id="female" name="gender" />
                                        <label htmlFor="female"><span></span>Female</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="correo"><span></span>Correo</label>
                                        <input className="form-control" name='correo' type="email" placeholder="Email" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="telefono"><span></span>Teléfono</label>
                                        <input className="form-control" name='telefono' type="tel" placeholder="Teléfono de contacto" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="password1"><span></span>Contraseña</label>
                                        <input className="form-control" name='password1' type="password" placeholder="Password" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="password2"><span></span>Repita la Contraseña</label>
                                        <input className="form-control" name='password2' type="password" placeholder="Confirm Password" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <select className="form-control" id="province" name="province" required>
                                            <option value="">Provincia</option>
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
                                        <label htmlFor="nombre"><span></span>Dirección exacta</label>
                                        <textarea className="form-control" name='nombre' placeholder="Dirección" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <button className="btn btn-primary" type="button" name="finalize">Registrar</button>
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
