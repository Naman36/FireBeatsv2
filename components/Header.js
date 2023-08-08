import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Alert,
} from "react-native";
import React from "react";
import { Button, Divider } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsPage from "../screens/ProductsPage";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();
const Header = ({ user }) => {
  const navigation = useNavigation();
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert("", "Do you wanna log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => signOut() },
    ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Button onPress={signOut} title="Sign Out"></Button>
        </View>
        <TouchableHighlight onPress={() => createTwoButtonAlert()}>
          <Image
            source={{ uri: user.photoURL }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 150,
              alignSelf: "center",
            }}
          ></Image>
        </TouchableHighlight>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            alignSelf: "center",
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
            alignSelf: "center",
            flex: 1,
          }}
          // icon={require("../assets/wishlist.png")}
          icon="cart-heart"
          onPress={() => navigation.navigate("WishList", { user: user })}
        ></Button>
        <Button
          style={{
            fontWeight: "bold",
            height: 30,
            width: 30,
            alignSelf: "center",
            flex: 1,
          }}
          icon="shopping-outline"
        ></Button>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
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
