import React from 'react';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  handleChange = evt => {
    const input = evt.currentTarget.value;
    this.setState({ query: input });
  };

  reset() {
    this.setState({ query: '' });
  }

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.search_btn}>
            <span>
              <BsSearch />
            </span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
