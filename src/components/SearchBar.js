import React from 'react';
import '../styles/searchBar.css';

class SearchBar extends React.Component {
  render() {
    const { searchText, handleTextChange } = this.props;

    return (
      <form className="search">
        <label>
          Pesquisar:
          <input
            type="text"
            placeholder="Digite o título do filme"
            value={searchText}
            onChange={handleTextChange}
          />
        </label>
      </form>
    );
  }
}

export default SearchBar;
