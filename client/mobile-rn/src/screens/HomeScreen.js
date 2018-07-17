import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { logoutFirebase } from '../api/firebase';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Logout"
          titleStyle={{ fontWeight: '600' }}
          buttonStyle={{
            borderWidth: 0,
            borderRadius: 5,
          }}
          borderRadius={5}
          onPress={() => {
            logoutFirebase();
          }}
          fontWeight="bold"
        />
      </View>
    );
  }
}

export default HomeScreen;
