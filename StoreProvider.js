import { createContext, useContext, useState } from "react";
import * as Location from "expo-location";
import weatherObj from "./weatherObj";
const WeatherContext = createContext();

const StoreProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const randomCityNamesArr = [
    "New Mumbai",
    "New York City",
    "Pune",
    "Paris",
    "Sydney ",
    "London",
  ];
  const getRandomCityName = () => {
    const randomNum = Math.floor(Math.random() * 6);
    return randomCityNamesArr[randomNum];
  };
  const getUserLocation = async () => {
    setIsLoading(true);
    console.log("fetching current location");
    const res = await Location.requestForegroundPermissionsAsync();
    if (res?.status !== "granted") {
      setSearchText(getRandomCityName());
      console.log("permission denied");
      return;
    }
    console.log("permission granded");
    const c = await Location.getCurrentPositionAsync({});
    if (c.coords) {
      setLocation(c.coords);
    }
    console.log("location fetched");
  };
  return (
    <WeatherContext.Provider
      value={{
        searchText,
        setSearchText,
        location,
        setLocation,
        showModal,
        setShowModal,
        getUserLocation,
        weatherDetails,
        setWeatherDetails,
        isLoading,
        setIsLoading,
        isAnimating,
        setIsAnimating,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useStore = () => useContext(WeatherContext);

export { StoreProvider, useStore };
