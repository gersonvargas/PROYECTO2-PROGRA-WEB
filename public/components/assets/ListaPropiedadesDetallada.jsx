var Table = Reactstrap.Table;


var Card = Reactstrap.Card;
var CardImg = Reactstrap.CardImg;
var CardText = Reactstrap.CardText;
var CardBody = Reactstrap.CardBody;
var CardTitle = Reactstrap.CardTitle;
var CardSubtitle = Reactstrap.CardSubtitle;
var Button = Reactstrap.Button;
var CardFooter = Reactstrap.CardFooter;

//Caso cuando sea un usuario cliente
class ListaPropiedadesDetallada extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false, tipo: true, contacto: []
        };
        this.obtenerPostulaciones = this.obtenerPostulaciones.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.obtenerPropiedad = this.obtenerPropiedad.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
    }
    obtenerPropiedad(numero) {
        //var numero=0;
        // console.log(this.props.propiedades_aplicadas);
        for (var i = 0; i < this.props.propiedades.length; i++) {
            if (this.props.propiedades[i].NUMERO_PROPIEDAD == numero) {
                return this.props.propiedades[i];
            }
        }
        return null;
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        var propiedad = this.obtenerPropiedad(index);
        this.props.handleChangePropiedad(propiedad);
    }
    obtenerPostulaciones(numero) {
        //var numero=0;
        // console.log(this.props.propiedades_aplicadas);
        for (var i = 0; i < this.props.propiedades_aplicadas.length; i++) {
            if (this.props.propiedades_aplicadas[i].PROPIEDAD == numero) {
                return this.props.propiedades_aplicadas[i].aplicadas;
            }
        }
        return 0;
    }
    handleEditData() {
        this.setState({
            tipo: true,
            modal: !this.state.modal
        });
    }
    handleModal(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //var propiedad = this.obtenerPropiedad(index);
        var url =
            'api/index.php/login/' +
            '?metodo=obtenerInteresado&propiedad=' + index;
        fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {

                if (data) {
                    this.setState({
                        contacto: data,
                        tipo: true,
                        modal: !this.state.modal
                    });
                }
            }).catch.then((data) => {
                alert('There was a problem!')
            })

    }
    render() {
        if (this.props.propiedades.length > 0) {

            const rows = this.props.propiedades.map((item, index) =>
                <Card>
                    <CardBody>
                        <CardTitle>{item.NOMBRE}</CardTitle>
                        <CardText>
                            <p> Disponibilidad: <small className="text-muted">
                                {item.TIPO_DISPONIBILIDAD}
                            </small></p>
                        </CardText>
                        <CardText>
                            <p> Tipo de propiedad: <small className="text-muted">
                                {item.TIPO_PROPIEDAD}
                            </small></p>
                        </CardText>
                        <CardText>
                            <p>Descripcion de la propiedad:
                                <small className="text-muted">
                                    {item.DESCRIPCION}
                                </small>
                            </p>
                        </CardText>
                        <CardText>
                            <p> Metros cuadrados: <small className="text-muted">
                                {item.M_CUADRADOS}
                            </small></p>
                        </CardText>
                        <CardText>
                            <p> Tamaño: <small className="text-muted">
                                {item.TAMANO}
                            </small></p>
                        </CardText>
                        <CardText>
                            <p> Ubicacion: <small className="text-muted">
                                {item.LOCALIDAD}
                            </small></p>
                            <p> Provincia: <small className="text-muted">
                                {item.PROVINCIA}
                            </small></p>
                        </CardText>

                        {
                            item.TIPO_PROPIEDAD == 'Apartamento' ||
                                item.TIPO_PROPIEDAD == 'Vivienda' ?
                                <CardText>
                                    <p> Esta propiedad de tipo: {item.TIPO_PROPIEDAD} posee:</p>
                                    <p>
                                    Habitaciones.
                                        <small className="text-muted badge badge-primary">
                                            {item.CANTIDAD_HABITACIONES}
                                        </small> 
                            </p>
                                    <p>
                                    Baños:
                                        <small className="text-muted badge badge-primary">
                                            {item.CANTIDAD_BANOS}
                                        </small> 
                            </p>
                                    <p>
                                    Cocheras: 
                                        <small className="text-muted badge badge-primary">
                                            {item.CANTIDAD_COCHERAS}
                                        </small> 
                            </p>
                                    <p>
                                    Pisos:
                                        <small className="text-muted badge badge-primary">
                                            {item.CANTIDAD_PISOS}
                                        </small> 
                            </p>
                                </CardText> : ""
                        }
                        <button className="btn btn-sm btn-primary" key={index} data-item={item.NUMERO_PROPIEDAD}
                            onClick={this.handleDetails}>Estoy Interesado</button>
                        <button type="button" class="btn btn-sm btn-info ml-3">
                            Postulaciones <span class="badge badge-light">
                                {this.obtenerPostulaciones(item.NUMERO_PROPIEDAD)}
                            </span>
                        </button>
                        <button type="button" class="btn btn-sm btn-info ml-3"
                            key={index} data-item={item.NUMERO_PROPIEDAD}
                            onClick={this.handleModal}>
                            Contacto
                        </button>
                        <ModalContacto contacto={this.state.contacto} modal={this.state.modal}
                            handleEditData={this.handleEditData}
                            handleChangeData={this.handleChangeData} tipo={this.state.tipo} />
                    </CardBody>
                    <CardFooter className="text-muted">Publicado el: {item.FECHA_PUBLICACION}

                    </CardFooter>
                </Card>
            );
            return (
                <div>
                    {rows}
                </div>
            );
        }
        return (<p></p>)
    }
}