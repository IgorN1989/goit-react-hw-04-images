import { Component } from 'react';
import { ModalComponent } from 'components/Modal/Modal';
import { ImageContainer, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <ImageContainer>
        <Image src={webformatURL} alt={tags} onClick={this.openModal} />

        <ModalComponent
          isOpen={isModalOpen}
          onCloseModal={this.closeModal}
          image={largeImageURL}
          alt={tags}
        />
      </ImageContainer>
    );
  }
}
