import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({loadMoreHandler}) => {

  return (
    <button type="button" className={styles.loadMoreButton} onClick={loadMoreHandler}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  props: PropTypes.shape({
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};