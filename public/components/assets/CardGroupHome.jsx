class Card extends React.Component {
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
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">{this.state.company_name}</h5>
          <p className="card-text">
            <img className="card-img-top img-fluid rounded" src={this.state.company_logo} alt="Card image cap" />

          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">

            <a className='btn btn-primary' target="_blank" href={this.state.company_url}> Visit us
                <img className="rounded ml-2" src='icons/lupa.png' alt="Card image cap" />
            </a>
          </small>
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

        <Card
          company_name={'Mejores precios'}
          company_logo='images/home1.jpg'
          company_url={'https://www.microsoft.com'}
        />
        <Card
          company_name={'Casa de sus sueños'}
          company_logo='images/home2.jpg'
          company_url={'https://www.apple.com/'}
        />
        <Card
          company_name={'Mejores opciones de alquiler'}
          company_logo='images/home3.jpg'
          company_url={'https://www.bolttoken.org/'}
        />
      </div>
    )
  }
}