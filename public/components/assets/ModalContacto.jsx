var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var ButtonGroup = Reactstrap.ButtonGroup;

var Card = Reactstrap.Card;
var CardImg = Reactstrap.CardImg;
var CardText = Reactstrap.CardText;
var CardBody = Reactstrap.CardBody;
var CardTitle = Reactstrap.CardTitle;
var CardSubtitle = Reactstrap.CardSubtitle;
var Button = Reactstrap.Button;
var CardFooter = Reactstrap.CardFooter;

class ModalContacto extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: "", name: "", area: 0, population: 0, density: 0 }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }
    componentWillReceiveProps(nextProps) {

    }
    handleInsert() {
        fetch("server/index.php/country/" + this.state.id, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'put',
                name: this.state.name,
                area: this.state.area,
                population: this.state.population,
                density: this.state.density
            })
        }).then((response) => {
            this.props.handleChangeData();
            this.props.handleEditData();
        }
        );
    }
    handleUpdate() {
        alert('click')
        var data = JSON.stringify({
            name: this.state.name,
            area: this.state.area,
            population: this.state.population,
            density: this.state.density
        });
        console.log(data);
        fetch("server/index.php/country/" + this.state.id, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            this.props.handleChangeData();
            this.props.handleEditData();
        }
        );
    }
    handleDelete() {
        fetch("server/index.php/country/" + this.state.id, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'delete' })
        }).then((response) => {
            this.props.handleChangeData();
            this.props.handleEditData();
        }
        );
    }
    handleFields(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    render() {

        return (<Modal isOpen={this.props.modal} toggle={this.props.handleEditData}
            className={this.props.className}>
            <ModalHeader toggle={this.handleEditData}>Contacto de la propiedad</ModalHeader>
            <ModalBody>
                <Card>
                    <CardBody>
                        <CardTitle><strong>Nombre:</strong> {this.props.contacto.NOMBRE}</CardTitle>
                        <CardSubtitle><strong>Vive en:</strong>  {this.props.contacto.PROVINCIA}</CardSubtitle>
                        <CardText>
                            <strong>Dirección: </strong>
                            {this.props.contacto.UBICACION}
                        </CardText>
                    </CardBody>
                    <CardFooter className="text-muted">
                        <strong><b>Contacto:</b></strong>
                        <p>Email : {this.props.contacto.EMAIL}</p>
                        <p>Teléfono: {this.props.contacto.TELEFONO}</p>
                    </CardFooter>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.props.handleEditData}>Aceptar</Button>
            </ModalFooter>
        </Modal>)
    }
}