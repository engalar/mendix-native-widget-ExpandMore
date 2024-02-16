import { createElement } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "color";

const { Clock, Value, block, cond, set, startClock, stopClock, timing, clockRunning, interpolate } = Animated;

const H_C = 65;
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "95%",
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

const DropdownListItem = ({ label, iconName, index, dropdownItemsCount, isExpanded, clock }) => {
    const { width: windowWidth } = useWindowDimensions();
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
            outputRange: [80, (H_C + 10) * index]
        }),
        transform: [
            {
                scale: Animated.interpolate(isExpanded, {
                    inputRange: [0, 1],
                    outputRange: [1 - index * 0.08, 1]
                })
            },
            {
                translateY: (dropdownItemsCount * (H_C + 10)) / 2
            }
        ]
    };

    const isHeader = index === 0;

    const toggleExpanded = () => {
        if (isHeader) isExpanded.setValue(!isExpanded.value);
    };
    const config = {
        duration: 2000, // 设置动画时长为500ms
        toValue: 1,
        easing: Easing.quad
    };
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };
    const timingAnimation = block([
        cond(clockRunning(clock), 0, startClock(clock)),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ]);
    return (
        <TouchableWithoutFeedback onPress={toggleExpanded}>
            <Animated.View
                onTouchEnd={() => {
                    if (isHeader) isExpanded.value = !isExpanded.value;
                }}
                style={[
                    styles.container,
                    {
                        zIndex: dropdownItemsCount - index,
                        width: windowWidth * 0.8,
                        left: windowWidth / 2 - windowWidth * 0.4
                    },
                    rStyle,
                    {
                        opacity: timingAnimation
                    }
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
        </TouchableWithoutFeedback>
    );
};

export { DropdownListItem };
