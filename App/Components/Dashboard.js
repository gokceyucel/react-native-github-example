import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import api from '../Utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else if (btn === 2) {
      obj.backgroundColor = '#758bF4';
    }

    return obj;
  }
  goToProfile() {
    console.log('Going to Profile Page');
    this.props.navigator.push({
      title: 'Profile',
      screen: 'Profile',
      passProps: { userInfo: this.props.userInfo }
    });
  }
  goToRepos() {
    console.log('Going to Repos Page');
    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          title: 'Repos',
          screen: 'Repositories',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });

  }
  goToNotes() {
    console.log('Going to Notes Page');
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.userInfo.avatar_url }} style={styles.image} />
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
