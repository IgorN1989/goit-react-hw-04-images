import { useState } from 'react';
import { ModalComponent } from 'components/Modal/Modal';
import { ImageContainer, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageContainer>
      <Image src={webformatURL} alt={tags} onClick={openModal} />

      <ModalComponent
        isOpen={isModalOpen}
        onCloseModal={closeModal}
        image={largeImageURL}
        alt={tags}
      />
    </ImageContainer>
  );
};
