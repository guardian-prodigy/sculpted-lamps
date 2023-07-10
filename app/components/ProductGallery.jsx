import {useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media, className}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (media.length > 0) {
      setSelectedImage(media[0]);
    }
  }, [media]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!media.length) {
    return null;
  }

  return (
    <div className={className}>
      <div className="main-image-container swimlane">
        {selectedImage && selectedImage.__typename === 'MediaImage' && (
          <Image
            data={selectedImage.image}
            alt={selectedImage.alt || 'Product image'}
            className={`object-cover w-full h-full aspect-square fadeIn main-image ${
              isLoading ? 'skeleton' : ''
            }`}
            onLoad={handleImageLoad}
          />
        )}
        {isLoading && <div className="skeleton-animation" />}
      </div>
      <div className="thumbnail-carousel">
        <div className="thumbnails">
          {media.map((med, i) => {
            const image = med.__typename === 'MediaImage' ? med.image : null;

            const altText =
              med.__typename === 'MediaImage'
                ? med.alt || 'Product image'
                : 'Product image';

            return (
              <div
                key={med.id || image?.id}
                onClick={() => handleThumbnailClick(med)}
                className={`thumbnail ${selectedImage === med ? 'active' : ''}`}
              >
                {image && (
                  <Image
                    data={image}
                    alt={altText}
                    className={`thumbnail-image ${isLoading ? 'skeleton' : ''}`}
                    onLoad={handleImageLoad}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
