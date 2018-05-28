var Table = Reactstrap.Table;

class ListaPropiedades extends React.Component {
    constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleChangePropiedad(this.props.propiedades[index]);
    }
    render() {
        if (this.props.propiedades.length > 0) {
            const rows = this.props.propiedades.map((item, index) =>
                <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{item.TIPO_DISPONIBILIDAD}</td>
                    <td>{item.FECHA_PUBLICACION}</td>
                    <td>{item.TIPO_PROPIEDAD}</td>
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