var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var TextArea = Reactstrap.TextArea;

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo_usuario: this.props.currentUser.TIPO_USUARIO,
            nombre: this.props.currentUser.USERNAME,
            password: this.props.currentUser.PASSWORD
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
        this.handleEliminar=this.handleEliminar.bind(this);
    }

    componentWillMount() {
        //console.log(this.props.currentUser)
        document.title = 'Registrarse'
    }

    handleInsertUsuario(event) {
        event.preventDefault();
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
            });

            fetch("api/index.php/usuario/1", {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: data
            }).then((response) => response.json())
                .then((data) => {
                    if (data.code == '200') {
                        document.getElementById('alerta').innerHTML =
                            '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; //

                        localStorage.setItem("loginUser", this.state.email);
                        var usuario = {
                          EMAIL: this.state.email,
                          USERNAME: this.state.nombre
                        };
                        localStorage.setItem("loggedUser", JSON.stringify(usuario));
                        localStorage.setItem("path", "home");
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

    handleEliminar(){
        var data = JSON.stringify({
            method: 'delete',
            metodo2: 'eliminarUsuario',
            numero_propiedad: this.state.numero_propiedad
        })
        // console.log(data);
        fetch("api/index.php/usuario/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            this.props.handleAll();
            if (response.status == 200) {
                document.getElementById('alerta').innerHTML =
                    '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
            } else {
                document.getElementById('alerta').innerHTML =
                    '<p class="alert alert-danger">' + response.statusText + '<p>';
            }
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; //
            location.reload();
        }
        );
    }
    render() {
        return (
            <div className="loginArea">
                <div className="card col-md-10">
                    <div className="card-header h2">
                        Administración de la cuenta
                        <img src='images/register.png' alt="Registro" className="registerImg"/>
                    </div>
                    <div className="infoRegister">
                       Permite cambiar la contraseña o bien <strong>eliminarla</strong>
                    </div>
                    <div className="card-body text-dark">
                        <div id='alerta' role="alert"></div>
                        <Form className="register-form" onSubmit={this.handleInsertUsuario}>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="nombre"><span></span>Nombre completo</Label>
                                    <Input className="form-control" name='nombre'
                                           type="text" placeholder="Nombre completo" required
                                           value={this.state.nombre}
                                           onChange={this.handleNombre}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="password1"><span></span>Contraseña</Label>
                                    <Input className="form-control" name='password1' type="password"
                                           placeholder="Contraseña" required 
                                           value={this.state.password}
                                           onChange={this.handlePass}/>
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
                            <button type="submit" className="btn btn-primary">
                                Actualizar
                            </button>
                            <button type="button" className="btn btn-danger ml-3"
                            onClick={this.handleEliminar}>
                               Eliminar Cuenta
                            </button>
                        </Form>

                    </div>
                </div>
            </div>
        );
    }
}
