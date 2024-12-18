import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
const SearchInput = () => {
  const [text, onChangeText] = useState("");
  return (
    <View style={styles.wrapper}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
      <MaterialIcons name="place" size={30} />
    </View>
  );
};

export default SearchInput;
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    // backgroundColor: "red",
  },
  input: {
    flexGrow: 1,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
