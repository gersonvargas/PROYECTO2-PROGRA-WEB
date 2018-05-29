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
class ListaMensajes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vermensaje: true
        };

    }

    render() {
        if (this.props.mensajes.length > 0) {
           // console.log(this.props.mensajes);
            const rows = this.props.mensajes.map((item, index) =>
                <Card>
                    <CardBody>                       
                        <CardTitle>Cliente: {item.EMAIL_CLIENTE}</CardTitle>
                        <CardSubtitle>Propiedad: {item.PROPIEDAD}</CardSubtitle>
                        <CardText>
                            <p> Disponibilidad: <small className="text-muted">
                                {item.MENSAJE}
                            </small></p>
                        </CardText>
                    </CardBody>
                    <CardFooter className="text-muted">Hecho el: {item.FECHA_APLICADA}

                    </CardFooter>
                </Card>
            );
            return (
                <div>
                    {rows}
                </div>
            );
        }else{
          return  <p>La propiedad seleccionada no tiene mensajes!</p>
        }
        
    }
}