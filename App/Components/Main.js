import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Platform
} from 'react-native';
import api from '../Utils/api';
import Dashboard from './Dashboard';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    ...Platform.select({
      ios: {
        borderWidth: 1,
      },
      android: {
        borderWidth: 0,
      },
    }),
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleSubmit() {
    // update our indicaterIOS spinner
    this.setState({
      isLoading: true
    });
    // fetch data from github
    api.getBio(this.state.username)
      .then(res => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          });
        } else {
          // reroute to the next route passing that github information
          this.props.navigator.push({
            title: res.name || 'Select an Option',
            screen: 'Dashboard',
            passProps: { userInfo: res }
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
  }
  render() {
    const showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    )

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a Github User </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading || false}
          color="#111"
          size="large"
        />
        {showErr}
      </View>
    );
  }
}