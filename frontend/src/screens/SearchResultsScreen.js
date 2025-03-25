import React, { useState } from "react";
import { SafeAreaView, View, TextInput, StyleSheet } from "react-native";
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

const SearchResultsScreen = ({ route }) => {
  const { type } = route.params;
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar2 title={`Search ${type === "mentor" ? "Mentors" : "Team Members"}`} />
      <View style={styles.container}>
        <TextInput
          placeholder="Search according to skills..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      <Footer page={"search"} />
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    flex: 1, 
    padding: 15,
    justifyContent: "flex-start", 
  },
  searchInput: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});
