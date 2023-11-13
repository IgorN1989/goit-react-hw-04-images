import Modal from 'react-modal';
import { ModalContainer, ModalImage } from './Modal.styled';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 1200,
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ModalComponent = ({ isOpen, onCloseModal, image, alt }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal} style={customStyles}>
    <ModalContainer>
      <ModalImage src={image} alt={alt} />
    </ModalContainer>
  </Modal>
);
