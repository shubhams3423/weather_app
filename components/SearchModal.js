import React from "react";
import { View, Modal, StyleSheet, ImageBackground } from "react-native";
import backgroundImg from "../assets/images/backgroundImg.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBox from "./SearchBox";
import { useStore } from "../StoreProvider";
const SearchModal = () => {
  const { showModal, setShowModal } = useStore();
  return (
    <Modal
      visible={showModal}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.modalWrapper}
        source={backgroundImg}
      >
        <LinearGradient
          style={{
            flex: 1,
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 20,
          }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.2, y: 0.5 }}
          colors={["rgba(8, 201, 253, 0.6)", "rgba(0, 0, 0, 0)"]}
        >
          <View>
            <MaterialIcons
              name="keyboard-backspace"
              size={30}
              color="white"
              onPress={() => setShowModal(false)}
            />
          </View>
          <View>
            <SearchBox />
          </View>
        </LinearGradient>
      </ImageBackground>
    </Modal>
  );
};

export default SearchModal;
const styles = StyleSheet.create({
  location: {
    position: "absolute",
    right: 0,
    top: -17,
    color: "white",
  },
  modalWrapper: {
    backgroundColor: "#04061F",
    flex: 1,
  },
});
