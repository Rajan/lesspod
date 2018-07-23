import React from 'react';

const styles = {
  container: {
    minWidth: 350,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 25,
  },
  subText: {
    fontSize: 12,
    color: 'grey',
  },
};
class LandingPageSettingsForm extends React.Component {
  state = {
    isSaving: false,
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
    // const { isSaving } = this.state;

    return (
      <div className="box" style={styles.container}>
        <div>Coming Soon</div>
      </div>
    );
  }
}

export default LandingPageSettingsForm;
