import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Header from "../components/Header";
import { getWishList } from "../functions/user";
import { Card, Title, Button, Paragraph } from "react-native-paper";

const WishList = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadWishList(route.params.user);
    setLoading(true);
  }, []);

  const loadWishList = async (user) => {
    await getWishList(user)
      .then((res) => {
        setProducts(res.data.wishlist);
        console.log(res.data.wishlist);
        console.log(products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(route.params.user);
  return loading ? (
    <ActivityIndicator size="large" />
  ) : !products ? (
    <View style={Styles.container}>
      <Text>Start adding products in your wishlist</Text>
    </View>
  ) : (
    <View style={Styles.container}>
      <Header user={route.params.user} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          padding: 10,
          alignSelf: "center",
        }}
      >
        Wishlist
      </Text>
      <View style={Styles.container}>
        <ScrollView>
          {products.map((product) => (
            <View key={product.name} style={{ margin: 10 }}>
              <Card
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderColor: "black",
                  elevation: 1.0,
                }}
                mode="outlined"
                theme={{ colors: { primary: "green" } }}
              >
                {/* <Card.Content style={Styles.container}> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      flex: 8,
                      fontSize: 20,
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {product.title}
                  </Text>

                  <Button
                    onPress={() => handleAddToWishList(product._id)}
                    icon="cards-heart-outline"
                    style={{ flex: 1, textAlign: "right" }}
                  ></Button>
                </View>

                {/* </Card.Content> */}
                <Image
                  source={{ uri: product.images }}
                  style={{
                    height: 250,
                    width: 250,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                />
                {/* <Card.Content style={{ padding: 10 }}> */}
                <Text style={{ fontSize: 20, textAlign: "center", margin: 10 }}>
                  {product.price}${" "}
                </Text>
                <Paragraph style={{ padding: 10 }}>
                  {product.description}
                </Paragraph>
                {/* </Card.Content> */}
                <Card.Actions>
                  <Button>Add to Cart</Button>
                </Card.Actions>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default WishList;

const Styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
