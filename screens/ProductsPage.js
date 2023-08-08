import { React, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Alert,
  Image,
} from "react-native";
import { Card, Title, Button, Paragraph } from "react-native-paper";
import { getProductsByCount } from "../functions/products";
import { addToWishlist } from "../functions/user";

// const Stack = createNativeStackNavigator();
const ProductsPage = ({ user, navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = async () => {
    getProductsByCount(3)
      .then((res) => {
        setProducts(res.data);
        console.log(products[0].title);
      })
      .catch((err) => console.log(err.message));
  };
  var products1 = [
    {
      name: "Fitbit 1",
      price: "100$",
      details:
        "Track fitness metrics and receive useful reminders with this lightweight Fitbit Versa Lite Edition smartwatch. Continuous heart rate tracking supports real-time exercise adjustments, while the high-resolution color touchscreen with durable Gorilla Glass 3 offers an intuitive user experience. ",
    },
    {
      name: "Garmin",
      price: "80$",
      details:
        " fitness metrics and receive useful reminders with this lightweight Fitbit Versa Lite Edition smartwatch. Continuous heart rate tracking supports real-time exercise adjustments, while the high-resolution color touchscreen with durable Gorilla Glass 3 offers an intuitive user experience. ",
    },
    {
      name: "Apple Watch",
      price: "180$",
      details:
        "Sleep, distance and steps monitoring delivers useful data. This charcoal-colored Fitbit Versa Lite Edition smartwatch has a maximum battery life of over four days for uninterrupted performance.",
    },
  ];

  const handleAddToWishList = (productId) => {
    addToWishlist(user, productId).then((res) => {
      console.log("Added to wishlist", res.data);
      Alert.alert("Added to wishlist");
    });
  };
  return (
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
  );
};

export default ProductsPage;

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 10,
    flex: 1,
    flexDirection: "column",
  },
});
