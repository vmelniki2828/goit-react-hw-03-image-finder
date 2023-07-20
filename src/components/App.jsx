import { Component } from 'react';
import Notiflix from 'notiflix';
import fetchPictures from './Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
});

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    showModal: false,
    loadMore: false,
    error: null,
    searchQuery: '',
    pageNumber: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.pageNumber !== prevState.pageNumber
    ) {
      try {
        const pictures = await fetchPictures(
          this.state.searchQuery,
          this.state.pageNumber
        );

        this.setState({ loadMore: true });
        if (pictures.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ loadMore: false });
        }

        if (pictures.length < 12) {
          this.setState({ loadMore: false });
        }

        this.setState({
          pictures: [ ...this.state.pictures, ...pictures],
        });
      } catch (error) {
        this.setState({ error });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmitHandler = query => {
    this.setState({ searchQuery: query, pageNumber: 1 });
  };

  imageClickHandler = url => {
    this.setState({ modalURL: url });
    this.toggleModal();
  };

  loadMoreHandler = pageNumber => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { loadMoreHandler } = this;
    const { pictures, modalURL, showModal, isLoading, loadMore } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <div className="gallery-wrap">
          <ImageGallery>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                picture={picture}
                onClick={this.imageClickHandler}
              />
            ))}
          </ImageGallery>
          {loadMore && (
            <Button
              loadMoreHandler={loadMoreHandler}
              page={this.state.pageNumber}
            />
          )}
        </div>
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalURL} alt={pictures.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
