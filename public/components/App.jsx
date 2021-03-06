var Table = Reactstrap.Table;
var Button = Reactstrap.Button;
var Navbar = Reactstrap.Navbar;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Collapse = Reactstrap.Collapse;
var Nav = Reactstrap.Nav;
var NavItem = Reactstrap.NavItem;
var NavLink = Reactstrap.NavLink;
var UncontrolledDropdown = Reactstrap.UncontrolledDropdown;
var DropdownToggle = Reactstrap.DropdownToggle;
var DropdownItem = Reactstrap.DropdownItem;
var DropdownMenu = Reactstrap.DropdownMenu;
var Form = Reactstrap.Form;
var FormGroup = Reactstrap.FormGroup;
var Input = Reactstrap.Input;
var Label = Reactstrap.Label;
var Col = Reactstrap.Col;
var Modal = Reactstrap.Modal;
var ModalHeader = Reactstrap.ModalHeader;
var ModalBody = Reactstrap.ModalBody;
var ModalFooter = Reactstrap.ModalFooter;

var ColumnChart = ReactChartkick.ColumnChart;
var PieChart = ReactChartkick.PieChart;
var AreaChart = ReactChartkick.AreaChart;
var BarChart = ReactChartkick.BarChart;
var LineChart = ReactChartkick.LineChart;
var ScatterChart = ReactChartkick.ScatterChart;

class App extends React.Component {
    constructor(props) {
        if(!localStorage.loginUser){
            localStorage.setItem("loginUser", 'NULL');
        }
        super(props);
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handlePropiedades = this.handlePropiedades.bind(this);
        this.handleRegistrar = this.handleRegistrar.bind(this);
        this.handleAbout = this.handleAbout.bind(this);
        this.handlePerfil = this.handlePerfil.bind(this);
        this.handleVisualizarDatos=this.handleVisualizarDatos.bind(this);
    }

    handleLogin() {
        if (localStorage.loginUser !== 'NULL') {
            localStorage.setItem("loginUser", 'NULL');
            //alert('Sesión cerrada.');
        }

        localStorage.setItem("path", "login");
        this.forceUpdate();
    }

    handleHome() {
        localStorage.setItem("path", "home");
        this.forceUpdate();
    }

    handlePropiedades() {
        if (localStorage.loginUser !== 'NULL') {
            localStorage.setItem("path", "propiedad");
        } else {
            localStorage.setItem("path", "login");
        }
        this.forceUpdate();
    }

    handleRegistrar() {
        localStorage.setItem("path", "registrar");
        this.forceUpdate();
    }

    handleAbout() {
        localStorage.setItem("path", "about");
        this.forceUpdate();
    }
    handlePerfil() {
        localStorage.setItem("path", "perfil");
        this.forceUpdate();
    }
    handleVisualizarDatos() {
        localStorage.setItem("path", "datos");
        //this.forceUpdate();
    }
    
    render() {
        var renderClass = "";
        //if(localStorage.loggedUser&&localStorage.loginUser){}
        switch (localStorage.path) {
            case "login":
                renderClass = <Login />;
                break;
            case "propiedad":
                renderClass = <Propiedades />;
                break;
            case "registrar":
                renderClass = <Registrar />;
                break;
            case "about":
                renderClass = <About />;
                break;
            case "perfil":
                renderClass = <Perfil />;
                break;
            case "datos":
                renderClass = <Datos />;
                break;
            default:
                renderClass = <Home />;
                break;
        }

        var LoginType = <NavLink href="" onClick={this.handleLogin}>Iniciar sesión</NavLink>;
        var Registrarse = <NavLink href="" onClick={this.handleRegistrar}>Registrarse</NavLink>;

        var PerfilUser = '';
        if (localStorage.loggedUser&&(localStorage.loginUser && localStorage.loginUser !== 'NULL')) {

            var currentUser = JSON.parse(localStorage.loggedUser).USERNAME;
            LoginType =
                <NavLink href="" onClick={this.handleLogin}>
                    Cerrar sesión: {currentUser}
                </NavLink>;
            Registrarse = '';
            PerfilUser = <NavLink href="" onClick={this.handlePerfil}>Perfil</NavLink>;
        }
    
        return (
            <div>
                <header>
                    <Navbar color="dark" inverse expand="md">
                        <NavbarBrand href="" onClick={this.handleHome}>Bienes Raíces</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="" onClick={this.handlePropiedades}>Propiedades</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="" onClick={this.handleVisualizarDatos}>Visualizar Datos</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="" onClick={this.handleAbout}>Sobre nosotros</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="customNav">
                                <NavItem>
                                    {LoginType}
                                </NavItem>
                                <NavItem>
                                    {Registrarse}
                                </NavItem>
                                <NavItem>
                                    {PerfilUser}
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                </header>

                <div className="container">
                    {renderClass}
                </div>
                <Footer />
            </div>
        )
    }
}