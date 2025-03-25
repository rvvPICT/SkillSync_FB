import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

const skills = ["AI", "ML", "Web Dev", "React", "Blockchain", "Python", "Django", "Cloud", "AWS", "Cybersecurity"];
const domains = ["Artificial Intelligence", "Retail", "Healthcare", "Blockchain", "Finance"];

const mentors = [
  { id: "1", name: "Vedika", skills: ["AI", "ML"] },
  { id: "2", name: "Sanika", skills: ["Web Dev", "React"] },
  { id: "3", name: "Rahul", skills: ["Blockchain"] },
];

const projects = [
  { id: "1", name: "AI Chatbot", domain: "Artificial Intelligence" },
  { id: "2", name: "E-commerce App", domain: "Retail" },
];

const SearchFilters = ({ route }) => {
  const { type } = route.params;
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const data = type === "project" ? projects : mentors;
  const filterOptions = type === "project" ? domains : skills;
  
  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredData = data.filter(item =>
    (search === "" || item.name.toLowerCase().includes(search.toLowerCase())) &&
    (selectedFilters.length === 0 || (type === "project" ? selectedFilters.includes(item.domain) : item.skills.some(skill => selectedFilters.includes(skill))))
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 title={`Search for ${type === "project" ? "Project" : "Members"}`} />
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filterContainer}>
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterButton, selectedFilters.includes(filter) && styles.selectedFilter]}
              onPress={() => toggleFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
      <Footer page={"search"} />
    </SafeAreaView>
  );
};

export default SearchFilters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9370DB",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilter: {
    backgroundColor: "#7164b4",
  },
  filterText: {
    color: "black",
  },
  card: {
    padding: 20,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
