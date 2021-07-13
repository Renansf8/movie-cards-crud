import React from 'react';
import '../styles/searchBar.css';

class SearchBar extends React.Component {
  render() {
    const {
      searchText,
      handleTextChange,
      bookMarkedOnly,
      bookMarkedOnlyChange,
    } = this.props;

    return (
      <form className="search">
        <label>
          Pesquisar:
          <input
            type="text"
            placeholder="Digite o título do filme"
            value={searchText}
            onChange={handleTextChange}
            name="searchText"
          />
        </label>
        <label>
          Mostar somente favoritos:
          <input
            className="checkInput"
            type="checkbox"
            checked={bookMarkedOnly}
            onChange={bookMarkedOnlyChange}
            name="bookmarkedOnly"
          />
        </label>
      </form>
    );
  }
}

export default SearchBar;
