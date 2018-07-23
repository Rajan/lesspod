import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import HTML from 'react-native-render-html';

import { blueBg } from '../config/Colors';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorText: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
  contentText: {
    fontSize: 18,
  },
  actionText: {
    color: blueBg,
    fontSize: 16,
  },
  tag: {
    borderRadius: 25,
    borderColor: blueBg,
    borderWidth: 2,
    padding: 10,
    minWidth: 50,
    margin: 5,
  },
};

class ViewPostScreen extends Component {
  render() {
    const { id, title, content, tags, author, createdAt } = this.props.history.location.state.post;
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Text style={styles.authorText}>
          {dayjs(createdAt).format('MMMM D, YYYY')} . {author}
        </Text>
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <HTML html={content} imagesMaxWidth={Dimensions.get('window').width * 0.75} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {tags.split(' ').map(t => (
            <View style={styles.tag} key={t}>
              <Text>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default ViewPostScreen;
