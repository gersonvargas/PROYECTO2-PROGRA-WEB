var Navbar = Reactstrap.Navbar;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Collapse = Reactstrap.Collapse;
var Nav = Reactstrap.Nav;
var NavItem = Reactstrap.NavItem;
var NavLink = Reactstrap.NavLink;
var UncontrolledDropdown = Reactstrap.UncontrolledDropdown;
var DropdownToggle = Reactstrap.DropdownToggle;
var DropdownMenu = Reactstrap.DropdownMenu;
var DropdownItem = Reactstrap.DropdownItem;
var Container = Reactstrap.Container;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class Propiedades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propiedades: [],
            propiedades_aplicadas: [],
            mensajes: [],
            propiedad: null,
            ver_mensajes: false,
            tipo_usuario: JSON.parse(localStorage.loggedUser).TIPO_USUARIO,
            email_usuario: JSON.parse(localStorage.loggedUser).EMAIL,
        }
        this.handleReload = this.handleReload.bind(this);
        this.handleAplicadas = this.handleAplicadas.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleChangePropiedad = this.handleChangePropiedad.bind(this);
        this.handleAll = this.handleAll.bind(this);
        this.handleVerMensajes = this.handleVerMensajes.bind(this);
        this.handleListaMensajes = this.handleListaMensajes.bind(this);
    }
    handleReload(params) {
        fetch('api/index.php/propiedad/1/' + params)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                // console.log(data)
                this.setState({ propiedades: data });
                this.forceUpdate();
            })
    }
    //ListaMensajes
    handleListaMensajes(params) {
        fetch('api/index.php/propiedad/1/' + params)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                // console.log('Mensajes ' + data)
                this.setState({ mensajes: data });
                this.forceUpdate();
            })
    }
    handleAplicadas() {
        fetch('api/index.php/propiedad/1/?metodo=obtenerTodasAplicadas')
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                //console.log(data)
                this.setState({ propiedades_aplicadas: data });
                this.forceUpdate();
            })
    }
    handleAll() {
        if (this.state.tipo_usuario == 1) {
            this.handleReload('?metodo=getpropiedades');
        }
        if (this.state.tipo_usuario == 2) {
            //api/index.php/propiedad/1/?metodo=obtenerPropiedadesUsuario&email=gersonvargas@gmail.com
            this.handleReload('?metodo=obtenerPropiedadesUsuario&email=' + this.state.email_usuario);
        }
        this.handleAplicadas();
    }
    componentWillMount() {
        this.handleAll();
    }

    handleChangePropiedad(data) {
        this.setState({
            propiedad: data
        })
    }
    handleVerMensajes(value) {
        if (this.state.propiedad) {
            this.handleListaMensajes('?metodo=obtenerMensajesPropiedad&propiedad=' + this.state.propiedad.NUMERO_PROPIEDAD);
        }
        this.setState({
            ver_mensajes: value
        });

    }
    obtenerRender() {
        if (this.state.propiedad) {
            //console.log(this.state.propiedad);
            return <Row>
                <Col xs="5">
                    <ListaPropiedadesDetallada propiedades={this.state.propiedades}
                        propiedades_aplicadas={this.state.propiedades_aplicadas}
                        handleChangePropiedad={this.handleChangePropiedad} />
                </Col>
                <Col xs="7">
                    <FormPropiedad propiedad={this.state.propiedad}
                        handleChangeData={this.handleChangeData} />
                </Col>
            </Row>
        } else {
            return <Row>
                <Col xs="12">
                    <ListaPropiedadesDetallada propiedades={this.state.propiedades}
                        propiedades_aplicadas={this.state.propiedades_aplicadas}
                        handleChangePropiedad={this.handleChangePropiedad}
                    />
                </Col>
            </Row>
        }
    }
    obtenerRenderInteresado() {
        return <Row>
            <Col xs="5">

                <ListaPropiedades propiedades={this.state.propiedades}
                    propiedades_aplicadas={this.state.propiedades_aplicadas}
                    handleChangePropiedad={this.handleChangePropiedad}
                    handleVerMensajes={this.handleVerMensajes}
                />
            </Col>
            <Col xs="7">
                {this.state.ver_mensajes ?
                    <ListaMensajes mensajes={this.state.mensajes} />
                    :
                    <FormInteresadoPropiedad propiedad={this.state.propiedad ? this.state.propiedad : []}
                        handleChangeData={this.handleChangeData}
                        handleAll={this.handleAll} />
                }
            </Col>
        </Row>
    }
    render() {
        var renderClass = <Home />;
        //if(localStorage){
        switch (this.state.tipo_usuario) {
            case "0": //usuario administrador
                renderClass = <Login />;
                break;
            case "1": //usuario cliente
                renderClass = this.state.propiedad ? this.obtenerRender() : this.obtenerRender();

                break;
            case "2"://usuario interesado
                renderClass = this.obtenerRenderInteresado();
                break;
            default:
                break;
        }
        return (
            <div className="Home">
                <h1>Propiedades disponibles</h1>
                <hr />
                <Container>
                    {renderClass}
                </Container>
            </div>
        );
    }
}