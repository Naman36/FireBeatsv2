import { React, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Button, Paragraph } from "react-native-paper";

// const Stack = createNativeStackNavigator();
const ProductsPage = () => {
  var products = [
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
        "Track fitness metrics and receive useful reminders with this lightweight Fitbit Versa Lite Edition smartwatch. Continuous heart rate tracking supports real-time exercise adjustments, while the high-resolution color touchscreen with durable Gorilla Glass 3 offers an intuitive user experience. ",
    },
    {
      name: "Apple Watch",
      price: "180$",
      details:
        "Sleep, distance and steps monitoring delivers useful data. This charcoal-colored Fitbit Versa Lite Edition smartwatch has a maximum battery life of over four days for uninterrupted performance.",
    },
  ];
  return (
    <View>
      <ScrollView>
        {products.map((product) => (
          <View key={product.name}>
            <Card style={Styles.container}>
              <Card.Content>
                <Title>{product.name}</Title>
              </Card.Content>
              <Card.Cover />
              <Card.Content>
                <Paragraph>{product.details}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Add To Favourites</Button>
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
    margin: 37,
  },
});
