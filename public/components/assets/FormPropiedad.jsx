var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class FormPropiedad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cliente: null,
            numero_propiedad: null,
            mensaje: null
        }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleMensaje = this.handleMensaje.bind(this);

    }

    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        if (this.state.prodductos_seleccionados) {
            if (this.state.prodductos_seleccionados.length > 0) {
                var v_prod = this.state.prodductos_seleccionados;
                v_prod.splice(index, 1);
                console.log(index)
                console.log(v_prod)
                this.setState({
                    prodductos_seleccionados: v_prod
                })
            }
        }
        // this.props.handleChangeCountry(this.props.countries[index]);
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
        this.setState({ numero: nextProps.propiedad.NUMERO_PROPIEDAD });
        // this.setState({ population: nextProps.propiedad.population });
        // this.setState({ density: nextProps.propiedad.density });
    }
    handleInsert() {
        var usuario = localStorage.loginUser;
        var fi = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var data = JSON.stringify({
            method: 'put',// numero: "", fecha: "", area: 0, cliente: '', density: 0,
            metodo2: 'insertarPostulacion',
            numero_propiedad: this.state.numero,
            mensaje: this.state.mensaje,
            fecha: fi,
            email: usuario
        })
        console.log(data);
        fetch("api/index.php/propiedad/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
           // this.props.handleChangeData();
        }
        );
    }



    handleMensaje(event) {
        var data = event.target.value;
        this.setState({
            mensaje: data
        })
    }

    render() {
        return (
            <div>
                
                <h2>Contacta al dueño del bien número: {this.state.numero}</h2>
                <p>Contactar con el anunciante: {this.state.cliente}</p>
                <Form >
                    <FormGroup className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Label htmlFor="nombre"><span></span>Mensaje:</Label>
                            <Input type="textarea" className="form-control" name='nombre'
                                placeholder="Mensaje" required onChange={this.handleMensaje} />
                        </div>
                    </FormGroup>
                </Form>
                <div>
                    <Button onClick={this.handleInsert}>Enviar</Button>{' '}
                </div>
            </div>
        )
    }
}