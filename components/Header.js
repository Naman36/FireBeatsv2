import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsPage from "../screens/ProductsPage";

const Stack = createNativeStackNavigator();
const Header = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.photoURL }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 150,
          justifySelf: "flex-start",
          alignSelf: "flex-start",
        }}
      ></Image>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "flex-start",
          padding: 10,
        }}
      >
        Hello, {user.displayName}
      </Text>
      <Button
        style={{
          fontWeight: "bold",
          height: 30,
          width: 30,
          alignSelf: "flex-start",
          padding: 10,
        }}
        icon="shopping-outline"
      ></Button>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  image: {
    height: "200",
    width: "200",
  },
});
