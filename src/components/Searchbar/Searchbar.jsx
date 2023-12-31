import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
    this.resetForm();
  };

  handleChange = evt => {
    const input = evt.currentTarget.value;
    this.setState({ query: input });
  };

  resetForm() {
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
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
