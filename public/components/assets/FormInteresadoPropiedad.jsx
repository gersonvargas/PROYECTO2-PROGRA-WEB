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
            nombre_propiedad:null,
            tam_propiedad:null,
            metros_cuadrados:null,
            tipo_propiedad:null,
            tipo_disponibilidad:null,
            estado_construccion:null,
            descripcion:null,
            mensaje: null
        }
        this.handleActualizar=this.handleActualizar.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleNumero = this.handleNumero.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleTamPropiedad= this.handleTamPropiedad.bind(this);
        this.handleMetroCuadrados= this.handleMetroCuadrados.bind(this);
        this.handleTipoPropiedad= this.handleTipoPropiedad.bind(this);
        this.handleTipoDisponibilidad= this.handleTipoDisponibilidad.bind(this);
        this.handleEstadoConstruccion= this.handleEstadoConstruccion.bind(this);
        this.handleDescripcion= this.handleDescripcion.bind(this);
    }
    doreload() {
        fetch('/tarea10/server/index.php/country/2')
            .then((response) => {

                return response.json();
            })
            .then((data) => {
                // console.log(data)
                this.setState({
                    productos: data,
                    prodductos_seleccionados: data

                });
                this.forceUpdate();
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ numero_propiedad: nextProps.propiedad.NUMERO_PROPIEDAD });
        this.setState({ nombre_propiedad: nextProps.propiedad.NOMBRE });
        this.setState({ autor: nextProps.propiedad.AUTOR });
        this.setState({ tam_propiedad: nextProps.propiedad.TAMANO });
        this.setState({ metros_cuadrados: nextProps.propiedad.M_CUADRADOS });
        this.setState({ tipo_propiedad: nextProps.propiedad.TIPO_PROPIEDAD });
        this.setState({ tipo_disponibilidad: nextProps.propiedad.TIPO_DISPONIBILIDAD });
        this.setState({ estado_construccion: nextProps.propiedad.ESTADO_CONSTRUCCION });
        this.setState({ descripcion: nextProps.propiedad.DESCRIPCION });
    }
    handleInsert() {
        var usuario = localStorage.loginUser;
        var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var data = JSON.stringify({
            method: 'insertarPropiedad',
            metodo2: 'insertarPropiedad',
            numero_propiedad: this.state.numero,
            nombre: this.state.nombre_propiedad,
            autor:usuario,
            tamano:this.state.tam_propiedad,
            m_cuadrados:this.state.metros_cuadrados,
            tipo_propiedad:this.state.tipo_propiedad,
            tipo_disponibilidad:this.state.tipo_disponibilidad,
            estado_construccion:this.state.estado_construccion,
            descripcion:this.state.descripcion,
            fecha_publicacion: fi
        })
       // console.log(data);
        fetch("api/index.php/propiedad/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
             this.props.handleAll();
             if(response.statusText=='OK'){
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
            }else{
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-danger">'+response.statusText+'<p>';
            }
        }
        );
    }
    handleActualizar() {
        var usuario = localStorage.loginUser;
        var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var data = JSON.stringify({
            method: 'modificarPropiedad',
            metodo2: 'modificarPropiedad',
            numero_propiedad: this.state.numero,
            nombre: this.state.nombre_propiedad,
            autor:usuario,
            tamano:this.state.tam_propiedad,
            m_cuadrados:this.state.metros_cuadrados,
            tipo_propiedad:this.state.tipo_propiedad,
            tipo_disponibilidad:this.state.tipo_disponibilidad,
            estado_construccion:this.state.estado_construccion,
            descripcion:this.state.descripcion,
            fecha_publicacion: fi
        })
        console.log(data);
        fetch("api/index.php/propiedad/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
             this.props.handleAll();
             if(response.statusText=='OK'){
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-success"><small>Proceso completado correctamente</small><p>';
            }else{
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-danger">'+response.statusText+'<p>';
            }
        }
        );
    }
    handleDelete() {
        //var usuario = localStorage.loginUser;
       // var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var data = JSON.stringify({
            method: 'delete',
            metodo2: 'eliminarPropiedad',
            numero_propiedad: this.state.numero_propiedad
        })
      console.log(data);
        fetch("api/index.php/propiedad/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
             this.props.handleAll();
             if(response.status==200){
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-success"><small>Proceso completado correctamente: '+response.statusText+'</small><p>';
            }else{
                document.getElementById('alerta').innerHTML=
                '<p class="alert alert-danger">'+response.statusText+'<p>';
            }
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
            metros_cuadrados: data
        })
    }
   
    handleTipoPropiedad(event) {
        var data = event.target.value;
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
    render() {
        return (
            <div>

                <h2>Administración de las propiedades: </h2>
                <p>Propietario: {JSON.parse(localStorage.loggedUser).USERNAME}</p>
                <Form >
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
                                value={this.state.nombre_propiedad}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Tamaño de la propiedad:</Label>
                            <Input type="number" className="form-control" name='tamano'
                                placeholder="Tamaño de la propiedad" 
                                required onChange={this.handleTamPropiedad} 
                                value={this.state.tam_propiedad}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Metros cuadrados de la propiedad:</Label>
                            <Input type="number" className="form-control" name='mcuadrados'
                                placeholder="M 2" 
                                required onChange={this.handleMetroCuadrados}
                                value={this.state.metros_cuadrados} />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="tipo_propiedad"><span></span>Tipo de propiedad</Label>
                            <select className="form-control" id="tipo_propiedad"
                             name="tipo_propiedad" required
                                onChange={this.handleTipoPropiedad}>
                                <option value="APARTAMENTO" 
                                selected={this.state.tipo_propiedad=='APARTAMENTO'?true:false}>
                                APARTAMENTO</option>
                                <option value="BODEGA"
                                selected={this.state.tipo_propiedad=='BODEGA'?true:false}>BODEGA</option>
                                <option value="EDIFICIO COMERCIAL"
                                selected={this.state.tipo_propiedad=='EDIFICIO COMERCIAL'?true:false}>EDIFICIO COMERCIAL</option>
                                <option value="VIVIENDA"
                                selected={this.state.tipo_propiedad=='VIVIENDA'?true:false}>VIVIENDA</option>                          
                                <option value="OTRO"
                                selected={this.state.tipo_propiedad=='OTRO'?true:false}>OTRO</option>
                            </select>
                        </div>
                    </FormGroup>

                    <FormGroup className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="tipo_disponibilidad"><span></span>Tipo de disponibilidad</Label>
                            <select className="form-control" id="tipo_disponibilidad" name="tipo_disponibilidad" required
                                onChange={this.handleTipoDisponibilidad}>
                                <option value="ALQUILER"
                                selected={this.state.tipo_disponibilidad=='ALQUILER'?true:false}>ALQUILER</option>
                                <option value="VENTA"
                                selected={this.state.tipo_disponibilidad=='VENTA'?true:false}>VENTA</option>
                                <option value="AMBOS"
                                selected={this.state.tipo_disponibilidad=='AMBOS'?true:false}>AMBOS</option>
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
                            <Label htmlFor="nombre"><span></span>Descripción General:</Label>
                            <Input type="textarea" className="form-control" name='descripcion'
                                placeholder="Descripción General"
                                 required onChange={this.handleDescripcion} 
                                 value={this.state.descripcion} />
                        </div>
                    </FormGroup>

                </Form>
                <div id='alerta'  role="alert">
                                ...
                            </div>
                <div>
                    <Button onClick={this.handleInsert}>Agregar</Button>{' '}
                    <Button onClick={this.handleActualizar}>Modificar</Button>{' '}
                    <Button onClick={this.handleDelete}>Eliminar</Button>{' '}

                </div>
            </div>
        )
    }
}