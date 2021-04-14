import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import { Button, Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const Heart = () => {
  const data = [
    {
      id: 1,
      uri:
        "https://images.unsplash.com/photo-1618297522410-dc5a1266f8e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 2,
      uri:
        "https://images.unsplash.com/photo-1618297522410-dc5a1266f8e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 3,
      uri:
        "https://images.unsplash.com/photo-1618297522410-dc5a1266f8e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 4,
      uri:
        "https://images.unsplash.com/photo-1618297522410-dc5a1266f8e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ];

  const currentValue = new Animated.Value(1);
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (liked == true) {
      Animated.spring(currentValue, {
        toValue: 2,
        friction: 5,
        useNativeDriver: false,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          speed: 100,
          useNativeDriver: false,
        }).start(() => setVisible(false));
      });
    }
  }, [liked]);

  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

  return (
    <View style={styles.container}>
      {visible && (
        <AnimatedIcon
          style={[
            styles.bigHeart,
            {
              transform: [{ scale: currentValue }],
            },
          ]}
          name="heart"
          size={50}
          color="darkred"
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <Card>
              <Card.Cover source={{ uri: item.uri }} />
              <Card.Actions>
                <AntDesign
                  name={liked && index === counter ? "heart" : "hearto"}
                  size={30}
                  color="darkred"
                  onPress={() => {
                    if(liked == false){
                      setVisible(true);
                    }
                    setLiked(!liked);
                    setCounter(index);
                  }}
                />
              </Card.Actions>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default Heart;

const styles = StyleSheet.create({
  container: {},
  bigHeart: {
    position: "absolute",
    top: 90,
    left: "43%",
    zIndex: 5,
    elevation: 5,
  },
});
