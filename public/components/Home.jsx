class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <h1>Te damos la bienvenida a nuestro sitio.</h1>
                <hr/>
                <div className='carousel carouselCustom'>
                    <CarouselHeader/>
                </div>
                <hr/>
                <CardGroupHome/>
            </div>
        );
    }
}