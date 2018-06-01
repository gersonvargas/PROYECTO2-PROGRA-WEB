var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var TextArea = Reactstrap.TextArea;

class Registrar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo_usuario: '-1',
            nombre: null,
            genero: null,
            email: null,
            telefono: null,
            password: null,
            password2: null,
            provincia: null,
            direccion: null,
            propiedad: null
        };
        this.handleTipoUsuario = this.handleTipoUsuario.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleGenero = this.handleGenero.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleValidarPass = this.handleValidarPass.bind(this);
        this.handleProvincia = this.handleProvincia.bind(this);
        this.handleDireccionExacta = this.handleDireccionExacta.bind(this);
        this.handlePropiedad = this.handlePropiedad.bind(this);
        this.handleInsertUsuario = this.handleInsertUsuario.bind(this);
        this.handleTelefono = this.handleTelefono.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentWillMount() {
        document.title = 'Registrarse'
    }

    handleInsertUsuario(event) {
       // alert('hola')
        event.preventDefault();
        //alert('entra this.state.tipo_usuario == "-1"');
        if (this.state.tipo_usuario == "-1") {
            
            document.getElementById('alerta').innerHTML =
                '<p class="alert alert-danger">Indique el tipo de usuario.<p>';
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; //
        } else if (this.state.password !== this.state.password2) {
            document.getElementById('alerta').innerHTML =
                '<p class="alert alert-danger">Las contraseñas no son iguales. Repitalas.<p>';
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; //
        } else {
            var data1 = JSON.stringify({
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
            });

            fetch("api/index.php/usuario/1", {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: data1
            }).then((response) => response.json())
                .then((data) => {
                    if (data.code == '200') {
                        document.getElementById('alerta').innerHTML =
                            '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; //
                       /* var usuario = {
                          EMAIL: this.state.email,
                          USERNAME: this.state.nombre,
                          TIPO_USUARIO: this.state.tipo_usuario,
                          PASSWORD: this.state.password,
                          PRUEBA:'pruebas'
                        };
                        localStorage.setItem("loggedUser", JSON.stringify(usuario));
                        */
                        localStorage.setItem("path", "login");
                        
                       location.reload();
                    } else {
                        document.getElementById('alerta').innerHTML =
                            '<p class="alert alert-danger">' + data.msg + '<p>';
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; //
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                password2: dato
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
            <div className="loginArea">
                <div className="card col-md-10">
                    <div className="card-header h2">
                        Registrarse
                        <img src='images/register.png' alt="Registro" className="registerImg"/>
                    </div>
                    <div className="infoRegister">
                        Al registrase a nuestro sitio web usted obtendrá múltiples beneficios referente
                        a la casa que siempre ha querido, podrás analizar diferentes opciones de compra o alquiler
                        que se ofrecen y ser postulantes de las mismas directamente.

                        Los usuarios tendrán múltiple opciones de filtrado según sus necesidades o
                        su áreas de búsqueda, lo que le permite tener opciones mas específicas
                        acorde a su experiencia y estudios.
                    </div>
                    <div className="card-body text-dark">
                        <div id='alerta' role="alert"></div>
                        <form className="register-form" onSubmit={this.handleInsertUsuario}>
                            <div className="form-group">
                                <Label htmlFor="cliente"><span></span>Tipo de usuario</Label>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Input type="radio" className='' id="cliente"
                                           name="cliente" value='1' onClick={this.handleTipoUsuario}/>
                                    <Label htmlFor="cliente"><span>Cliente</span></Label>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Input type="radio" id="Interesado" name="cliente" value='2'
                                           onClick={this.handleTipoUsuario}/>
                                    <Label htmlFor="Interesado"><span></span>Interesado</Label>
                                </div>
                            </div>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="nombre"><span></span>Nombre completo</Label>
                                    <Input className="form-control" name='nombre'
                                           type="text" placeholder="Nombre completo" required
                                           onChange={this.handleNombre}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="correo"><span></span>Correo</Label>
                                    <Input className="form-control" name='correo' type="email" placeholder="Email"
                                           required
                                           onChange={this.handleEmail}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="telefono"><span></span>Teléfono</Label>
                                    <Input className="form-control" name='telefono' type="tel"
                                           placeholder="Teléfono de contacto" required onChange={this.handleTelefono}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="password1"><span></span>Contraseña</Label>
                                    <Input className="form-control" name='password1' type="password"
                                           placeholder="Contraseña" required onChange={this.handlePass}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="password2"><span></span>Repita la Contraseña</Label>
                                    <Input className="form-control" name='password2' type="password"
                                           placeholder="Confirme la contraseña" required
                                           onChange={this.handleValidarPass}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="province"><span></span>Provincia</Label>
                                    <select className="form-control" id="province" name="province" required
                                            onChange={this.handleProvincia}>
                                        <option value="">Seleccione</option>
                                        <option value="San Jose">San José</option>
                                        <option value="Alajuela">Alajuela</option>
                                        <option value="Heredia">Heredia</option>
                                        <option value="Cartago">Cartago</option>
                                        <option value="Guanacaste">Guanacaste</option>
                                        <option value="Puntarenas">Puntarenas</option>
                                        <option value="Limon">Limón</option>
                                    </select>
                                </div>
                            </FormGroup>
                            {this.state.tipo_usuario == '1' ?
                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="province"><span></span>Tipo de Propiedad</Label>
                                        <select className="form-control" id="province" name="province" required
                                                onChange={this.handlePropiedad}>
                                            <option value="">Seleccione</option>
                                            <option value="Vivienda">Vivienda</option>
                                            <option value="Apartamento">Apartamento</option>
                                            <option value="Edificio Comercial">Edificio Comercial</option>
                                            <option value="Bodega">Bodega</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                </FormGroup> : ''
                            }
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="nombre"><span></span>Dirección exacta</Label>
                                    <Input type="textarea" className="form-control" name='nombre'
                                           placeholder="Dirección" required onChange={this.handleDireccionExacta}/>
                                </div>
                            </FormGroup>
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
