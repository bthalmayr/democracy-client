/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

console.log(Platform.OS);

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
  web: "Live Realoading is enabled"
});

const welcomePlatform = () => {
  switch (Platform.OS) {
    case "web":
      return `Welcome to React for Web!`;
    default:
      return `Welcome to React Native!`;
  }
};

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./assets/images/logo.png")}
          style={styles.image}
        />
        <Text style={styles.welcome}>{welcomePlatform()}</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  image: {
    height: 40,
    marginVertical: 10,
    width: 40
  }
});
