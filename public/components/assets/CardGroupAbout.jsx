var Card = Reactstrap.Card;
var CardImg = Reactstrap.CardImg;
var CardText = Reactstrap.CardText;
var CardBody = Reactstrap.CardBody;
var CardTitle = Reactstrap.CardTitle;
var CardSubtitle = Reactstrap.CardSubtitle;
var Button = Reactstrap.Button;
var CardFooter = Reactstrap.CardFooter;

class Card1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        usuario: this.props.usuario,
        about_me: this.props.about_me,
        red_social: this.props.red_social,
        trabajo_git: this.props.trabajo_git
      }
    }
    render() {
      return (
        <div className="card pl-3 pr-3">
          <img className="card-img-top img-fluid rounded" src={this.state.usuario.avatar_url} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{this.state.usuario.name ? this.state.usuario.name : this.state.usuario.login}</h5>
            <p className="card-text">{this.state.usuario.bio ? this.state.usuario.bio : this.state.about_me}</p>
            <p className="card-text">
              <small className="text-muted">
  
              </small>
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              <i>{this.state.usuario.created_at}</i>
              <hr />
              <p>Follow me: </p>
              <a href={this.state.red_social}>
                <img className="rounded" src='icons/facebook.png' alt="Card image cap" />
              </a>
              <a href={this.state.trabajo_git}>
                <img className="rounded" src='icons/github.png'alt="Card image cap" />
              </a>
            </small>
          </div>
        </div>
      );
    }
  }
  class CardGroupAbout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gerson: null,
        frander: null,
        marco: null,
        nacho: null,
        anuard: null
      }
      this.componentDidMount = this.componentDidMount.bind(this);
  
    }
  
    componentDidMount() {
      var self = this;
      //axios.get('https://api.github.com/users/gersonvargas')
      //marcoc22
      //NAchoAvalos
      //frander170896
      
        fetch('https://api.github.com/users/Jupagar77')
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            // console.log(data)
            this.setState({
                marco: data

            });
            this.forceUpdate();
        })
     
        fetch('https://api.github.com/users/gersonvargas')
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            // console.log(data)
            this.setState({
                gerson: data

            });
            this.forceUpdate();
        })
      
    }
  
    render() {
      return (
        <div className="card-group">
  
          {this.state.marco ? <Card1 usuario={this.state.marco}
            red_social={'https://www.facebook.com'}
            trabajo_git={'https://github.com/Jupagar77'}
            about_me={'I am working as developer and I am studying at UNA, Costa Rica.'} /> : ''}
  
          {this.state.gerson ? <Card1 usuario={this.state.gerson}
            red_social={'https://www.facebook.com'}
            trabajo_git={'https://github.com/gersonvargas'}
            about_me={'I am working as an Oracle DBA at GBSYS company. Also, I am studying at UNA, Costa Rica.'} /> : ''}
  
         
        </div>
      );
    }
  }