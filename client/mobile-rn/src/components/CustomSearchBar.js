import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

import dataStore from '../stores/dataStore';

class CustomSearchBar extends Component {
  render() {
    return (
      <SearchBar
        lightTheme
        onChangeText={query => {
          dataStore.query = query;
        }}
        onClear={() => {}}
        placeholder="Search posts..."
      />
    );
  }
}

export default CustomSearchBar;
