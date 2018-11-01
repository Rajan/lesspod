import React, { Component } from "react";
import Slider from "react-slick";

import "../assets/slick-carousel/slick/slick.css"; 
import "../assets/slick-carousel/slick/slick-theme.css";
import "../assets/slick-index.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src="https://lorempixel.com/1000/600/sports/1/" />
          </div>
          <div>
            <img src="https://lorempixel.com/1000/600/sports/2/" />
          </div>
          <div>
            <img src="https://lorempixel.com/1000/600/sports/3/" />
          </div>
          <div>
            <img src="https://lorempixel.com/1000/600/sports/6/" />
          </div>
          <div>
            <img src="https://lorempixel.com/1000/600/sports/5/" />
          </div>
        </Slider>
      </div>
    );
  }
}