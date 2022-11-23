import { useState, useEffect } from 'react';

const Carousel = ({items}) => {
  // console.log(items);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide? items.length - 1 : currentIndex -1;
    setCurrentIndex(newIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length -1;
    const newIndex = isLastSlide? 0 : currentIndex +1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className="carousel-container">
      <div className="thumbs-wrapper">
        {items.map(
          (item, itemIndex) => (
            <div 
              key={'thumbnail-'+itemIndex} 
              className={`thumbnail ${itemIndex === currentIndex? 'selected': ''}`} 
              alt={item.alt}
              onClick={() => {setCurrentIndex(itemIndex)}}
              style={{backgroundImage: `url(${item.thumbUrl})`}} 
            ></div>
          )
        )}
      </div>
      <div className="slider-wrapper">
        <div 
          className='slide'
          style={{backgroundImage: `url(${items[currentIndex].thumbUrl})`}} 
          key={items[currentIndex].alt}
        />
        <div className="arrows-wrapper">
          <div className="arrow left" onClick={goToPrevious}> &lsaquo; </div>
          <div className="arrow right" onClick={goToNext}> &rsaquo; </div>
        </div>
      </div>
      
      <div className="bullets-wrapper">
        {items.map(
          (item, itemIndex) => (
            <div 
              key={'bullet-'+itemIndex} 
              className={`bullet ${itemIndex === currentIndex? 'selected': ''}`} 
              alt={item.alt}
              onClick={() => {setCurrentIndex(itemIndex)}}
            > &#x2022; </div>
          )
        )}
      </div>
    </div>
  )
}

export default Carousel;

