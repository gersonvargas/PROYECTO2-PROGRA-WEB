var Table = Reactstrap.Table;
var ListGroup = Reactstrap.ListGroup;
var ListGroupItem = Reactstrap.ListGroupItem;
var ListGroupItemHeading = Reactstrap.ListGroupItemHeading;
var ListGroupItemText = Reactstrap.ListGroupItemText;

class CountryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {index:-1}
        this.handleDetails = this.handleDetails.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.setState({index:index});
        this.props.handleChangeCountry(this.props.countries[index]);
    }
    handleEdit() {
        
        this.props.handleEditData(false);
 }
    render() {
        if (this.props.countries.length > 0) {
            const rows = this.props.countries.map((country,index) =>
                <ListGroupItem active={index==this.state.index?true:false} tag="button" action key={index} data-item={index} onClick={this.handleDetails}>
                <ListGroupItemHeading>{country.name}</ListGroupItemHeading>
                <ListGroupItemText>Area: {country.area} Poblac: {country.population}</ListGroupItemText>
                </ListGroupItem>);
        return (
            <ListGroup>
                {rows}
              <Button color="success" onClick={this.handleEdit}>Agregar Pais</Button>
            </ListGroup>);
    }
    return (<p></p>)
    }
}