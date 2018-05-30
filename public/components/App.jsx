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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handlePropiedades = this.handlePropiedades.bind(this);
        this.handleRegistrar = this.handleRegistrar.bind(this);
        this.handleAbout = this.handleAbout.bind(this);
    }

    handleLogin() {

        if (localStorage.loginUser !== 'NULL') {
            localStorage.setItem("loginUser", 'NULL');
            alert('Sesión cerrada.');
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

    render() {
        var renderClass = <Home/>;
        //if(localStorage){
        switch (localStorage.path) {
            case "login":
                renderClass = <Login/>;
                break;
            case "propiedad":
                renderClass = <Propiedades/>;
                break;
            case "registrar":
                renderClass = <Registrar/>;
                break;
            case "about":
                renderClass = <About/>;
                break;
            default:
                break;
        }

        var LoginType = <NavLink href="" onClick={this.handleLogin}>Iniciar sesión</NavLink>;
        var Registrarse = <NavLink href="" onClick={this.handleRegistrar}>Registrarse</NavLink>;
        if (localStorage.loginUser && localStorage.loginUser !== 'NULL') {
            var currentUser = JSON.parse(localStorage.loggedUser).USERNAME;
            LoginType =
                <NavLink href="" onClick={this.handleLogin}>
                    Cerrar sesión: {currentUser}
                </NavLink>;
            Registrarse = '';
        }
        return (
            <div>
                <header>
                    <Navbar color="dark" inverse expand="md">
                        <NavbarBrand href="" onClick={this.handleHome}>Bienes Raíces</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="" onClick={this.handlePropiedades}>Propiedades</NavLink>
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
                            </Nav>
                        </Collapse>
                    </Navbar>

                </header>

                <div className="container">
                    {renderClass}
                </div>
                <Footer/>
            </div>
        )
    }
}