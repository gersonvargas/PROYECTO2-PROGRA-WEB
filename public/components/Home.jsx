class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <h1>Te damos la bienvenida a nuestro sitio.</h1>
                <hr />
                <div className='carousel carouselCustom'>
                    <CarouselHeader />
                </div>
                <hr />
                <CardGroupHome />
				 <li class="nav-item dropdown no-arrow mx-1">
          <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-envelope fa-fw"></i>
            <span class="badge badge-danger">7</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
            </div>
        );
    }
}