import { createElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "color";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "95%",
        height: 85,
        borderRadius: 10
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15
    },
    label: {
        color: "#D4D4D4",
        fontSize: 22,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginLeft: 10
    },
    iconContainer: {
        width: 45,
        aspectRatio: 1,
        backgroundColor: "#111",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    arrowIconContainer: {
        marginLeft: "auto"
    }
});

const DropdownListItem = ({ label, iconName, index, dropdownItemsCount, isExpanded }) => {
    const rStyle = {
        backgroundColor: Animated.interpolateColors(isExpanded, {
            inputRange: [0, 1],
            outputColorRange: [
                Color("#1B1B1B")
                    .lighten(index * 0.25)
                    .hex(),
                "#1B1B1B"
            ]
        }),
        top: Animated.interpolate(isExpanded, {
            inputRange: [0, 1],
            outputRange: [(dropdownItemsCount * (85 + 10)) / 2 - 85, (85 + 10) * index]
        }),
        transform: [
            {
                scale: Animated.interpolate(isExpanded, {
                    inputRange: [0, 1],
                    outputRange: [1 - index * 0.08, 1]
                })
            },
            {
                translateY: (dropdownItemsCount * (85 + 10)) / 2
            }
        ]
    };

    const isHeader = index === 0;

    return (
        <Animated.View
            onTouchEnd={() => {
                if (isHeader) isExpanded.value = !isExpanded.value;
            }}
            style={[
                styles.container,
                {
                    zIndex: dropdownItemsCount - index
                },
                rStyle
            ]}
        >
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    <AntDesign name={iconName} size={25} color="#D4D4D4" />
                </View>
                <Text style={styles.label}>{label}</Text>
                {isHeader && (
                    <Animated.View
                        style={[
                            styles.iconContainer,
                            styles.arrowIconContainer,
                            {
                                transform: [
                                    {
                                        rotate: Animated.concat(isExpanded ? "90deg" : "0deg")
                                    }
                                ]
                            }
                        ]}
                    >
                        <MaterialIcons name="arrow-forward-ios" size={25} color="#D4D4D4" />
                    </Animated.View>
                )}
            </View>
        </Animated.View>
    );
};

export { DropdownListItem };
