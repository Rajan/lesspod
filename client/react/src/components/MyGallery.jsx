import React from 'react';
import ImageGallery from 'react-image-gallery';
import { view } from 'react-easy-state';

class MyGallery extends React.Component {

  render() {

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/sports/2/',
        thumbnail: 'http://lorempixel.com/250/150/sports/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

    return (
      <ImageGallery items={images} />
      // 'THIS IS GALLERY'
    );
  }

};

export default view(MyGallery);