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
        this.state = {
            facturas: [],
            factura: [],
            regions: [],
            region: []
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    handleLogin() {

        if(localStorage.loginUser !== 'NULL'){
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

    render() {
        var renderClass = <Home/>;
        switch(localStorage.path){
            case "login":
                renderClass = <Login/>;
                break;
            default:break;
        }

        var LoginType = <NavLink href="" onClick={this.handleLogin}>Login</NavLink>;
        if(localStorage.loginUser !== 'NULL'){
            var currentUser = JSON.parse(localStorage.loggedUser).USERNAME;
            var LoginType = <NavLink href="" onClick={this.handleLogin}>Logout: {currentUser}</NavLink>;
        }

        return (
            <div>
                <header>
                    <Navbar color="dark" inverse expand="md">
                        <NavbarBrand href="" onClick={this.handleHome}>Bienes Raíces</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-left" navbar>
                                <NavItem>
                                    {LoginType}
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>

                <div className="container">
                    {renderClass}
                </div>
            </div>
        )
    }
}