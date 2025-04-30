// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import domainsList from "./domainsList";

// const DomainAccordion = ({ initialDomain = "", onDomainChange }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [selectedDomain, setSelectedDomain] = useState(initialDomain);

//   useEffect(() => {
//     if (initialDomain) {
//       setSelectedDomain(initialDomain);
//     }
//   }, [initialDomain]);

//   const toggleExpand = (index) => {
//     setExpandedIndex(index === expandedIndex ? null : index);
//   };

//   const selectDomain = (domain) => {
//     setSelectedDomain(domain);
//     if (onDomainChange) {
//       onDomainChange(domain);
//     }
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={styles.card}>
//       <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.header}>
//         <Text style={styles.domainType}>{item.type}</Text>
//       </TouchableOpacity>

//       {expandedIndex === index && (
//         <View style={styles.subtypesContainer}>
//           {item.subtypes.map((sub, i) => {
//             const isSelected = selectedDomain === sub;
//             return (
//               <TouchableOpacity
//                 key={i}
//                 onPress={() => selectDomain(sub)}
//                 style={[
//                   styles.filterButton,
//                   isSelected && styles.selectedFilter,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.filterText,
//                     isSelected && styles.selectedFilterText,
//                   ]}
//                 >
//                   {sub}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <View>
//       {selectedDomain ? (
//         <View style={styles.selectedDomainContainer}>
//           <Text style={styles.selectedDomainLabel}>Selected Domain:</Text>
//           <View style={styles.selectedDomainBadge}>
//             <Text style={styles.selectedDomainText}>{selectedDomain}</Text>
//             <TouchableOpacity onPress={() => selectDomain("")}>
//               <Text style={styles.removeButton}>×</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : null}

//       <FlatList
//         data={domainsList}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#F0F0FF",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   header: {
//     paddingVertical: 4,
//   },
//   domainType: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#4B3D96",
//   },
//   subtypesContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginTop: 12,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#9370DB",
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   selectedFilter: {
//     backgroundColor: "#9370DB",
//   },
//   filterText: {
//     color: "#7164b4",
//     fontWeight: "500",
//   },
//   selectedFilterText: {
//     color: "white",
//   },
//   selectedDomainContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     flexWrap: "wrap",
//   },
//   selectedDomainLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#4B3D96",
//     marginRight: 10,
//   },
//   selectedDomainBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E6E6FA",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#7164B4",
//   },
//   selectedDomainText: {
//     color: "#4B3D96",
//     fontWeight: "500",
//   },
//   removeButton: {
//     color: "#4B3D96",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
// });

// export default DomainAccordion;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import domainsList from "./domainsList";

const DomainAccordion = ({ initialDomain = "", onDomainChange }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);

  useEffect(() => {
    if (initialDomain) {
      setSelectedDomain(initialDomain);
    }
  }, [initialDomain]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const selectDomain = (domain) => {
    setSelectedDomain(domain);
    if (onDomainChange) {
      onDomainChange(domain);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.header}>
        <Text style={styles.domainType}>{item.type}</Text>
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={styles.subtypesContainer}>
          {item.subtypes.map((sub, i) => {
            const isSelected = selectedDomain === sub;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => selectDomain(sub)}
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
    <View style={styles.container}>
      {/* Always render the selected domain container with consistent height */}
      <View style={styles.selectedDomainWrapper}>
        {selectedDomain ? (
          <View style={styles.selectedDomainContainer}>
            <Text style={styles.selectedDomainLabel}>Selected Domain:</Text>
            <View style={styles.selectedDomainBadge}>
              <Text style={styles.selectedDomainText}>{selectedDomain}</Text>
              <TouchableOpacity onPress={() => selectDomain("")}>
                <Text style={styles.removeButton}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderHeight} />
        )}
      </View>

      <FlatList
        data={domainsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectedDomainWrapper: {
    minHeight: 40, // Maintain consistent height whether selection exists or not
    marginBottom: 10,
  },
  placeholderHeight: {
    height: 0,
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#F0F0FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    paddingVertical: 4,
  },
  domainType: {
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
  selectedDomainContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  selectedDomainLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B3D96",
    marginRight: 10,
  },
  selectedDomainBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7164B4",
  },
  selectedDomainText: {
    color: "#4B3D96",
    fontWeight: "500",
  },
  removeButton: {
    color: "#4B3D96",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default DomainAccordion;