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
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleChangePropiedad(this.props.propiedades[index]);
    }
    render() {
        if (this.props.propiedades.length > 0) {
            /* const rows = this.props.propiedades.map((item, index) =>
                 <tr key={index} data-item={index} onClick={this.handleDetails}>
                     <td>{item.TIPO_DISPONIBILIDAD}</td>
                     <td>{item.FECHA_PUBLICACION}</td>
                     <td>{item.TIPO_PROPIEDAD}</td>
                 </tr>);
                 */
            const rows = this.props.propiedades.map((item, index) =>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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
                            <p>Descripcion de la porpiedad:
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
                        <Button key={index} data-item={index} onClick={this.handleDetails}>Detalles</Button>
                    </CardBody>
                    <CardFooter className="text-muted">Publicado el: {item.FECHA_PUBLICACION}</CardFooter>
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