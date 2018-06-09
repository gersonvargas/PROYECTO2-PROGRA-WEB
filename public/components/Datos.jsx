class Datos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        document.title = 'Datos del Sistema'
    }

    render() {
        return (
            <div className='carousel carouselCustom'>
                <h2>Visualizador de datos del sistema</h2>
                <small>Los datos se actualizan cada 5 segundos en tiempo real.</small>
                <hr/>
                <CarouselData />
            </div>
        );
    }
}
