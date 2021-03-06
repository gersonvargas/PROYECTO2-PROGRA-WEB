var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class FormInteresadoPropiedad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cliente: null,
            numero_propiedad: null,
            nombre_propiedad: null,
            tam_propiedad: null,
            m_cuadrados: null,
            tipo_propiedad: null,
            tipo_disponibilidad: null,
            estado_construccion: null,
            descripcion: null,
            localidad: null,
            ciudad: null,
            provincia: null,
            mensaje: null,
            cantidad_banos: null,
            cantidad_cocheras: null,
            cantidad_habitaciones: null,
            cantidad_pisos: null,
            precio: 0,
            isEdit: false
        }
        this.handleActualizar = this.handleActualizar.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleNumero = this.handleNumero.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleTamPropiedad = this.handleTamPropiedad.bind(this);
        this.handleMetroCuadrados = this.handleMetroCuadrados.bind(this);
        this.handleTipoPropiedad = this.handleTipoPropiedad.bind(this);
        this.handleTipoDisponibilidad = this.handleTipoDisponibilidad.bind(this);
        this.handleEstadoConstruccion = this.handleEstadoConstruccion.bind(this);
        this.handleDescripcion = this.handleDescripcion.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleLocalidad = this.handleLocalidad.bind(this);
        this.handleProvincia = this.handleProvincia.bind(this);
        this.handleCiudad = this.handleCiudad.bind(this);
        this.handleCantidadBanos = this.handleCantidadBanos.bind(this);
        this.handleCantidadCocheras = this.handleCantidadCocheras.bind(this);
        this.handleCantidadHabitaciones = this.handleCantidadHabitaciones.bind(this);
        this.handleCantidadPisos = this.handleCantidadPisos.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.handlePrecio = this.handlePrecio.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.propiedad.NUMERO_PROPIEDAD) {
            this.setState({ isEdit: true });
        } else {
            this.setState({ isEdit: false });
        }
        this.setState({
            numero_propiedad: nextProps.propiedad.NUMERO_PROPIEDAD,
            nombre_propiedad: nextProps.propiedad.NOMBRE,
            autor: nextProps.propiedad.AUTOR,
            tam_propiedad: nextProps.propiedad.TAMANO,
            m_cuadrados: nextProps.propiedad.M_CUADRADOS,
            tipo_propiedad: nextProps.propiedad.TIPO_PROPIEDAD,
            tipo_disponibilidad: nextProps.propiedad.TIPO_DISPONIBILIDAD,
            estado_construccion: nextProps.propiedad.ESTADO_CONSTRUCCION,
            descripcion: nextProps.propiedad.DESCRIPCION,
            localidad: nextProps.propiedad.LOCALIDAD,
            ciudad: nextProps.propiedad.CIUDAD,
            provincia: nextProps.propiedad.PROVINCIA,
            cantidad_banos: nextProps.propiedad.CANTIDAD_BANOS,
            cantidad_cocheras: nextProps.propiedad.CANTIDAD_COCHERAS,
            cantidad_habitaciones: nextProps.propiedad.CANTIDAD_HABITACIONES,
            cantidad_pisos: nextProps.propiedad.CANTIDAD_PISOS,
            precio: nextProps.propiedad.PRECIO
        });

    }

    handleCancelar() {
        location.reload();
    }

    handleInsert() {
        var usuario = localStorage.loginUser;
        var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        if (
            !this.state.numero_propiedad ||
            !this.state.nombre_propiedad ||
            !this.state.tam_propiedad ||
            !this.state.m_cuadrados ||
            !this.state.tipo_propiedad ||
            !this.state.tipo_disponibilidad ||
            !this.state.estado_construccion ||
            !this.state.descripcion
        ) {
            document.getElementById('alerta').innerHTML =
                '<p class="alert alert-danger">Datos requeridos faltantes.<p>';

            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; //
        }

        else {
            var data = JSON.stringify({
                method: 'insertarPropiedad',
                metodo2: 'insertarPropiedad',
                numero_propiedad: this.state.numero_propiedad,
                nombre: this.state.nombre_propiedad,
                autor: usuario,
                tamano: this.state.tam_propiedad,
                m_cuadrados: this.state.m_cuadrados,
                tipo_propiedad: this.state.tipo_propiedad,
                tipo_disponibilidad: this.state.tipo_disponibilidad,
                estado_construccion: this.state.estado_construccion,
                descripcion: this.state.descripcion,
                localidad: this.state.localidad,
                ciudad: this.state.ciudad,
                provincia: this.state.provincia,
                fecha_publicacion: fi,
                cantidad_banos: this.state.cantidad_banos,
                cantidad_cocheras: this.state.cantidad_cocheras,
                cantidad_habitaciones: this.state.cantidad_habitaciones,
                cantidad_pisos: this.state.cantidad_pisos,
                precio:this.state.precio
            });
            console.log(data);
            fetch("api/index.php/propiedad/1", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: data
            }).then((response) => {
                this.props.handleAll();
                if (response.statusText == 'OK') {
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
    }

    handleActualizar() {
        var usuario = localStorage.loginUser;
        var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        if (
            !this.state.numero_propiedad ||
            !this.state.nombre_propiedad ||
            !this.state.tam_propiedad ||
            !this.state.m_cuadrados ||
            !this.state.tipo_propiedad ||
            !this.state.tipo_disponibilidad ||
            !this.state.estado_construccion ||
            !this.state.descripcion
        ) {
            document.getElementById('alerta').innerHTML =
                '<p class="alert alert-danger">Datos requeridos faltantes.<p>';

            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; //
        } else {
            var data = JSON.stringify({
                method: 'modificarPropiedad',
                metodo2: 'modificarPropiedad',
                numero_propiedad: this.state.numero_propiedad,
                nombre: this.state.nombre_propiedad,
                autor: usuario,
                tamano: this.state.tam_propiedad,
                m_cuadrados: this.state.m_cuadrados,
                tipo_propiedad: this.state.tipo_propiedad,
                tipo_disponibilidad: this.state.tipo_disponibilidad,
                estado_construccion: this.state.estado_construccion,
                descripcion: this.state.descripcion,
                localidad: this.state.localidad,
                ciudad: this.state.ciudad,
                provincia: this.state.provincia,
                fecha_publicacion: fi,
                cantidad_banos: this.state.cantidad_banos,
                cantidad_cocheras: this.state.cantidad_cocheras,
                cantidad_habitaciones: this.state.cantidad_habitaciones,
                cantidad_pisos: this.state.cantidad_pisos,
                precio:this.state.precio
            });
            //console.log(data);
            fetch("api/index.php/propiedad/1", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: data
            }).then((response) => {
                this.props.handleAll();
                if (response.statusText == 'OK') {
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
    }

    handleDelete() {
        //var usuario = localStorage.loginUser;
        // var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var data = JSON.stringify({
            method: 'delete',
            metodo2: 'eliminarPropiedad',
            numero_propiedad: this.state.numero_propiedad
        })
        // console.log(data);
        fetch("api/index.php/propiedad/1", {
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

    handleNumero(event) {
        var data = event.target.value;
        this.setState({
            numero_propiedad: data
        })
    }

    handleNombre(event) {
        var data = event.target.value;
        this.setState({
            nombre_propiedad: data
        })
    }

    handleTamPropiedad(event) {
        var data = event.target.value;
        this.setState({
            tam_propiedad: data
        })
    }

    handleMetroCuadrados(event) {
        var data = event.target.value;
        this.setState({
            m_cuadrados: data
        })
    }

    handleTipoPropiedad(event) {
        var data = event.target.value;
        //console.log(data)
        this.setState({
            tipo_propiedad: data
        })
    }

    handleTipoDisponibilidad(event) {
        var data = event.target.value;
        this.setState({
            tipo_disponibilidad: data
        })
    }

    handleEstadoConstruccion(event) {
        var data = event.target.value;
        this.setState({
            estado_construccion: data
        })
    }

    handleDescripcion(event) {
        var data = event.target.value;
        this.setState({
            descripcion: data
        })
    }
    handleLocalidad(event) {
        var data = event.target.value;
        this.setState({
            localidad: data
        })
    }
    handleCiudad(event) {
        var data = event.target.value;
        this.setState({
            ciudad: data
        })
    }
    handleProvincia(event) {
        var data = event.target.value;
        this.setState({
            provincia: data
        })
    }
    handleCantidadBanos(event) {
        var data = event.target.value;
        this.setState({
            cantidad_banos: data
        })
    }
    handleCantidadCocheras(event) {
        var data = event.target.value;
        this.setState({
            cantidad_cocheras: data
        })
    }
    handleCantidadHabitaciones(event) {
        var data = event.target.value;
        this.setState({
            cantidad_habitaciones: data
        })
    }
    handleCantidadPisos(event) {
        var data = event.target.value;
        this.setState({
            cantidad_pisos: data
        })
    }
    handlePrecio(event) {
        var data = event.target.value;
        this.setState({
            precio: data
        })
    }
    /*  
     cantidad_banos:null,
                cantidad_cocheras:null,
                cantidad_habitaciones:null,
                cantidad_pisos:null,
    */
    render() {

        const buttons = this.state.isEdit ?
            <div>
                <Button color="info" onClick={this.handleActualizar}>Modificar</Button>{' '}
                <Button color="danger" onClick={this.handleDelete}>Eliminar</Button>{' '}
                <Button color="warning" onClick={this.handleCancelar}>Cancelar</Button>{' '}
            </div>
            : <Button color="success" onClick={this.handleInsert}>Agregar</Button>

        const validar_tipos = this.state.tipo_propiedad
            && (this.state.tipo_propiedad == 'Apartamento' ||
                this.state.tipo_propiedad == 'Vivienda') ?
            <div className="border my-3 p-2">
                <h3>Se requieren los siguientes datos:</h3>
                <FormGroup className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Label htmlFor="nombre"><span></span>Cantidad de habitaciones:</Label>
                        <Input type="number" className="form-control" name='numero'
                            placeholder="Cantidad de habitaciones:"
                            required
                            onChange={this.handleCantidadHabitaciones}
                            value={this.state.cantidad_habitaciones} />
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Label htmlFor="nombre"><span></span>Cantidad de baños:</Label>
                        <Input type="number" className="form-control" name='numero'
                            placeholder="Cantidad de baños"
                            required
                            onChange={this.handleCantidadBanos}
                            value={this.state.cantidad_banos} />
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Label htmlFor="nombre"><span></span>Cantidad de cocheras:</Label>
                        <Input type="number" className="form-control" name='numero'
                            placeholder="Cantidad de cocheras"
                            required
                            onChange={this.handleCantidadCocheras}
                            value={this.state.cantidad_cocheras} />
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Label htmlFor="nombre"><span></span>Cantidad de pisos:</Label>
                        <Input type="number" className="form-control" name='numero'
                            placeholder="Cantidad de pisos"
                            required
                            onChange={this.handleCantidadPisos}
                            value={this.state.cantidad_pisos} />
                    </div>
                </FormGroup>
            </div>
            : '';
        return (
            <div>
                <h2>Administración de las propiedades: </h2>
                <p>Propietario: {JSON.parse(localStorage.loggedUser).USERNAME}</p>
                <Form>
                    <div id='alerta' role="alert"></div>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Número de la propiedad:</Label>
                            <Input type="number" className="form-control" name='numero'
                                placeholder="Número de la propiedad"
                                required onChange={this.handleNumero}
                                value={this.state.numero_propiedad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Nombre de la propiedad:</Label>
                            <Input type="text" className="form-control" name='nombre'
                                placeholder="Nombre de la propiedad"
                                required onChange={this.handleNombre}
                                value={this.state.nombre_propiedad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Tamaño de la propiedad:</Label>
                            <Input type="number" className="form-control" name='tamano'
                                placeholder="Tamaño de la propiedad"
                                required onChange={this.handleTamPropiedad}
                                value={this.state.tam_propiedad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Metros cuadrados de la propiedad:</Label>
                            <Input type="number" className="form-control" name='mcuadrados'
                                placeholder="m2"
                                required onChange={this.handleMetroCuadrados}
                                value={this.state.m_cuadrados} />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="tipo_propiedad"><span></span>Tipo de propiedad</Label>
                            <select className="form-control" id="tipo_propiedad"
                                name="tipo_propiedad" required
                                onChange={this.handleTipoPropiedad}>
                                <option value="">Seleccione</option>
                                <option value="Apartamento"
                                    selected={this.state.tipo_propiedad == 'Apartamento' ? true : false}>
                                    Apartamento
                                </option>
                                <option value="Bodega"
                                    selected={this.state.tipo_propiedad == 'Bodega' ? true : false}>Bodega
                                </option>
                                <option value="Edificio Comercial"
                                    selected={this.state.tipo_propiedad == 'Edificio Comercial' ? true : false}>
                                    Edificio Comercial
                                </option>
                                <option value="Vivienda"
                                    selected={this.state.tipo_propiedad == 'Vivienda' ? true : false}>Vivienda
                                </option>
                                <option value="Otro"
                                    selected={this.state.tipo_propiedad == 'Otro' ? true : false}>Otro
                                </option>
                            </select>
                        </div>
                    </FormGroup>
                    {validar_tipos}
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="tipo_disponibilidad"><span></span>Tipo de disponibilidad</Label>
                            <select className="form-control" id="tipo_disponibilidad" name="tipo_disponibilidad"
                                required
                                onChange={this.handleTipoDisponibilidad}>
                                <option value="">Seleccione</option>
                                <option value="Alquiler"
                                    selected={this.state.tipo_disponibilidad == 'Alquiler' ? true : false}>Alquiler
                                </option>
                                <option value="Venta"
                                    selected={this.state.tipo_disponibilidad == 'Venta' ? true : false}>Venta
                                </option>
                                <option value="Ambos"
                                    selected={this.state.tipo_disponibilidad == 'Ambos' ? true : false}>Ambos
                                </option>
                            </select>
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="estado_propiedad"><span></span>Estado de la construcción:</Label>
                            <Input type="text" className="form-control" name='estado_propiedad'
                                placeholder="Describa el estado de su propiedad"
                                required onChange={this.handleEstadoConstruccion}
                                value={this.state.estado_construccion}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="precio_propiedad">
                                <span></span>Precio de la propiedad:
                            </Label>
                            <Input type="number" className="form-control" name='precio_propiedad'
                                placeholder="Precio de la propiedad"
                                required onChange={this.handlePrecio}
                                value={this.state.precio}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="province"><span></span>Provincia</Label>
                            <select className="form-control" id="province" name="province" required
                                onChange={this.handleProvincia}>
                                <option value="">Seleccione</option>
                                <option value="San Jose"
                                    selected={this.state.provincia == 'San Jose' ? true : false}>San José</option>
                                <option value="Alajuela"
                                    selected={this.state.provincia == 'Alajuela' ? true : false}>Alajuela</option>
                                <option value="Heredia"
                                    selected={this.state.provincia == 'Heredia' ? true : false}>Heredia</option>
                                <option value="Cartago"
                                    selected={this.state.provincia == 'Cartago' ? true : false}>Cartago</option>
                                <option value="Guanacaste"
                                    selected={this.state.provincia == 'Guanacaste' ? true : false}>Guanacaste</option>
                                <option value="Puntarenas"
                                    selected={this.state.provincia == 'Puntarenas' ? true : false}>Puntarenas</option>
                                <option value="Limon"
                                    selected={this.state.provincia == 'Limon' ? true : false}>Limón</option>
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="estado_propiedad"><span></span>Escriba el nombre de la ciudad:</Label>
                            <Input type="text" className="form-control" name='estado_propiedad'
                                placeholder="Describa el estado de su propiedad"
                                required onChange={this.handleCiudad}
                                value={this.state.ciudad}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Describa la localidad:</Label>
                            <Input type="textarea" className="form-control" name='descripcion'
                                placeholder="Descripción General"
                                required onChange={this.handleLocalidad}
                                value={this.state.localidad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Descripción General de la propiedad:</Label>
                            <Input type="textarea" className="form-control" name='descripcion'
                                placeholder="Descripción General"
                                required onChange={this.handleDescripcion}
                                value={this.state.descripcion} />
                        </div>
                    </FormGroup>

                </Form>
                <div>
                    {buttons}
                </div>
            </div>
        )
    }
}