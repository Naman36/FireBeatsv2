import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  Button,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Header from "../components/Header";
import ProductsPage from "./ProductsPage";
import axios from "axios";
import { getWishList } from "../functions/user";
import { Divider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const createOrUpdateUser = async (user) => {
  return await axios
    .post(
      "https://d2ff-103-157-168-149.ngrok-free.app/api/create-user",
      {
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      },
      { headers: {} }
    )
    .then(() => console.log("User created Success"))
    .catch((err) => console.log(err));
};

const HomeScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    createOrUpdateUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1060220789771-0ujvf9m98c02t20dj51aug83bkrbnas0.apps.googleusercontent.com",
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn.then((user) => {}).catch((error) => console.log(error));
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
  const getList = async () => {
    const list = await getWishList(user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={{ alignContent: "center" }}>
          <Image source={require("../assets/FireBeats_square_white.png")} />
        </View>
        <Text style={{ textAlign: "center", padding: 10 }}>
          Our Artificial Intelligence algorithms track your health tracker to
          track your health
        </Text>
        <View style={{ margin: 10, padding: 10 }}>
          <Image source={require("../assets/googlefit.png")} />
        </View>
        <GoogleSigninButton onPress={onGoogleButtonPress}></GoogleSigninButton>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header user={user} />
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={{ flex: 7 }}>
        <ProductsPage user={user} />
      </View>
      {/* <View style={{ flex: 1 }}>
        <Button onPress={signOut} title="Sign Out"></Button>
      </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  button: {
    flex: 1,
  },
  image: {
    height: "200",
    width: "200",
  },
});
