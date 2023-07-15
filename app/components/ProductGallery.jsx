import React, {useEffect, useState, useMemo, useRef} from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {motion} from 'framer-motion';
import {Image} from '@shopify/hydrogen';
import {SkeletonLoader} from './index';

export const ProductGallery = ({media, selectedVariantImage, className}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);

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

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDifference = touchStartXRef.current - touchEndX;

    if (touchDifference > 50) {
      handleNextSlide();
    } else if (touchDifference < -50) {
      handlePrevSlide();
    }
  };

  useEffect(() => {
    const imagePromises = media.map((med) => {
      const image = med.__typename === 'MediaImage' ? med.image : null;
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = image?.url;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      });
  }, [media]);

  useEffect(() => {
    if (selectedVariantImage && media.length > 0) {
      setCurrentSlide(0);
    }
  }, [selectedVariantImage, media]);

  const renderedMedia = useMemo(() => {
    const updatedMedia = [...media];
    if (selectedVariantImage) {
      updatedMedia[0] = {
        ...updatedMedia[0],
        __typename: 'MediaImage',
        image: selectedVariantImage,
      };
    }
    return updatedMedia;
  }, [media, selectedVariantImage]);

  return (
    <div className={className}>
      <div
        className="carousel"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-grid">
          <div className="arrow arrow-left" onClick={handlePrevSlide}>
            <FiChevronLeft />
          </div>
          <div className="image-container">
            {renderedMedia.map((med, i) => {
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
                  <div className="image-wrapper">
                    {!isLoading && (
                      <Image
                        data={image}
                        alt={altText}
                        className={`image ${
                          i === 0 && selectedVariantImage ? 'variant-image' : ''
                        }`}
                        onLoad={handleImageLoad}
                        withLoader // Load all images in advance
                        sizes="(min-width: 1100px) 550px, (min-width: 990px) calc(55.0vw - 10rem), (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw / 1 - 4rem)"
                      />
                    )}
                    {isLoading && <SkeletonLoader />}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="arrow arrow-right" onClick={handleNextSlide}>
            <FiChevronRight />
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
    </div>
  );
};
