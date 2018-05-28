
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
        this.handleTelefono = this.handleTelefono.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
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
        fetch("api/index.php/usuario/1", {
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
                    <img src='images/register.png' alt="Register" />
                    <p>Al registrase a nuestro sitio web usted obtendrá múltiples beneficios referente
                        a la casa que siempre ha querido, podrás analizar diferentes opciones de compra o alquiler
                        que se ofrecen y ser postulantes de las mismas directamente.

                        Los usuarios tendrán múltiple opciones de filtrado según sus necesidades o
                        su áreas de búsqueda, lo que le permite tener opciones mas específicas
                        acorde a su experiencia y estudios.
                    </p>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
                    <div className="register text-center">

                        <form className="register-form" onSubmit={this.handleInsertUsuario}>
                            <fieldset className="scheduler-border">
                                <legend className="scheduler-border">Registrar</legend>
                                
                                    <FormGroup className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <Input type="radio" className='' id="cliente" checked="checked" 
                                             name="cliente" value='1' onClick={this.handleTipoUsuario} />
                                            <Label htmlFor="cliente"><span>Cliente</span></Label>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">
                                            <Input type="radio" id="Interesado" name="cliente" value='2' onClick={this.handleTipoUsuario} />
                                            <Label htmlFor="Interesado"><span></span>Interesado</Label>
                                        </div>
                                    </FormGroup>
                               
                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="nombre"><span></span>Nombre completo</Label>
                                        <Input className="form-control" name='nombre'
                                            type="text" placeholder="Nombre completo" required onChange={this.handleNombre} />
                                    </div>
                                </FormGroup>

                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="correo"><span></span>Correo</Label>
                                        <Input className="form-control" name='correo' type="email" placeholder="Email" required
                                            onChange={this.handleEmail} />
                                    </div>
                                </FormGroup>

                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="telefono"><span></span>Teléfono</Label>
                                        <Input className="form-control" name='telefono' type="tel"
                                            placeholder="Teléfono de contacto" required onChange={this.handleTelefono} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="password1"><span></span>Contraseña</Label>
                                        <Input className="form-control" name='password1' type="password"
                                            placeholder="Password" required onChange={this.handlePass} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="password2"><span></span>Repita la Contraseña</Label>
                                        <Input className="form-control" name='password2' type="password"
                                            placeholder="Confirm Password" required onChange={this.handleValidarPass} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
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
                                </FormGroup>
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
                                <FormGroup className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Label htmlFor="nombre"><span></span>Dirección exacta</Label>
                                        <Input type="textarea" className="form-control" name='nombre'
                                            placeholder="Dirección" required onChange={this.handleDireccionExacta} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Button className="btn btn-primary" type="submit" name="finalize">Registrar</Button>
                                    </div>
                                </FormGroup>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}
