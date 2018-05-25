// Dependencies
import React, { Component } from 'react';
import register_img from "../Global/images/registro.jpg";
import '../Global/css/Register/register.css';
//import '../Global/css/Global/content.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo_usuario: '-1',
            nombre: null,
            genero: null,
            email: null,
            telefono: null,
            password: null,
            provincia: null,
            direccion: null,
            propiedad: null

        }
        this.handleTipoUsuario = this.handleTipoUsuario.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleGenero = this.handleGenero.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleValidarPass = this.handleValidarPass.bind(this);
        this.handleProvincia = this.handleProvincia.bind(this);
        this.handleDireccionExacta = this.handleDireccionExacta.bind(this);
        this.handlePropiedad = this.handlePropiedad.bind(this);
        this.handleInsertUsuario = this.handleInsertUsuario.bind(this);
        this.handleTelefono=this.handleTelefono.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
    }
    componentWillMount() {
        document.title = 'Register'
    }
    handleInsertUsuario(event) {
        event.preventDefault();
       
        var data = JSON.stringify({
            method: 'put',// numero: "", fecha: "", area: 0, cliente: '', density: 0,
            metodo2: 'insertarUsuario',
            t_user: this.state.tipo_usuario,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            email: this.state.email,
            provincia: this.state.provincia,
            ubicacion: this.state.direccion,
            password: this.state.password,
            propiedad_requerida: this.state.propiedad
        })
        console.log(data);
        fetch("http://localhost/proyecto2-progra-web/server/index.php/usuario/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            //this.props.handleChangeData();
        }
        );
    }
    handleTipoUsuario(event) {
        var dato = event.target.value;
        this.setState(
            {
                tipo_usuario: dato
            }
        )
        if (this.state.tipo_usuario != '1') {
            this.setState(
                {
                    propiedad: null
                }
            )
        }
    }
    handleNombre(event) {
        var dato = event.target.value;
        this.setState(
            {
                nombre: dato
            }
        )
    }
    handleGenero(event) {
        var dato = event.target.value;
        this.setState(
            {
                genero: dato
            }
        )
    }
    handlePass(event) {
        var dato = event.target.value;
        this.setState(
            {
                password: dato
            }
        )
    }
    handleValidarPass(event) {
        var dato = event.target.value;
        this.setState(
            {
                genero: dato
            }
        )
    }
    handleProvincia(event) {
        var dato = event.target.value;
        this.setState(
            {
                provincia: dato
            }
        )
    }
    handleDireccionExacta(event) {
        var dato = event.target.value;
        this.setState(
            {
                direccion: dato
            }
        )
    }
    handlePropiedad(event) {
        var dato = event.target.value;
        this.setState(
            {
                propiedad: dato
            }
        )

    }
    handleEmail(event) {
        var dato = event.target.value;
        this.setState(
            {
                email: dato
            }
        )

    }
    handleTelefono(event) {
        var dato = event.target.value;
        this.setState(
            {
                telefono: dato
            }
        )

    }
    render() {
        return (

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    {/*<img src={register_img} alt="Register"/>*/}
                    <h1> Registro</h1>
                    <img src={register_img} alt="Register" />
                    <p>Al registrase a nuestro sitio web usted obtendrá múltiples beneficios referente
                        a la bolsa de trabajo que se maneja, podrás analizar diferentes opciones de compra o alquiler
                        que se ofrecen y ser postulantes de las mismas directamente.
    Actualmente se encuentra puestos de trabajo en la mayoría de las áreas lo cual ayudaría a
     obtener mayores posibilidades de empleo.
    Además, puede obtener información directamente del sitio de la pagina la que
    quieras postular.
    Los usuarios tendrán múltiple opciones de filtrado según sus necesidades o
    su áreas especifica de trabajo lo que le permite tener opciones mas especificas
    acorde a su experiencia y estudios.
</p>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
                    <div className="register text-center">

                        <form className="register-form" onSubmit={this.handleInsertUsuario}>
                            <fieldset className="scheduler-border">
                                <legend className="scheduler-border">Registrar</legend>

                                <div className="row">

                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                        <label htmlFor="male" className='mr-3'><span></span>Registrarse como: </label>
                                        <input type="radio" id="cliente" name="cliente" value='1' onClick={this.handleTipoUsuario} />
                                        <label htmlFor="cliente"><span></span>Cliente</label>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">
                                        <input type="radio" id="Interesado" name="cliente" value='2' onClick={this.handleTipoUsuario} />
                                        <label htmlFor="Interesado"><span></span>Interesado</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="nombre"><span></span>Nombre completo</label>
                                        <input className="form-control" name='nombre'
                                            type="text" placeholder="Nombre completo" required onChange={this.handleNombre} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="correo"><span></span>Correo</label>
                                        <input className="form-control" name='correo' type="email" placeholder="Email" required 
                                        onChange={this.handleEmail}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="telefono"><span></span>Teléfono</label>
                                        <input className="form-control" name='telefono' type="tel" 
                                        placeholder="Teléfono de contacto" required onChange={this.handleTelefono}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="password1"><span></span>Contraseña</label>
                                        <input className="form-control" name='password1' type="password"
                                            placeholder="Password" required onChange={this.handlePass} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="password2"><span></span>Repita la Contraseña</label>
                                        <input className="form-control" name='password2' type="password"
                                            placeholder="Confirm Password" required onChange={this.handleValidarPass} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <select className="form-control" id="province" name="province" required
                                            onChange={this.handleProvincia}>
                                            <option value="">Provincia</option>
                                            <option value="San Jose">San José</option>
                                            <option value="Alajuela">Alajuela</option>
                                            <option value="Heredia">Heredia</option>
                                            <option value="Cartago">Cartago</option>
                                            <option value="Guanacaste">Guanacaste</option>
                                            <option value="Puntarenas">Puntarenas</option>
                                            <option value="Limon">Limón</option>
                                        </select>
                                    </div>
                                </div>
                                {this.state.tipo_usuario == '1' ?
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <select className="form-control" id="province" name="province" required
                                                onChange={this.handlePropiedad}>
                                                <option value="">Propiedad Requerida</option>
                                                <option value="Vivienda">VIVIENDA</option>
                                                <option value="Apartamento">APARTAMENTO</option>
                                                <option value="Edificio Comercial">EDIFICIO COMERCIAL</option>
                                                <option value="Bodega">BODEGA</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </div> : ''
                                }
                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label htmlFor="nombre"><span></span>Dirección exacta</label>
                                        <textarea className="form-control" name='nombre'
                                            placeholder="Dirección" required onChange={this.handleDireccionExacta} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <button className="btn btn-primary" type="submit" name="finalize">Registrar</button>
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
