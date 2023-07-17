import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import stylesLoader from '../Loader/Loader.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={stylesLoader.backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.modal} >
          {this.props.children}
        </div>
      </div>
      ,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};