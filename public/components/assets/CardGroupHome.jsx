class CardDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_url: this.props.company_url,
      company_name: this.props.company_name,
      company_logo: this.props.company_logo
    }
  }
  render() {
    return (
      <div className="card m-3 cardCustom">
        <div className="card-body">
          <h5 className="card-title">{this.state.company_name}</h5>
          <p className="card-text">
            <img className="card-img-top img-fluid rounded cardImg" src={this.state.company_logo} alt="Card image cap" />
          </p>
        </div>
      </div>
    );
  }
}
class CardGroupHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apple_url: null,
      microsft_url: null,
      microsft_logo: null
    }
  }
  render() {
    return (
      <div className="card-group p-3">

        <CardDet
          company_name={'Mejores precios'}
          company_logo='images/home1.jpg'
          company_url={'https://www.microsoft.com'}
        />
        <CardDet
          company_name={'Casa de sus sueños'}
          company_logo='images/home2.jpg'
          company_url={'https://www.apple.com/'}
        />
        <CardDet
          company_name={'Mejores opciones de alquiler'}
          company_logo='images/home3.jpg'
          company_url={'https://www.bolttoken.org/'}
        />
      </div>
    )
  }
}