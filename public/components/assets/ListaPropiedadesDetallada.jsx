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

        };
        this.obtenerPostulaciones = this.obtenerPostulaciones.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.obtenerPropiedad = this.obtenerPropiedad.bind(this);
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
    render() {
        if (this.props.propiedades.length > 0) {
            /* const rows = this.props.propiedades.map((item, index) =>
                 <tr key={index} data-item={index} onClick={this.handleDetails}>
                     <td>{item.TIPO_DISPONIBILIDAD}</td>
                     <td>{item.FECHA_PUBLICACION}</td>
                     <td>{item.TIPO_PROPIEDAD}</td>
                 </tr>);
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                 */
            const rows = this.props.propiedades.map((item, index) =>
                <Card>
                    <CardBody>
                        <CardTitle>{item.NOMBRE}</CardTitle>
                        <CardSubtitle>{item.AUTOR}</CardSubtitle>
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
                        <button className="btn btn-sm btn-primary" key={index} data-item={item.NUMERO_PROPIEDAD}
                            onClick={this.handleDetails}>Estoy Interesado</button>
                        <button type="button" class="btn btn-sm btn-info ml-3">
                            Postulaciones <span class="badge badge-light">
                                {this.obtenerPostulaciones(item.NUMERO_PROPIEDAD)}
                            </span>
                        </button>
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