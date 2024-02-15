import { createElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        color: "#D4D4D4",
        fontSize: 22,
        textTransform: "uppercase",
        letterSpacing: 1.2
    },
    iconContainer: {
        position: "absolute",
        width: 45,
        aspectRatio: 1,
        backgroundColor: "#111",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});
const DropdownListItem = ({ label, iconName, index, dropdownItemsCount, isExpanded, onPress }) => {
    const { width: windowWidth } = useWindowDimensions();
    const DropdownListItemHeight = 85;
    const Margin = 10;

    const fullDropdownHeight = dropdownItemsCount * (DropdownListItemHeight + Margin);

    const collapsedTop = fullDropdownHeight / 2 - DropdownListItemHeight;
    const expandedTop = (DropdownListItemHeight + Margin) * index;

    const expandedScale = 1;
    const collapsedScale = 1 - index * 0.08;

    const expandedBackgroundColor = "#1B1B1B";
    const collapsedBackgroundColor = Color(expandedBackgroundColor)
        .lighten(index * 0.25)
        .hex();

    return (
        <TouchableOpacity onPress={() => onPress(index)}>
            <Animatable.View
                animation={isExpanded ? "fadeInDown" : "fadeOutUp"}
                duration={500}
                delay={(dropdownItemsCount - index) * 150}
                style={[
                    {
                        zIndex: dropdownItemsCount - index,
                        position: "absolute",
                        width: windowWidth * 0.8,
                        left: windowWidth / 2 - windowWidth * 0.4,
                        height: DropdownListItemHeight,
                        borderRadius: 10,
                        backgroundColor: isExpanded ? expandedBackgroundColor : collapsedBackgroundColor,
                        top: isExpanded ? expandedTop : collapsedTop,
                        transform: [
                            { scale: isExpanded ? expandedScale : collapsedScale },
                            { translateY: fullDropdownHeight / 2 }
                        ]
                    }
                ]}
            >
                <View style={styles.container}>
                    <View style={[styles.iconContainer, { left: 15 }]}>
                        <Text>{iconName}</Text>
                    </View>
                    <Text style={styles.label}>{label}</Text>
                    <View style={[styles.iconContainer, { right: 15 }]}>
                        <Text>{isExpanded ? "arrow-forward-ios" : "arrow-forward"}</Text>
                    </View>
                </View>
            </Animatable.View>
        </TouchableOpacity>
    );
};

export { DropdownListItem };
