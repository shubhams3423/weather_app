import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import rainyCloud from "../assets/images/rainyCloud.png";
import windIcon from "../assets/images/WindIcon.png";
import springIcon from "../assets/images/SpringIcon.png";
import cloudIcon from "../assets/images/CloudIcon.png";
import { weatherIcons } from "../weatherIcons";
import { FontAwesome } from "@expo/vector-icons";

const ForeCastComponent = ({ weatherDetails }) => {
  const handleWeatherIcon = () => {
    const isDay = weatherDetails.current?.is_day ? "day" : "night";
    const code = weatherDetails.current?.condition?.code;
    if (weatherIcons[isDay][code]) {
      // return weatherIcons["day"]["1000"];
      return weatherIcons[isDay][code];
    } else {
      return {
        uri: `https:${weatherDetails?.current?.condition?.icon}`,
      };
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ flex: 1 }}>
        <View style={styles.weatherWrapper}>
          <Image
            resizeMode="contain"
            source={handleWeatherIcon()}
            style={styles.cloudIcon}
          />
          <View style={styles.temperatureWrapper}>
            <Text style={styles.temperatureText}>
              {weatherDetails?.current?.temp_c}
            </Text>
            <Text style={styles.degreeIcon}>&#x2da;</Text>
          </View>
          <Text style={styles.tempSubtitle}>
            {weatherDetails?.current?.condition?.text}
          </Text>
        </View>
        <View style={styles.weatherParamsWrapper}>
          <View style={styles.weatherParams}>
            <Image source={windIcon} />
            <Text style={styles.weatherParamText}>
              {weatherDetails?.current?.wind_kph} km/h
            </Text>
            {/* <Text style={styles.bottomText}>wind</Text> */}
          </View>
          <View style={styles.weatherParams}>
            {/* <Image source={cloudIcon} style={styles.weatherParamIcon} /> */}
            <FontAwesome name="tint" color="#B9B9B9" size={27} />
            <Text style={styles.weatherParamText}>
              {weatherDetails?.current?.humidity}%
            </Text>
            {/* <Text style={styles.bottomText}>humidity</Text> */}
          </View>
          <View style={styles.weatherParams}>
            <Image source={springIcon} style={styles.weatherParamIcon} />
            <Text style={styles.weatherParamText}>2 of 10</Text>
            {/* <Text style={styles.bottomText}>sunny</Text> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForeCastComponent;

const styles = StyleSheet.create({
  cloudIcon: {
    width: 237.38,
    height: 247.37,
  },
  scrollContainer: { flexGrow: 1, paddingBottom: 30 },
  weatherWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30.47,
  },
  temperatureText: {
    fontSize: 81.96, // 79.96
    fontWeight: 800,
    lineHeight: 109.22,
    color: "#FFFFFF",
  },
  temperatureWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  degreeIcon: {
    color: "white",
    fontSize: 80,
    fontWeight: 800,
  },
  tempSubtitle: {
    color: "#B9B9B9",
    fontSize: 19.99,
    fontWeight: 500,
    lineHeight: 27.3,
    marginRight: 10,
  },
  weatherParamsWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    marginTop: 25.37,
  },
  weatherParams: {
    alignItems: "center",
  },
  weatherParamIcon: {},
  weatherParamText: {
    fontSize: 17.49,
    lineHeight: 22.77,
    color: "#FFFFFF",
    marginTop: 12.66,
    fontFamily: "DMSansMedium",
  },
  bottomText: {
    marginTop: -2,
    color: "#e1e1e1b8",
    fontWeight: 600,
    fontSize: 15,
  },
});
