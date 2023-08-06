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

const HomeScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
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
    userSignIn
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/FireBeats_square_white.png")} />
        <Text style={{ textAlign: "center" }}>
          Our Artificial Intelligence algorithms track your health tracker to
          track your health
        </Text>

        <View>
          <Image source={require("../assets/googlefit.png")} />
        </View>
        <GoogleSigninButton onPress={onGoogleButtonPress}></GoogleSigninButton>
        <Button
          icon="google"
          mode="contained"
          onPress={() => console.log("Pressed")}
          title="Hello"
        >
          Sign in with Google
        </Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header user={user} />
      <View style={styles.container}>
        <ProductsPage />
      </View>
      <View style={styles.button}>
        <Button onPress={signOut} title="Sign Out"></Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  image: {
    height: "200",
    width: "200",
  },
});
