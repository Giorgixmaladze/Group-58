import React from "react";
import { ScrollView, Text, View,StyleSheet } from "react-native";

import Card from "./components/Card";
import Post from "./components/Post";
import data from "./data/data";
import type { User, Post as PostType, Featured } from "./data/data";

const HomeScreen = () => (
  <ScrollView>
    <Text style={styles.heading}>Stories</Text>
    <ScrollView horizontal>
      {(data.users as User[]).map((user) => (
        <Card key={user.id} avatar={user.avatar} name={user.name} />
      ))}
    </ScrollView>
    <Text style={styles.featured}>Featured</Text>
    {(data.featured as Featured[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={false}
      />
    ))}

    <Text style={styles.myFeed}>My Feed</Text>
    {(data.posts as PostType[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}
  </ScrollView>
);

const App = () => (
  <View style={styles.container}>
    <HomeScreen />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
    gap:50
  },heading:{
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  featured:{
   fontSize:25,
   fontWeight: "bold",
    marginTop:30,
    marginBottom:30,
    paddingHorizontal:16,
    color:"blue"
  },
  myFeed:{
    fontSize:25,
    marginTop:30,
    marginBottom:30,
    paddingHorizontal:16,
  }

});

export default App;
