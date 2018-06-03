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
            tipo_usuario: JSON.parse(localStorage.loggedUser).TIPO_USUARIO,
            nombre: JSON.parse(localStorage.loggedUser).USERNAME,
            password: JSON.parse(localStorage.loggedUser).PASSWORD,
            email: JSON.parse(localStorage.loggedUser).EMAIL
        };

        console.log(this.state);

        this.handleTipoUsuario = this.handleTipoUsuario.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleValidarPass = this.handleValidarPass.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
    }

    componentWillMount() {
        document.title = 'Perfil'
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
            var requestData = JSON.stringify({
                method: 'post',
                metodo2: 'actualizarUsuario',
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
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: requestData
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
                            USERNAME: this.state.nombre,
                            TIPO_USUARIO: this.state.tipo_usuario
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


    handleEmail(event) {
        var dato = event.target.value;
        this.setState(
            {
                email: dato
            }
        )

    }


    handleEliminar() {
        if (confirm('¿Seguro que desea eliminar su cuenta?, No hay marcha atras.')) {
            var data = JSON.stringify({
                method: 'delete',
                metodo2: 'eliminarUsuario',
                email: this.state.email,
                tipo_usuario: this.state.tipo_usuario
            })
            console.log(data);
            fetch("api/index.php/usuario/1", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: data
            }).then((response) => {
                    //  this.props.handleAll();
                    if (response.status == 200) {
                        document.getElementById('alerta').innerHTML =
                            '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
                        localStorage.setItem("loginUser", 'NULL');
                        localStorage.setItem("path", "home");
                        location.reload();
                    } else {
                        document.getElementById('alerta').innerHTML =
                            '<p class="alert alert-danger">' + response.statusText + '<p>';
                    }
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; //
                    // location.reload();
                }
            );
        }
    }
    render() {
        return (
            <div className="loginArea">
                <div className="card col-md-10">
                    <div className="card-header h2">
                        Administración de la cuenta
                        <img src='images/idea.png' alt="Registro" className="registerImg" />
                    </div>
                    <div className="infoRegister">
                        <p> Permite cambiar la contraseña, nombre de usuario o bien <strong>eliminar</strong> la cuenta.
                        </p>
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
                                        onChange={this.handleNombre} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="password1"><span></span>Contraseña</Label>
                                    <Input className="form-control" name='password1' type="password"
                                        placeholder="Contraseña" required
                                        value={this.state.password}
                                        onChange={this.handlePass} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <Label htmlFor="password2"><span></span>Repita la Contraseña</Label>
                                    <Input className="form-control" name='password2' type="password"
                                        placeholder="Confirme la contraseña" required
                                        onChange={this.handleValidarPass} />
                                </div>
                            </FormGroup>
                            <p> <small>Cuenta Actual: <strong>{this.state.email}</strong></small></p>
                            <Button color="primary" onClick={this.handleInsertUsuario.bind(this)} className="btn btn-primary">
                                Actualizar
                            </Button>
                            <Button color="danger" className="btn btn-danger ml-3"
                                onClick={this.handleEliminar.bind(this)}>
                                Eliminar Cuenta
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
        );
    }
}
