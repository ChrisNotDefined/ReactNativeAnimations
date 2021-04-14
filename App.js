import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Jelly from "./src/Pages/Jelly";
import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Button,
  StatusBar,
} from "react-native";
import Heart from "./src/Pages/Heart";
import { useRef } from "react";

export default function App() {
  const Tab = createBottomTabNavigator();
  const position = new Animated.ValueXY({ x: 0, y: 0 });

  // Animated.timing(position, {
  //   toValue: { x: 200, y: 500 },
  //   duration: 2000,
  //   useNativeDriver: true,
  // }).start();

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    // onPanResponderMove: Animated.event(
    //   [null, { dx: position.x, dy: position.y }],
    //   { useNativeDriver: false }
    // ),

    // Same thing
    onPanResponderMove: (e, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },

    onPanResponderRelease: () => {
      //position.setValue({ x: 0, y: 0 });
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        bounciness: 20,
        useNativeDriver: false,
      }).start();
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });

  const navRef = useRef(null);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer ref={navRef}>
        <View style={styles.routesContainer}>
          <Tab.Navigator
            sceneContainerStyle={styles.tabScene}
            tabBar={() => {}}
            initialRouteName="Jelly"
          >
            <Tab.Screen name="Jelly" component={Jelly} />
            <Tab.Screen name="Heart" component={Heart} />
          </Tab.Navigator>
        </View>
        <View style={styles.aside}>
          <Button
            title="Jelly Anim"
            onPress={() => {
              navRef.current?.navigate("Jelly");
            }}
            color="darkred"
          />
          <Button
            title="Heart Cards Anim"
            onPress={() => {
              navRef.current?.navigate("Heart");
            }}
            color="darkred"
          />
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  routesContainer: {
    borderRadius: 20,
    margin: 5,
    elevation: 10,
    flex: 1,
  },
  tabScene: {
    padding: 15,
    borderRadius: 20,
  },
  aside: {
    marginHorizontal: 20,
    marginVertical: 40,
    flexBasis: 80,
    display: "flex",
    justifyContent: "space-between",
  },
});
