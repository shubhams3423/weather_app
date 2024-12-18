import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GasInfo from "../components/GasInfo";

const AirQualityComponent = ({ weatherDetails }) => {
  const [airQualityConditionText, setAirQualityConditionText] = useState("");

  const handleAirQualityText = () => {
    const text = weatherDetails?.current?.air_quality?.["us-epa-index"];
    switch (text) {
      case 1:
        return "Good";
      case 2:
        return "Moderate";
      case 3:
        return "Sensitive";
      case 4:
        return "Unhealthy";
      case 5:
        return "Hazardous";
    }
  };
  useEffect(() => {
    setAirQualityConditionText(handleAirQualityText());
  }, []);

  const gases = ["co", "no2", "o3", "so2"];
  const gasArr = gases.map((gas) => {
    return { name: gas, qty: weatherDetails?.current?.air_quality[gas] };
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.aqiWrapper}>
          <Text style={[styles.text, styles.airQualityText]}>
            {airQualityConditionText}
          </Text>
          <View style={styles.aqiTextWrapper}>
            <View style={{ marginRight: 4 }}>
              <Text style={styles.aqiText}>Air Quality Index</Text>
            </View>
            <Text style={styles.aqiText}>
              {weatherDetails?.current?.air_quality?.["us-epa-index"]}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.aqiParameters}>
          <FlatList
            data={gasArr}
            contentContainerStyle={styles.gasList}
            renderItem={({ item }) => <GasInfo gases={item} />}
            keyExtractor={(index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default AirQualityComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  airQualityText: {
    fontWeight: 800,
    lineHeight: 80,
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  aqiTextWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  aqiText: {
    fontSize: 20,
    color: "rgba(185,185,185,1.00)",
  },
  wrapper: {
    flexGrow: 1,
    paddingVertical: 30,
    alignItems: "center",
  },
  aqiWrapper: {
    gap: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "NunitoExtraBold",
  },
  airCondition: {},
  airIndex: {
    fontSize: 15,
  },
  airGases: {
    gap: 4,
  },
  gasList: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-around",
    // paddingHorizontal: 20,
  },
  aqiParameters: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "gray",
    paddingVertical: 20,
    backgroundColor: "rgba(64, 132, 223, 0.2)",
    borderRadius: 6,
  },
});
