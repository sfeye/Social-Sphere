import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form method="get" className='search'>
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="filter users"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;