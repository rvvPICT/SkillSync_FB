// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
// import domainsList from "./domainsList";

// const DomainAccordion = ({ initialDomain = "", onDomainChange }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [selectedDomain, setSelectedDomain] = useState(initialDomain);

//   useEffect(() => {
//     // Initialize with the user's existing domain
//     if (initialDomain) {
//       setSelectedDomain(initialDomain);
//     }
//   }, [initialDomain]);

//   const toggleExpand = (index) => {
//     setExpandedIndex(index === expandedIndex ? null : index);
//   };

//   const selectDomain = (domain) => {
//     setSelectedDomain(domain);
    
//     // Pass the selected domain back to the parent component
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
//     marginBottom: 12,
//     paddingHorizontal: 16,
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
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import domainsList from "./domainsList";

const DomainAccordion = ({ initialDomain = "", onDomainChange }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  
  // Transform the data for 2-column layout
  const formatDataForTwoColumns = () => {
    let formattedData = [];
    for (let i = 0; i < domainsList.length; i += 2) {
      let item = {
        left: domainsList[i],
        right: i + 1 < domainsList.length ? domainsList[i + 1] : null
      };
      formattedData.push(item);
    }
    return formattedData;
  };

  const columnData = formatDataForTwoColumns();

  useEffect(() => {
    // Initialize with the user's existing domain
    if (initialDomain) {
      setSelectedDomain(initialDomain);
    }
  }, [initialDomain]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const selectDomain = (domain) => {
    setSelectedDomain(domain);
    
    // Pass the selected domain back to the parent component
    if (onDomainChange) {
      onDomainChange(domain);
    }
  };

  const renderDomainCard = (item, position) => {
    if (!item) return null;
    
    const originalIndex = position.includes("left") 
      ? parseInt(position.replace("left", "")) * 2 
      : parseInt(position.replace("right", "")) * 2 + 1;
    
    return (
      <View style={styles.cardColumn}>
        <TouchableOpacity 
          onPress={() => toggleExpand(position)} 
          style={styles.header}
        >
          <Text style={styles.domainType}>{item.type}</Text>
        </TouchableOpacity>

        {expandedIndex === position && (
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
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.rowContainer}>
      {renderDomainCard(item.left, `left${index}`)}
      {renderDomainCard(item.right, `right${index}`)}
    </View>
  );

  return (
    <View>
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
      ) : null}
      <FlatList
        data={columnData}
        keyExtractor={(item, index) => `row-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardColumn: {
    width: '48%',
    backgroundColor: "#F0F0FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B3D96",
    textAlign: 'center',
  },
  subtypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    marginTop: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9370DB",
    marginBottom: 8,
    marginHorizontal: 4,
  },
  selectedFilter: {
    backgroundColor: "#9370DB",
  },
  filterText: {
    color: "#7164b4",
    fontWeight: "500",
    fontSize: 12,
  },
  selectedFilterText: {
    color: "white",
  },
  selectedDomainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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