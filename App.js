import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

export default function App() {
  const position = new Animated.ValueXY({ x: 0, y: 0 });

  Animated.timing(position, {
    toValue: { x: 200, y: 500 },
    duration: 2000,
    useNativeDriver: true,
  }).start();

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textView,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotate },
            ],
          },
        ]}
      >
        <Text>Dragon</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
