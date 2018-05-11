import React from 'react';
import { Field, Label, Control, Icon, Input, Checkbox, Button } from 'bloomer';
import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 25,
  },
};
class LoginForm extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={FormLogo} alt="lesspod-logo-form" width="50%" />
        </div>
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
          <div style={styles.row}>
            <Checkbox> Remember Me</Checkbox> &nbsp;&nbsp;
            <Link to="/forgot">Forgot Password?</Link>
          </div>
        </Field>
        <Field isHorizontal>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button isColor="info">
              <b>LOGIN</b>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/register">
              <b style={{ color: blueBg }}>CREATE ACCOUNT</b>
            </Link>
          </div>
        </Field>
      </div>
    );
  }
}

export default LoginForm;
