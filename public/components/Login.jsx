class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: 'api/index.php',
            email: '',
            password: '',
            login_correcto: false
        };
        this.login = this.login.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail(event) {
        var correo = event.target.value;
        this.setState({
            email: correo
        })
    }

    handlePassword(event) {
        var pass = event.target.value;
        this.setState({
            password: pass
        })

    }

    login() {
        var url = this.state.api +
            '/login/' +
            '?metodo=login&email=' + this.state.email + '&password=' + this.state.password;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                if (data) {
                    localStorage.setItem("loginUser", data.EMAIL);
                    // localStorage.setItem("tipo_usuario", data.TIPO_USUARIO);
                    localStorage.setItem("loggedUser", JSON.stringify(data));
                    this.forceUpdate();
                } else {
                    localStorage.setItem("loginUser", 'NULL');
                    document.getElementById('alerta').innerHTML =
                        '<p class="alert alert-danger"><small>Credenciales incorrectas, intente de nuevo</small><p>';
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; //
                }
            })
    }

    render() {
        if (localStorage.loginUser !== 'NULL') {
            localStorage.setItem("path", "home");
            location.reload();
        }

        return (
            <div className="loginArea">
                <div className="card col-md-10">
                    <div className="card-header h2">Iniciar sesión
                        <img src='images/login.png' alt="Iniciar sesión" className="loginImg" />
                    </div>
                    <div id='alerta' role="alert"></div>
                    <div className="card-body text-dark">
                        <form>
                            <div className="form-group">
                                <label className="sr-only" >Email</label>
                                <div className="input-group mb-2">
                                    <input type="email" className="form-control" id="email" placeholder="Email"
                                        onChange={this.handleEmail} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Password</label>
                                <div className="input-group mb-2">
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                        onChange={this.handlePassword} />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary"
                                onClick={this.login}>
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}