import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
// import AuthProvider, { AuthContext } from "../contexts/AuthContext";

import Profile from "./Profile";
import Feed from "./Feed";
import AddPost from "./AddPost";
import PostProvier from "../contexts/PostContext";

const Tab = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const PlusIcon = (props) => <Icon {...props} name="plus-square-outline" />;

const ProfileIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={PlusIcon} />
    <BottomNavigationTab icon={ProfileIcon} />
  </BottomNavigation>
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const Home = ({ authContext }) => {
  return (
    <PostProvier>
      <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Feed} />
        <Tab.Screen name="Add Post" component={AddPost} />
        <Tab.Screen name="Profile">
          {props => <Profile {...props} authCtx={authContext} />}
        </Tab.Screen>
      </Tab.Navigator>
    </PostProvier>
  )
};

export default Home;
