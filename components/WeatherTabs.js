import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ForeCastComponent from "../screens/ForeCastComponent";
import AirQualityComponent from "../screens/AirQualityComponent";
import { StyleSheet, View, Text } from "react-native";
const Tab = createMaterialTopTabNavigator();

const WeatherTabs = ({ weatherDetails }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        sceneStyle: { backgroundColor: "transparent" },
        tabBarContentContainerStyle: {
          justifyContent: "center",
          margin: "auto",
        },
        tabBarItemStyle: {
          maxHeight: 59.97,
        },
        tabBarStyle: {
          ...styles.tabsWrapper,
          width: 300,
          margin: "auto",
          borderBottomWidth: 0,
          elevation: 0, // for android removes the shadow.
          shadowColor: "transparent", // for ios removes the shadow.
        },
        tabBarLabel: ({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? "#4084DF" : "transparent",
              width: 150,
              height: 59.97,
              justifyContent: "center",
              paddingHorizontal: 20,
              borderRadius: 14.99,
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                ...styles.tabTextCommonTextStyle,
                color: focused ? "#FFFFFF" : "#ffffffa1",
                fontWeight: focused ? "500" : "400",
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
        tabBarIndicatorStyle: {
          height: 0,
          width: 0,
          backgroundColor: "transparent",
        },
      })}
    >
      <Tab.Screen
        name="ForeCast"
        children={() => <ForeCastComponent weatherDetails={weatherDetails} />}
      />
      <Tab.Screen
        name="Air Quality"
        children={() => <AirQualityComponent weatherDetails={weatherDetails} />}
      />
    </Tab.Navigator>
  );
};

export default WeatherTabs;

const styles = StyleSheet.create({
  tabsWrapper: {
    borderRadius: 14.99,
    backgroundColor: "rgba(64, 132, 223, 0.2)",
  },
  tabTextCommonTextStyle: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 27.31,
  },
});
