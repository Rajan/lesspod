import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { logoColor } from './../config/Colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    flex: 1,
  },
});

const defaultValues = {
  image: { source: require('./../assets/images/icon.png'), style: { width: 90, height: 90 } },
  color: logoColor,
  numPulses: 1,
  speed: 20,
  duration: 2000,
};

export default class Pulse extends Component {
  constructor(props) {
    super(props);

    const { style, image, color, numPulses, diameter, speed, duration } = this.props;

    this.state = {
      started: false,
      style,
      image: image || defaultValues.image,
      color: color || defaultValues.color,
      numPulses: numPulses || defaultValues.numPulses,
      maxDiameter: diameter || 2 * defaultValues.image.style.width,
      speed: speed || defaultValues.speed,
      duration: duration || defaultValues.duration,
      pulses: [],
    };
  }

  mounted = true;

  componentDidMount() {
    const { numPulses, duration, speed } = this.state;

    this.setState({ started: true });

    let a = 0;
    while (a < numPulses) {
      this.createPulseTimer = setTimeout(() => {
        this.createPulse(a);
      }, a * duration);

      a++;
    }

    this.timer = setInterval(() => {
      this.updatePulse();
    }, speed);
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.createPulseTimer);
    clearInterval(this.timer);
  }

  createPulse = pKey => {
    if (this.mounted) {
      const pulses = this.state.pulses;

      const pulse = {
        pulseKey: pulses.length + 1,
        diameter: 0,
        opacity: 0.5,
      };

      pulses.push(pulse);

      this.setState({ pulses });
    }
  };

  updatePulse = () => {
    if (this.mounted) {
      const pulses = this.state.pulses.map((p, i) => {
        const maxDiameter = this.state.maxDiameter;
        const newDiameter = p.diameter > maxDiameter ? 0 : p.diameter + 2;
        const centerOffset = (maxDiameter - newDiameter) / 2;
        const opacity = Math.abs(newDiameter / this.state.maxDiameter - 1);

        const pulse = {
          pulseKey: i + 1,
          diameter: newDiameter,
          opacity: opacity > 0.5 ? 0.5 : opacity,
          centerOffset,
        };

        return pulse;
      });

      this.setState({ pulses });
    }
  };

  render() {
    const { style, image, maxDiameter, color, started, pulses } = this.state;
    const wrapperStyle = [styles.container, style];
    const containerStyle = {
      width: maxDiameter,
      height: maxDiameter,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <View style={wrapperStyle}>
        {started && (
          <View style={containerStyle}>
            {pulses.map(pulse => (
              <View
                key={pulse.pulseKey}
                style={[
                  styles.pulse,
                  {
                    backgroundColor: 'white',
                    width: pulse.diameter,
                    height: pulse.diameter,
                    opacity: pulse.opacity,
                    borderRadius: pulse.diameter / 2,
                    top: pulse.centerOffset,
                    left: pulse.centerOffset,
                    borderColor: color,
                    borderWidth: 3,
                  },
                ]}
              />
            ))}
            {image && <Image style={image.style} source={image.source} />}
          </View>
        )}
      </View>
    );
  }
}
