import React from "react";
import { Layout, Input, Button, Divider } from "@ui-kitten/components";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <Layout style={styles.container}>
      <Text>Profile</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
