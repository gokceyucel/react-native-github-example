import React, { Component } from 'react';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const styles = {
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
};

export default class Repositories extends Component {
  openPage(url) {
    this.props.navigator.push({
      screen: 'WebView',
      title: 'Web View',
      passProps: { url }
    })
  }
  render() {
    const repos = this.props.repos;
    const list = repos.map((item, index) => {
      const desc = item.description
        ? <Text style={styles.description}> {item.description} </Text>
        : <View />;
      return (
        <View key={index}>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, item.html_url)}
              underlayColor='transparent'>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars:{item.stargazers_count} </Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
};
