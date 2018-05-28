
class Home extends React.Component {
    render() {
        return (
            <div className="Home">
             <div className='carousel'><CarouselHeader /></div>
                <h1>Te damos la bienvenida a nuestro sitio!</h1>
                <hr />
                
                <CardGroupHome />
            </div>
        );
    }
}