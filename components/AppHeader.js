import { View, Text, StyleSheet, SafeAreaView, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import SearchModal from "./SearchModal";
import { useStore } from "../StoreProvider";
const AppHeader = ({ weatherDetails }) => {
  const { getUserLocation, setShowModal, isAnimating, setIsAnimating } =
    useStore();
  // const [date, setDate] = useState("");
  // function handleFormateDate() {
  //   const today = new Date();
  //   const day = today.getDate();
  //   const month = today.toString().split(" ")[1];
  //   const year = today.getFullYear();
  //   const formattedDate = day + " " + month + ", " + year;
  //   setDate(formattedDate);
  // }
  // useEffect(() => {
  //   handleFormateDate();
  // }, []);
  const text = "Updating";
  const animatedValues = useRef(
    text.split("").map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    let animation;
    if (isAnimating) {
      animation = Animated.loop(
        Animated.stagger(
          100, // Delay between each letter's animation
          animatedValues.map((value, i) =>
            Animated.sequence([
              // Move current letter up
              Animated.timing(value, {
                toValue: -4, // Move up
                duration: 350,
                useNativeDriver: true,
              }),
              // Move current letter down and previous letter up
              Animated.timing(value, {
                toValue: 0, // Move back to original position
                duration: 350,
                useNativeDriver: true,
              }),
            ])
          )
        )
      );
      animation.start();
    } else {
      // Reset the animated values when stopping
      Animated.stagger(
        100,
        animatedValues.map((value) =>
          Animated.timing(value, {
            toValue: 0, // Reset to original position
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start();
    }

    return () => {
      if (animation) {
        animation.stop(); // Stop the animation when component unmounts
      }
    };
  }, [isAnimating]);
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <MaterialIcons
          name="location-on" // more-vert
          size={25}
          color="white"
          onPress={getUserLocation}
          style={{ lineHeight: 42.61 }}
        />
        <View style={styles.header}>
          <Text style={styles.cityName}>{weatherDetails?.location?.name}</Text>
          <View style={styles.updateTextWrapper}>
            <View style={styles.currentUpdate} />
            <View style={styles.container}>
              {text.split("").map((letter, index) => (
                <Animated.Text
                  key={index}
                  style={[
                    styles.updatingText,
                    { transform: [{ translateY: animatedValues[index] }] },
                  ]}
                >
                  {letter}
                </Animated.Text>
              ))}
            </View>
            {/* <Text style={styles.updatingText}>Updating</Text> */}
          </View>
          {/* <Text style={styles.dateText}>{date}</Text> */}
        </View>
        <FontAwesome
          color="white"
          name="search"
          size={25}
          style={styles.icon}
          onPress={() => setShowModal(true)}
        />
        <SearchModal />
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 4.9,
    marginBottom: 40.47,
    lineHeight: 42.61,
    width: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
  },
  cityName: {
    fontSize: 31.98,
    lineHeight: 42.61,
    color: "#FFFFFF",
    fontFamily: "NunitoExtraBold",
    fontWeight: "700",
    textAlign: "center",
  },
  dateText: {
    fontSize: 19.99,
    lineHeight: 27.31,
    color: "#CACACA",
  },
  updateTextWrapper: {
    marginTop: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  currentUpdate: {
    width: 4,
    height: 4,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "yellow",
  },
  updatingText: {
    fontSize: 11,
    color: "white",
  },
  icon: {
    lineHeight: 42.61,
    width: 30,
    display: "flex",
    justifyContent: "center",
  },
  modalWrapper: {
    backgroundColor: "red",
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
