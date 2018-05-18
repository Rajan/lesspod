import React from 'react';
import { Field, Label, Control, Icon, Input, Button } from 'bloomer';
import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';
import UserIcon from 'react-icons/lib/fa/user';
import { Link } from 'react-router-dom';

import FormLogo from './../assets/images/logo-bis.png';
import { blueBg } from './../config/Colors';

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 5,
    width: '30%',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: 15,
  },
};
class RegisterForm extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={FormLogo} alt="lesspod-logo-form" width="50%" />
        </div>
        <Field>
          <Label>Full Name (First Last)</Label>
          <Control hasIcons>
            <Input placeholder="Alex Johnson" isColor="white" isFocused />
            <Icon isSize="small" isAlign="left">
              <UserIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Email</Label>
          <Control hasIcons>
            <Input placeholder="username@example.com" isColor="white" isFocused />
            <Icon isSize="small" isAlign="left">
              <MailIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control hasIcons>
            <Input placeholder="********" type="password" isColor="white" isFocused />
            <Icon isSize="small" isAlign="left">
              <LockIcon />
            </Icon>
          </Control>
        </Field>
        <Field>
          <Label>Retype Password</Label>
          <Control hasIcons>
            <Input placeholder="********" type="password" isColor="white" isFocused />
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
            <Button isColor="info">
              <b>CREATE ACCOUNT</b>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/login">
              <b style={{ color: blueBg }}>LOGIN</b>
            </Link>
          </div>
        </Field>
      </div>
    );
  }
}

export default RegisterForm;
