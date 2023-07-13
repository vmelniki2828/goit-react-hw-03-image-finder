import { Component } from 'react';
import fetchPictures from './Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

export class App extends Component {
  state = {
    pictures: [],
    searchQuery: 'a',
    pageNumber: 1,
    error: null,
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

        this.setState({
          pictures: [...this.state.pictures, ...pictures],
        });
      } catch (error) {
        this.setState({ error });
        console.log(error);
      }
    }
  }

  formSubmitHandler = query => {
    this.setState({ searchQuery: query, pageNumber: 1, picture: [] });
  };

  render() {
    const { pictures } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <div className="gallery-wrap">
          <ImageGallery>
            {pictures.map(picture => (
              <ImageGalleryItem key={picture.id} picture={picture} />
            ))}
          </ImageGallery>
        </div>

        {/* <ImageGalleryItem />
        <Loader />
        <Button />
        <Modal /> */}
      </div>
    );
  }
}
