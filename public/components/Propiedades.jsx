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
            propiedad: null,
            tipo_usuario: -1,
        }
        this.handleReload = this.handleReload.bind(this);
        this.handleAplicadas = this.handleAplicadas.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleChangePropiedad = this.handleChangePropiedad.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    handleReload() {
        fetch('api/index.php/propiedad/1/?metodo=getpropiedades')
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                // console.log(data)
                this.setState({ propiedades: data });
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
    componentWillMount() {
        this.handleReload();
        this.handleAplicadas();
        // var currentUser = JSON.parse(localStorage.loggedUser).USERNAME;
        var user = JSON.parse(localStorage.loggedUser);
        this.setState({
            tipo_usuario: user.TIPO_USUARIO
        });

    }
    componentDidMount() {
        console.log(this.state.tipo_usuario)
    }
    handleChangePropiedad(data) {
        //console.log(data)
        this.setState({
            propiedad: data
        })
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
    render() {
        var renderClass = <Home />;
        //if(localStorage){
        switch (this.state.tipo_usuario) {
            case "0": //usuario administrador
                renderClass = <Login />;
                break;
            case "1": //usuario cliente
                renderClass = this.state.propiedad? this.obtenerRender():this.obtenerRender();

                break;
            case "2"://usuario interesado
                renderClass = <Registrar />;
                break;
            default:
                break;
        }
        return (
            <div className="Home">
                <h1 className='text-center'>Propiedades disponibles:</h1>
                <hr />
                <Container>
                    {renderClass}
                </Container>
            </div>
        );
    }
}