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
            propiedad:[]
        }
        this.handleReload=this.handleReload.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleChangeCountry=this.handleChangeCountry.bind(this);
    }
    handleReload() {
        fetch('api/index.php/propiedad/1/?metodo=getpropiedades')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            this.setState({ propiedades: data });
            this.forceUpdate();
        })
    }
    componentWillMount() {
        this.handleReload();
    }
    handleChangeCountry(data) {
        //console.log(data)
        this.setState({ country: data })
    }
    render() {
        return (
            <div className="Home">
                <h1 className='text-center'>Propiedades disponibles:</h1>
                <hr />
                <Container>
                    <Row>
                        <Col xs="3">
                            <ListaPropiedades countries={this.state.propiedades}
                                handleChangeCountry={this.handleChangeCountry} />
                        </Col>
                        <Col xs="9">
                            hola
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}