import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Timer from 'react-native-timer';

class Chronometer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      currentTime: 0,
      isRunning: false,
    };
  }

  componentWillUnmount() {
    Timer.clearInterval(this);
  }

  startChronometer = () => {
    this.setState({
      startTime: new Date(),
      isRunning: true,
    });

    Timer.setInterval(this, 'updateTimer', () => {
      const currentTime = new Date() - this.state.startTime;
      this.setState({ currentTime });
    }, 10);
  }

  stopChronometer = () => {
    Timer.clearInterval(this, 'updateTimer');
    this.setState({ isRunning: false });
  }

  resetChronometer = () => {
    Timer.clearInterval(this, 'updateTimer');
    this.setState({ startTime: null, currentTime: 0, isRunning: false });
  }

  formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  }

  render() {
    const { currentTime, isRunning } = this.state;

    return (
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          {this.formatTime(currentTime)}
        </Text>
        {!isRunning ? (
          <Button title="Start" onPress={this.startChronometer} />
        ) : (
          <Button title="Stop" onPress={this.stopChronometer} />
        )}
        <Button title="Reset" onPress={this.resetChronometer} />
      </View>
    );
  }
}

export default Chronometer;
