import React from 'react';
import ImageGallery from 'react-image-gallery';
import { view } from 'react-easy-state';

class MyGallery extends React.Component {

  render() {

    const images = [
      {
        original: 'https://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'https://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'https://lorempixel.com/1000/600/sports/2/',
        thumbnail: 'https://lorempixel.com/250/150/sports/2/'
      },
      {
        original: 'https://lorempixel.com/1000/600/business/1/',
        thumbnail: 'https://lorempixel.com/250/150/business/1/'
      }
    ]

    return (
      <ImageGallery items={images} />
      // 'THIS IS GALLERY'
    );
  }

};

export default view(MyGallery);