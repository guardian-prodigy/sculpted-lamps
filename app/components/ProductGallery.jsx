import React, {useState} from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {motion} from 'framer-motion';
import {Image} from '@shopify/hydrogen';

export const ProductGallery = ({media, className}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === media.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? media.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className={className}>
      <div className="carousel">
        <div className="carousel-grid">
          <div className="arrow arrow-left" onClick={handlePrevSlide}>
            <FiChevronLeft />
          </div>
          <div className="image-container">
            {media.map((med, i) => {
              const image = med.__typename === 'MediaImage' ? med.image : null;
              const altText =
                med.__typename === 'MediaImage'
                  ? med.alt || 'Product image'
                  : 'Product image';

              return (
                <motion.div
                  key={med.id || image?.id}
                  className={`carousel-image ${
                    currentSlide === i ? 'active' : ''
                  }`}
                  initial={{opacity: 0, x: i > currentSlide ? 100 : -100}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: i > currentSlide ? 100 : -100}}
                  transition={{duration: 0.5}}
                >
                  {image && (
                    <div className="image-wrapper">
                      <Image
                        data={image}
                        alt={altText}
                        className={`image ${isLoading ? 'skeleton' : ''}`}
                        onLoad={handleImageLoad}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="arrow arrow-right" onClick={handleNextSlide}>
            <FiChevronRight />
          </div>
          <div className="dots" />
        </div>
        {media.length > 1 && (
          <div className="dots">
            {media.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
