import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { blueBg } from './../config/Colors';
import { getUserProfileFromFbase, loginWithFirebase } from '../api/firebase';
import LogoIcon from './../assets/images/icon.png';
import { showAlert } from '../utils/utils';
import userStore from '../stores/userStore';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: blueBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 60,
    height: 60,
  },
});

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onLoginClick = () => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    loginWithFirebase(email, password).then(response => {
      const { error, data } = response;
      if (error) {
        showAlert(error.message, 'error');
        this.setState({ isLoading: false });
      } else {
        getUserProfileFromFbase(data.user.uid).then(res => {
          this.setState({ isLoading: false });
          if (res.error) {
            showAlert(res.error.message, 'error');
          } else {
            userStore.profileData = res.data;
            this.props.history.push('/home');
          }
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image source={LogoIcon} style={styles.logo} />
          </View>
          <Input
            label="Email"
            placeholder="e.g. alexjohnson@gmail.com"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            containerStyle={{ marginBottom: 20 }}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
          <Input
            label="Password"
            Placeholder="********"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            containerStyle={{ marginBottom: 20 }}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              title="LOGIN"
              titleStyle={{ fontWeight: '600' }}
              loading={this.state.isLoading}
              onPress={() => {
                this.onLoginClick();
              }}
              style={{ marginRight: 20 }}
              buttonStyle={{
                backgroundColor: blueBg,
                width: 100,
                height: 45,
                borderRadius: 5,
              }}
            />
            <Button
              title="CREATE ACCOUNT"
              clear
              titleStyle={{ fontWeight: '600', color: blueBg }}
              onPress={() => {
                this.props.history.push('/register');
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
