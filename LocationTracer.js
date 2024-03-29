import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import GetLocation from 'react-native-get-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  location: {
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
});

export default class LocationTracer extends Component {
  state = {
    location: null,
    loading: false,
  };

  _requestLocation = (teste = '') => {
    this.setState({loading: true, location: null});

    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 150000,
    })
      .then(location => {
        this.setState({
          location,
          loading: false,
        });
      })
      .catch(ex => {
        const {code, message} = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
        this.setState({
          location: null,
          loading: false,
        });
      });
  };

  render() {
    const {location, loading} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to MentorDots!</Text>
        <Text style={styles.instructions}>
          To get location, press the button:
        </Text>
        <View style={styles.button}>
          <Button
            disabled={loading}
            title="Get Location"
            onPress={this._requestLocation}
          />
        </View>
        {loading ? <ActivityIndicator /> : null}
        {location ? (
          <Text style={styles.location}>{JSON.stringify(location, 0, 2)}</Text>
        ) : null}
      </View>
    );
  }
}

