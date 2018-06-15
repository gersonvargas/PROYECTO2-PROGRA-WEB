var Carousel = Reactstrap.Carousel;
var CarouselItem = Reactstrap.CarouselItem;
var CarouselControl = Reactstrap.CarouselControl;
var CarouselIndicators = Reactstrap.CarouselIndicators;
var CarouselCaption = Reactstrap.CarouselCaption;


const charts = [
    {
        caption: 'Propiedades Publicadas: Tipo',
        render: 'ColumnChart',
        dataType: 'tipoPropiedad'
    },
    {
        caption: 'Propiedades Publicadas: Disponibilidad',
        render: 'PieChart',
        dataType: 'disponibilidadPropiedad'
    },
    {
        caption: 'Propiedades Publicadas: Provincia',
        render: 'AreaChart',
        dataType: 'provinciaPropiedad'
    },
    {
        caption: 'Clientes Potenciales: Tipo Buscado',
        render: 'BarChart',
        dataType: 'propiedadCliente'
    },
    {
        caption: 'Clientes Potenciales: Provincia',
        render: 'LineChart',
        dataType: 'provinciaCliente'
    },
    {
        caption: 'Precios: Provincia',
        render: 'LineChart',
        dataType: 'precioProvincia'
    },
    {
        caption: 'Precios: Tipo Propiedad',
        render: 'LineChart',
        dataType: 'precioPropiedad'
    },
    {
        caption: 'Precios: Cantidad Habitaciones',
        render: 'LineChart',
        dataType: 'precioHabitaciones'
    },
    {
        caption: 'Precios: Cantidad Pisos',
        render: 'LineChart',
        dataType: 'precioPisos'
    }
];

class CarouselData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTipoPropiedad: {},
            dataDisponibilidadPropiedad: {},
            dataProvinciaPropiedad: {},

            dataPropiedadCliente: {},
            dataProvinciaCliente: {},

            dataPrecioProvincia: {},
            dataPrecioPropiedad: {},
            dataPrecioHabitaciones: {},
            dataPrecioPisos: {},

            activeIndex: 0,
            time: Date.now(),
            showLoader: false
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.reloadData = this.reloadData.bind(this);

        var self = this;
        window.setInterval(function(){
            self.reloadData();
        }, 5000);

    }


    reloadData() {
        //fetch all data from database
        this.setState({showLoader:true});
        fetch('api/index.php/propiedad/data?metodo=dataCharts')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({dataTipoPropiedad:data.msg.dataTipoPropiedad});
                this.setState({dataDisponibilidadPropiedad:data.msg.dataDisponibilidadPropiedad});
                this.setState({dataProvinciaPropiedad:data.msg.dataProvinciaPropiedad});

                this.setState({dataPropiedadCliente:data.msg.dataPropiedadCliente});
                this.setState({dataProvinciaCliente:data.msg.dataProvinciaCliente});

                this.setState({dataPrecioProvincia:data.msg.dataPrecioProvincia});
                this.setState({dataPrecioPropiedad:data.msg.dataPrecioPropiedad});
                this.setState({dataPrecioHabitaciones:data.msg.dataPrecioHabitaciones});
                this.setState({dataPrecioPisos:data.msg.dataPrecioPisos});

                this.setState({showLoader:false});
                this.forceUpdate();
            });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === charts.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? charts.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render() {
        const {activeIndex} = this.state;

        const slides = charts.map((item) => {

            var dataType = '';
            switch (item.dataType){
                case "tipoPropiedad":
                    dataType = this.state.dataTipoPropiedad;
                    break;
                case "disponibilidadPropiedad":
                    dataType = this.state.dataDisponibilidadPropiedad;
                    break;
                case "provinciaPropiedad":
                    dataType = this.state.dataProvinciaPropiedad;
                    break;
                case "propiedadCliente":
                    dataType = this.state.dataPropiedadCliente;
                    break;
                case "provinciaCliente":
                    dataType = this.state.dataProvinciaCliente;
                    break;
                case "precioProvincia":
                    dataType = this.state.dataPrecioProvincia;
                    break;
                case "precioPropiedad":
                    dataType = this.state.dataPrecioPropiedad;
                    break;
                case "precioHabitaciones":
                    dataType = this.state.dataPrecioHabitaciones;
                    break;
                case "precioPisos":
                    dataType = this.state.dataPrecioPisos;
                    break;
                default: break;
            }

            var renderChart = '';
            switch (item.render){
                case "ColumnChart":
                    renderChart = <ColumnChart data={dataType}/>;
                    break;
                case "PieChart":
                    renderChart = <PieChart data={dataType}/>;
                    break;
                case "AreaChart":
                    renderChart = <AreaChart data={dataType}/>;
                    break;
                case "BarChart":
                    renderChart = <BarChart data={dataType}/>;
                    break;
                case "LineChart":
                    renderChart = <LineChart data={dataType}/>;
                    break;
                default: break;
            }

            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <div className="divCarou">
                        {renderChart}
                    </div>

                    <CarouselCaption captionText={item.caption}/>
                </CarouselItem>
            );
        });

        return (
            <div>

                <div style={{display: this.state.showLoader ? 'block' : 'none' }}>
                    Actualizando datos...
                    <img src='images/loader.gif' alt="Loader"  className="loader"/>
                </div>

            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={charts} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
            </Carousel>
            </div>
        );
    }
}
