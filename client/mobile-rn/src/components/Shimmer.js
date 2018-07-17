import React from 'react';
import { Text } from 'react-native';
import Shimmer from 'react-native-shimmer';

const CustomShimmer = props => (
  <Shimmer>
    <Text>Loading...</Text>
  </Shimmer>
);

export default CustomShimmer;
