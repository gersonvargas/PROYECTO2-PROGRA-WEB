var Table = Reactstrap.Table;

class ListaPropiedades extends React.Component {
    constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleChangeCountry(this.props.countries[index]);
    }
    render() {
        if (this.props.countries.length > 0) {
            const rows = this.props.countries.map((country, index) =>
                <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{country.numero}</td>
                    <td>{country.fecha}</td>
                    <td>{country.cliente}</td>
                </tr>);
            return (
                <Table striped>
                    <thead><tr><th>Numero</th><th>Fecha</th><th>Cliente</th>
                    </tr></thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>);
        }
        return (<p></p>)
    }
}