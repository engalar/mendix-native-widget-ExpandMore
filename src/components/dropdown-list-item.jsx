import { createElement, useMemo } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "color";

const { interpolateColors, interpolate } = Animated;

const H_C = 65;
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: H_C,
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

const DropdownListItem = ({ label, iconName, index, dropdownItemsCount, base, onToggle }) => {
    const { width: windowWidth } = useWindowDimensions();
    const [rStyle, rStyle2] = useMemo(
        () => [
            {
                backgroundColor: interpolateColors(base, {
                    inputRange: [0, 1],
                    outputColorRange: [
                        Color("#1B1B1B")
                            .lighten(index * 0.25)
                            .hex(),
                        "#1B1B1B"
                    ]
                }),
                top: interpolate(base, {
                    inputRange: [0, 1],
                    outputRange: [10 - 10 * index, (H_C + 10) * index]
                }),
                transform: [
                    {
                        scale: interpolate(base, {
                            inputRange: [0, 1],
                            outputRange: [1 - index * 0.08, 1]
                        })
                    }
                ]
            },
            {
                transform: [
                    {
                        rotate: Animated.concat(
                            interpolate(base, {
                                inputRange: [0, 1],
                                outputRange: [0, 90]
                            }),
                            "deg"
                        )
                    }
                ]
            }
        ],
        [base]
    );

    const isHeader = index === 0;

    const toggleExpanded = () => {
        if (isHeader) {
            onToggle(index);
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    zIndex: dropdownItemsCount - index,
                    width: windowWidth * 0.8,
                    left: windowWidth / 2 - windowWidth * 0.4
                },
                rStyle
            ]}
        >
            <TouchableWithoutFeedback onPress={toggleExpanded}>
                <View style={styles.innerContainer}>
                    <View style={styles.iconContainer}>
                        <AntDesign name={iconName} size={25} color="#D4D4D4" />
                    </View>
                    <Text style={styles.label}>{label}</Text>
                    {isHeader && (
                        <Animated.View style={[styles.iconContainer, styles.arrowIconContainer, rStyle2]}>
                            <MaterialIcons name="arrow-forward-ios" size={25} color="#D4D4D4" />
                        </Animated.View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export { DropdownListItem };
