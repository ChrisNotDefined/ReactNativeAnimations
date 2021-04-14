import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 2;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Heart = () => {
  const [stacked, setStacked] = useState(0);
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

  const position = new Animated.ValueXY({ x: 0, y: 0 });

  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: position.x }], {
      useNativeDriver: false,
    }),
    // (evt, gesture) => {
    //   position.setValue({x: gesture.dx})
    // }
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipeAnim("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipeAnim("left");
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const swipeAnim = (dir) => {
    const x = dir === "right" ? SCREEN_WIDTH + 10 : -SCREEN_WIDTH - 10;
    Animated.timing(position, {
      duration: 200,
      toValue: { x, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      LayoutAnimation.spring();
      position.setValue({ x: 0, y: 0 });
      setStacked((prevState) => {
        return prevState + 1;
      });
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ["-60deg", "0deg", "60deg"],
  });

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

  const cardView = (item, index) => {
    return (
      <Card>
        <Card.Cover source={{ uri: item.uri }} />
        <Card.Actions>
          <AntDesign
            name={liked && index === counter ? "heart" : "hearto"}
            size={30}
            color="darkred"
            onPress={() => {
              if (liked == false) {
                setVisible(true);
              }
              setLiked(!liked);
              setCounter(index);
            }}
          />
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={[styles.container]}>
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
          if (index < stacked) {
            return null;
          }
          if (index == stacked) {
            return (
              <Animated.View
                {...pan.panHandlers}
                style={{
                  transform: [{ translateX: position.x }, { rotate }],
                }}
              >
                {cardView(item, index)}
              </Animated.View>
            );
          } else {
            {
              return <Animated.View style={{transform:[]}}>{cardView(item, index)}</Animated.View>;
            }
          }
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
