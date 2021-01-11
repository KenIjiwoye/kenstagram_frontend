import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

const AddPost = () => {
  return (
    <Layout style={styles.container}>
      <Text>Add Post</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default AddPost;
