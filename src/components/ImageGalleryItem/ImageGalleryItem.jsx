import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { previewURL, tags } = props.picture;

  return (
    <li className={styles.gallery_item}>
      <div className={styles.img_wrap}>
        <img className={styles.image} src={previewURL} alt={tags} />
      </div>
    </li>
  );
};

export default ImageGalleryItem;
