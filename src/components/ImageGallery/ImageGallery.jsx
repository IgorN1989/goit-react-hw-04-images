import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => (
  <Gallery>
    {images.map(image => (
      <li key={image.id}>
        <ImageGalleryItem image={image} />
      </li>
    ))}
  </Gallery>
);
