import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={styles.gallery}>{children}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired
};