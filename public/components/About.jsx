class About extends React.Component {
    componentWillMount() {
        document.title = 'About'
    }
    render() {
        return (
                <div className="About">
                    <div className='row'>
                
                        <div className='col-md-6 mt-3 mb-3'>
                            <img src='images/About.jpg' className="img-fluid" alt="about us" id="" />
                        </div>
                
                        <div className='col-md-6 mt-3'>
                            <h1>Nuestro sitio:</h1>
                            <p><small>Look it, find it...</small></p>
                            <p>Fundado el 20 de mayo de 2018, nuestro sitio brinda 
                                el servicio de bienes raíces, una fuente confiable, en donde puede encontrar
                                su casa, apartamento sonñado.</p>
                            <p>Trabajamos para brindar un excelente servicio e información altamente confiable.</p>
                            <h3>Nuestros desarrolladores:</h3>
                            <CardGroupAbout />
                        </div>
                
                       
                    </div>
                </div>
                );
    }
}