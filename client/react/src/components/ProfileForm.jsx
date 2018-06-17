import React from 'react';
import { Field, Label, Control, Icon, Input, Button } from 'bloomer';
import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';
import UserIcon from 'react-icons/lib/fa/user';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import FormLogo from './../assets/images/logo-bis.png';
import { updateDataInFbase } from './../api/firebase';
import { USERS_COLLECTION } from './../config/Constants';

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 5,
    width: '30%',
    minWidth: 350,
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: 15,
  },
};
class ProfileForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSuccess = data => {
    this.props.history.push('/home', { user: data });
  };
  onFailure = () => console.log('failure callback');

  onSaveClick = () => {
    if (this.state.password.length > 5 && this.state.password === this.state.confirmPassword) {
      firebase
        .auth()
        .currentUser.updatePassword(this.state.password)
        .then(() => {
          const data = {
            email: this.state.email,
            first: this.state.name.split(' ')[0],
            last: this.state.name.split(' ')[1],
          };
          updateDataInFbase(USERS_COLLECTION, this.user.id, data, this.onSuccess, this.onFailure);
          console.log('password changed in firebase');
        })
        .catch(error => {
          console.log('error in changing password: ', error);
        });
    }
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={FormLogo} alt="lesspod-logo-form" width="50%" />
        </div>
        <Field>
          <Label>Full Name (First Last)</Label>
          <Control hasIcons>
            <Input
              onChange={this.handleInputChange}
              name="name"
              value={this.state.name}
              placeholder="Alex Johnson"
              isColor="white"
              isFocused
            />
            <Icon isSize="small" isAlign="left">
              <UserIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Email</Label>
          <Control hasIcons>
            <Input
              onChange={this.handleInputChange}
              name="email"
              value={this.state.email}
              placeholder="username@example.com"
              isColor="white"
              isFocused
            />
            <Icon isSize="small" isAlign="left">
              <MailIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control hasIcons>
            <Input
              onChange={this.handleInputChange}
              name="password"
              placeholder="********"
              type="password"
              isColor="white"
              isFocused
            />
            <Icon isSize="small" isAlign="left">
              <LockIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Retype Password</Label>
          <Control hasIcons>
            <Input
              onChange={this.handleInputChange}
              name="confirmPassword"
              placeholder="********"
              type="password"
              isColor="white"
              isFocused
            />
            <Icon isSize="small" isAlign="left">
              <LockIcon />
            </Icon>
          </Control>
        </Field>
        <Field isHorizontal>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button isColor="info" onClick={this.onSaveClick}>
              <b>SAVE PROFILE</b>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/home">
              <b style={{ color: '#000000' }}>CANCEL</b>
            </Link>
          </div>
        </Field>
      </div>
    );
  }
}

export default withRouter(ProfileForm);
