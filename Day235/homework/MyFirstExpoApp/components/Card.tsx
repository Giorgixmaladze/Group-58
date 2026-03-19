import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Avatar from "./Avatar";

type CardProps = {
  avatar: string;
  name: string;
};

const Card = (props: CardProps) => (
  <View style={styles.container}>
    <Avatar url={props.avatar} />
    <Text style={styles.text}>{props.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 80,
    margin: 10,
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    gap: 10,
  },
  text: {
    fontSize: 16,
    color:"blue"
  },
});
export default Card;
