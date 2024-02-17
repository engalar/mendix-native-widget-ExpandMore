import { createElement, useMemo } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "color";

const {
    interpolateColors,
    Clock,
    and,
    eq,
    Value,
    block,
    cond,
    set,
    startClock,
    stopClock,
    timing,
    clockRunning,
    interpolate
} = Animated;

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

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(1),
        position: new Value(value),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    const reset = [set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0)];

    return block([
        cond(and(state.finished, eq(state.position, value)), [...reset, set(config.toValue, dest)]),
        cond(and(state.finished, eq(state.position, dest)), [...reset, set(config.toValue, value)]),
        cond(clockRunning(clock), 0, startClock(clock)),
        timing(clock, state, config),
        state.position
    ]);
}

const DropdownListItem = ({ label, iconName, index, dropdownItemsCount, isExpanded }) => {
    const { width: windowWidth } = useWindowDimensions();
    const rStyle = useMemo(() => {
        const clock = new Clock();
        const base = runTiming(clock, isExpanded ? 0 : 1, isExpanded ? 1 : 0);
        return {
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
                outputRange: [80, (H_C + 10) * index]
            }),
            transform: [
                {
                    scale: interpolate(base, {
                        inputRange: [0, 1],
                        outputRange: [1 - index * 0.08, 1]
                    })
                },
                {
                    translateY: (dropdownItemsCount * (H_C + 10)) / 2
                }
            ]
        };
    }, []);

    const isHeader = index === 0;

    const toggleExpanded = () => {
        if (isHeader) isExpanded.setValue(!isExpanded.value);
    };
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
        </TouchableWithoutFeedback>
    );
};

export { DropdownListItem };
