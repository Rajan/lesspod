import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { blueBg } from './../config/Colors';
import { addUserProfileToFbase, registerWithFirebase } from '../api/firebase';
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

class RegisterScreen extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
  };

  onRegisterClick = () => {
    if (
      this.state.name &&
      this.state.password &&
      this.state.name.length > 0 &&
      this.state.password === this.state.confirmPassword
    ) {
      this.setState({ isLoading: true });
      registerWithFirebase(this.state.email, this.state.password).then(response => {
        const { error, data } = response;
        if (error) {
          showAlert(error.message, 'error');
          this.setState({ isLoading: false });
        } else {
          const profileData = {
            id: data.user.uid,
            email: this.state.email,
            first: this.state.name.split(' ')[0],
            last: this.state.name.split(' ')[1] ? this.state.name.split(' ')[1] : '',
          };
          this.setState({ isLoading: true });
          addUserProfileToFbase(profileData).then(res => {
            this.setState({ isLoading: false });
            if (res.error) {
              showAlert(res.error.message);
            } else {
              userStore.profileData = res.data;
              this.props.history.push('/home');
            }
          });
        }
      });
    } else if (this.state.password.length > 0 && this.state.password !== this.state.confirmPassword) {
      showAlert('Passwords do not match!');
      this.setState({ isLoading: false });
    } else {
      showAlert('Enter all details');
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Input
            label="Full Name (First Last)"
            placeholder="e.g. alexjohnson@gmail.com"
            leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
            containerStyle={{ marginBottom: 20 }}
            autoCapitalize="none"
            onChangeText={name => this.setState({ name })}
          />
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

          <Input
            label="Retype Password"
            Placeholder="********"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            containerStyle={{ marginBottom: 20 }}
            autoCapitalize="none"
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            secureTextEntry
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              title="CREATE ACCOUNT"
              titleStyle={{ fontWeight: '600' }}
              loading={this.state.isLoading}
              onPress={() => {
                this.onRegisterClick();
              }}
              style={{ marginRight: 20 }}
              buttonStyle={{
                backgroundColor: blueBg,
                width: 200,
                height: 45,
                borderRadius: 5,
              }}
            />
            <Button
              title="LOGIN"
              titleStyle={{ fontWeight: '600', color: blueBg }}
              buttonStyle={{
                backgroundColor: '#FFF',
                borderWidth: 0,
                borderRadius: 5,
              }}
              borderRadius={5}
              onPress={() => {
                this.props.history.push('/');
              }}
              fontWeight="bold"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default RegisterScreen;
