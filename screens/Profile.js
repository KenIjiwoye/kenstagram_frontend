import React from "react";
import { Layout, Input, Button, Divider, Avatar } from "@ui-kitten/components";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";

const Profile = () => {
  return (
    <Layout style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}
      >
        <Text style={styles.username}>username</Text>
        {/* TOP ROW */}
        <View style={styles.avatarRow}>
          <Avatar
            source={{
              uri:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
            }}
            size="giant"
            style={{ width: 80, height: 80 }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              38
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Posts</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              500
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Followers</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              50
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Following</Text>
          </View>
        </View>
        {/* PROFILE DESCRIPTION */}
        <View style={styles.description}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            AdeTokunbo Ijiwoye
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            My Profile description | and other info
          </Text>
        </View>
        {/* EDIT PROFILE BUTTON IF CURRENT USER  */}
        <Button style={{ marginTop: 16, height: 40 }} appearance="outline">
          Edit Profile
        </Button>
        <Divider style={{ marginTop: 8 }} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  avatarRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  description: {
    marginTop: 16,
  },
});

export default Profile;
