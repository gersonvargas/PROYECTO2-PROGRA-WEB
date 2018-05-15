import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import slide1 from './images/banner-jobs.jpg';
import slide2 from './images/banner-jobs2.jpg';
import slide3 from './images/banner-jobs3.jpg';
import slide4 from './images/banner-jobs4.jpg';
import slide5 from './images/banner-jobs5.jpg';

class Carrusel extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    onSelect= (active,direction)=>{
        console.log(`active=${active} && direction=${direction}`);
    }
    slideNext=()=>{
      this.slider.slideNext();
    }
    slidePrev=()=>{
      this.slider.slidePrev();
    }
    goToSlide=()=>{
      this.slider.goToSlide(4);
    }
    _changeIcon=()=>{
      let {leftIcon,rightIcon}=this.state;
      if(leftIcon && rightIcon){
        this.setState({
          leftIcon:undefined,
          rightIcon:undefined
        });
      }
      else{
        this.setState({
          leftIcon:<span className="glyphicon glyphicon-glass"></span>,
          rightIcon:<span className="glyphicon glyphicon-music"></span>
        });
      }
    }
    render() {
      let {leftIcon,rightIcon}=this.state;
      return(
        <div className="container-fluid">
          <div className="row">
            
            <div className="col-md-12">
              <React_Bootstrap_Carousel
                animation={true}
                slideshowSpeed={5000}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                onSelect={this.onSelect}
                ref={r=>this.slider=r}
                className="carousel-fade"
              >
                <div style={{height:300}}>
                  <img
                    style={{width:"100%",height:"100%"}}
                    src={slide1}
                  />
                  <div className="carousel-caption">
                    - The best website to find a job - 
                  </div>
                </div>
                <div style={{height:300}}>
                  <img
                    style={{width:"100%",height:"100%"}}
                    src={slide2}
                  />
                  <div className="carousel-caption">
                    - Highly qualified jobs -
                  </div>
                </div>
                <div style={{height:300}}>
                  <img
                    style={{width:"100%",height:"100%"}}
                    src={slide3}
                  />
                  <div className="carousel-caption">
                    - Globally recognized companies -
                  </div>
                </div>
                <div style={{height:300}}>
                  <img
                    style={{width:"100%",height:"100%"}}
                    src={slide4}
                  />
                  <div className="carousel-caption">
                    - Get the best results -
                  </div>
                </div>
                <div style={{height:300}}>
                  <img
                    style={{width:"100%",height:"100%"}}
                    src={slide5}
                  />
                  <div className="carousel-caption">
                    - Here you can find all types of jobs -
                  </div>
                </div>
              </React_Bootstrap_Carousel>
            </div>
          </div>
        </div>
      );
    }
};

export default Carrusel;
