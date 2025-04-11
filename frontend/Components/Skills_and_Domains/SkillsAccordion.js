import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import skillsList from "./skillsList";

const SkillsAccordion = ({ initialSkills = [], onSkillsChange }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);

  useEffect(() => {
    // Initialize with the user's existing skills
    if (initialSkills && initialSkills.length > 0) {
      setSelectedSkills(initialSkills);
    }
  }, [initialSkills]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const toggleSkill = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(updatedSkills);
    
    // Pass the updated skills back to the parent component
    if (onSkillsChange) {
      onSkillsChange(updatedSkills);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.header}>
        <Text style={styles.skillType}>{item.type}</Text>
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={styles.subtypesContainer}>
          {item.subtypes.map((sub, i) => {
            const isSelected = selectedSkills.includes(sub);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => toggleSkill(sub)}
                style={[
                  styles.filterButton,
                  isSelected && styles.selectedFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.selectedFilterText,
                  ]}
                >
                  {sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={skillsList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0F0FF",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    paddingVertical: 4,
  },
  skillType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3D96",
  },
  subtypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9370DB",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilter: {
    backgroundColor: "#9370DB",
  },
  filterText: {
    color: "#7164b4",
    fontWeight: "500",
  },
  selectedFilterText: {
    color: "white",
  },
});

export default SkillsAccordion;
