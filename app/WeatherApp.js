import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WeatherTabs from "../components/WeatherTabs";
import AppHeader from "../components/AppHeader";
import backgroundImg from "../assets/images/backgroundImg.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import { baseUrl } from "../constants/urls";
import { useStore } from "../StoreProvider";
const WeatherApp = () => {
  const {
    getUserLocation,
    location,
    searchText,
    weatherDetails,
    setWeatherDetails,
    setSearchText,
    isLoading,
    setIsLoading,
    isAnimating,
    setIsAnimating,
    setLocation,
  } = useStore();
  const { longitude, latitude } = location;
  const coordsURL = `${baseUrl}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no`;
  const searchURL = `${baseUrl}&q=${searchText}&days=1&aqi=yes&alerts=no`;
  const [fetchURL, setFetchURL] = useState(coordsURL);
  const timeToRecallAPI = 5 * 60 * 1000; // 10 mins
  const [intervalId, setIntervalId] = useState(0);
  const [cityName, setCityName] = useState(""); // saved the city name to call api after 10 min.
  const cityNameRef = useRef(cityName);
  const intervalCallback = () => {
    const timestamp = Date.now();
    const updateWeatherDataURL = `${baseUrl}&q=${cityNameRef.current}&days=1&aqi=yes&alerts=no&timestamp=${timestamp}`;
    setFetchURL(updateWeatherDataURL);
    setIsAnimating(true);
  };
  const handleAPITimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(intervalCallback, timeToRecallAPI);
    setIntervalId(id);
  };
  const getWeatherDetails = async () => {
    if (!isAnimating) {
      setIsLoading(true);
    }
    handleAPITimer();
    console.log("function called");
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      if (res.ok) {
        setWeatherDetails(data);
        setSearchText("");
      } else {
        setSearchText("");
        Alert.alert(data?.error?.message);
      }
    } catch (error) {
      Alert.alert(error);
    }
    setIsLoading(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    if (Object.keys(location).length > 0) {
      setFetchURL(coordsURL);
    } else {
      getUserLocation();
    }
  }, [location]);
  useEffect(() => {
    if (searchText.trim() !== "") {
      setFetchURL(searchURL);
    }
  }, [searchText]);

  useEffect(() => {
    if (Object.keys(location).length > 0 || searchText !== "") {
      getWeatherDetails();
    }
  }, [fetchURL]);

  useEffect(() => {
    if (cityName !== "") {
      cityNameRef.current = cityName;
    }
  }, [cityName]);

  useEffect(() => {
    setCityName(weatherDetails?.location?.name);
  }, [weatherDetails]);

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          resizeMode="cover"
          style={[styles.backgroundWrapper, isLoading && styles.loaderOpacity]}
          source={backgroundImg}
        >
          <LinearGradient
            style={styles.linearGradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.2, y: 0.5 }}
            colors={["rgba(8, 201, 253, 0.6)", "rgba(0, 0, 0, 0)"]}
          >
            {isLoading ? (
              <ActivityIndicator
                style={styles.loader}
                size={50}
                color="white"
              />
            ) : (
              <View style={{ flex: 1 }}>
                <AppHeader weatherDetails={weatherDetails} />
                <WeatherTabs weatherDetails={weatherDetails} />
              </View>
            )}
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherApp;
const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1,
  },
  loaderOpacity: {
    opacity: 0.9,
  },
  linearGradient: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 25,
    paddingLeft: 25,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeView: {
    flex: 1,
  },
});
