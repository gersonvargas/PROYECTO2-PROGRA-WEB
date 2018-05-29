
 var Carousel=Reactstrap.Carousel;
 var CarouselItem=Reactstrap.CarouselItem;
 var CarouselControl=Reactstrap.CarouselControl;
 var CarouselIndicators=Reactstrap.CarouselIndicators;
 var CarouselCaption=Reactstrap.CarouselCaption;


const items = [
  {
    src: 'images/house.png',
    altText: ' - Hospedaje disponible -',
    caption: 'Hospedaje'
  },
  {
    src: 'images/edificio.jpg',
    altText: '- Apartamentos disponibles -',
    caption: 'Disponibilidad'
  },
  {
    src: 'images/apartamentos.png',
    altText: '- Comodidad -',
    caption: 'Comodidad'
  }
];

class CarouselHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem 
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} className="imgCarou" />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel 
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl  direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl  direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
