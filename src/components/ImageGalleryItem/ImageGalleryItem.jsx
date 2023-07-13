import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { previewURL, tags, largeImageURL } = props.picture;

  const handleImgClick = evt => {
    console.log('object', largeImageURL);
    props.onClick(largeImageURL);
  };

  return (
    <li className={styles.gallery_item}>
      <div className={styles.img_wrap}>
        <img className={styles.image} src={previewURL} alt={tags} onClick={handleImgClick}/>
      </div>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  pictures: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};