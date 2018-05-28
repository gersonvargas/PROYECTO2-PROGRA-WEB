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
            numero: "", fecha: "", area: 0, cliente: '', density: 0,
            montototal: 0,
            productos: null,
            cp: 0, dp: '', vp: 0,
            prodductos_seleccionados: null
        }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
        this.handleFecha = this.handleFecha.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleInsertProd = this.handleInsertProd.bind(this);

        this.handleCP = this.handleCP.bind(this);
        this.handleDP = this.handleDP.bind(this);
        this.handleVP = this.handleVP.bind(this);
        this.doreload = this.doreload.bind(this);
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
    componentWillMount() {
        //this.doreload();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ numero: nextProps.propiedad.numero });
        this.setState({ fecha: nextProps.propiedad.fecha });
        this.setState({ cliente: nextProps.propiedad.AUTOR });
        this.setState({ montototal: nextProps.propiedad.montototal });
        // this.setState({ population: nextProps.propiedad.population });
        // this.setState({ density: nextProps.propiedad.density });
    }
    handleInsert() {

        var data = JSON.stringify({
            method: 'put',// numero: "", fecha: "", area: 0, cliente: '', density: 0,
            numeroi: this.state.numero,
            fechai: this.state.fecha,
            clientei: this.state.cliente,
            selectprods: this.state.prodductos_seleccionados
        })
        console.log(data);
        fetch("/tarea10/server/index.php/country/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            this.props.handleChangeData();
        }
        );
    }
    handleUpdate() {
        var data = JSON.stringify({
            method: 'post',// numero: "", fecha: "", area: 0, cliente: '', density: 0,
            numerom: this.state.numero,
            fecham: this.state.fecha,
            clientem: this.state.cliente
            // selectprods: this.state.prodductos_seleccionados
        })
        console.log(data);
        fetch("/tarea10/server/index.php/country/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            this.props.handleChangeData();
        }
        );
    }
    handleDelete() {
        fetch("/tarea10/server/index.php/country/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'delete',
                numerom: this.state.numero
            })
        }).then((response) => {
            this.props.handleChangeData();
        }
        );
    }
    handleFields(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //alert(name)
        this.setState({ [name]: value });
        // this.setState({ numero: value });
    }
    handleFecha(event) {
        var f = event.target.value;
        // alert(f)
        this.setState({
            fecha: f
        })
    }

    handleInsertProd() {

        var data = JSON.stringify({
            method: 'insertarproducto',
            cantidad: this.state.cp,
            descripcion: this.state.dp,
            valoru: this.state.vp
        })
        console.log(data);
        fetch("/tarea10/server/index.php/country/1", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((response) => {
            this.doreload();
            //this.props.handleChangeData();
        }
        );
    }
    handleCP(event) {
        var cp = event.target.value;
        this.setState({
            cp: cp
        })
    }

    handleVP(event) {
        var vp = event.target.value;
        this.setState({
            vp: vp
        })
    }
    handleDP(event) {
        var dp = event.target.value;
        this.setState({
            dp: dp
        })
    }
    render() {
        return (
            <div>
                <h2>Detalle de factura: {this.state.numero}</h2>
                <Form >
                    <FormGroup>
                        <Label>Numero:</Label>
                        <Input type="number" name="numero"
                            value={this.state.numero} onChange={this.handleFields} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha:</Label>
                        <Input type="date" name="fecha" id="exampleDate" placeholder="date placeholder"
                            value={this.state.fecha}
                            onChange={this.handleFecha}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cliente</Label>
                        <Input type="text" name="cliente"
                            value={this.state.cliente} onChange={this.handleFields} />
                    </FormGroup>
                    <Input type="hidden" name="id" value={this.state.id} />
                    <FormGroup>

                        <p><small>Monto total: {this.state.montototal}</small></p>
                    </FormGroup>
                    <div>
                        <h2>Productos</h2>
                        {this.state.prodductos_seleccionados ?
                            <Table striped>
                                <thead><tr>
                                    <th>Cantidad</th><th>Descripcion</th><th>Valor/U</th>
                                    <th>Subtotal</th>
                                    <th>Acción</th>
                                </tr></thead>
                                <tbody>
                                    {
                                        this.state.prodductos_seleccionados.map((prod, index) =>
                                            <tr key={index} >
                                                <td>{prod.cantidad}</td>
                                                <td>{prod.descripcion}</td>
                                                <td>{prod.valorunitario}</td>
                                                <td>{prod.subtotal}</td>
                                                <td><FormGroup>

                                                    <Input type="button" name="population"
                                                        value='Remove' data-item={index} onClick={this.handleDetails} />
                                                </FormGroup></td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </Table> : ''

                        }

                    </div>
                </Form>
                <div className='mb-3'>
                    <Form inline>

                        <FormGroup>
                            <Input type="text" name="cantidad"
                                onChange={this.handleCP} placeholder='Cantidad' />
                        </FormGroup>

                        <FormGroup>
                            <Input type="text" name="cantidad"
                                onChange={this.handleDP} placeholder='Descripcion' />
                        </FormGroup>

                        <FormGroup>
                            <Input type="text" name="cantidad"
                                onChange={this.handleVP} placeholder='Valor (U)' />
                        </FormGroup>

                        <FormGroup>
                            <Input type="button" name=""
                                value='Add' onClick={this.handleInsertProd} />

                        </FormGroup>


                    </Form>
                </div>
                <div>
                    <Button onClick={this.handleInsert}>Agregar</Button>{' '}
                    <Button onClick={this.handleUpdate}>Modificar</Button>{' '}
                    <Button onClick={this.handleDelete}>Eliminar</Button>{' '}
                </div>


            </div>
        )
    }
}