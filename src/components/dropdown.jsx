import { createElement, useState, useMemo } from "react";
import Animated, { stopClock, Clock, interpolate } from "react-native-reanimated";
import { DropdownListItem } from "./dropdown-list-item";
import { runSpring } from "./util";

const clock = new Clock();
const Dropdown = ({ header, options }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const base = useMemo(() => runSpring(clock, isExpanded ? 0 : 1, isExpanded ? 1 : 0), [isExpanded]);
    const rStyle = useMemo(
        () => ({
            height: interpolate(base, {
                inputRange: [0, 1],
                outputRange: [85, options.length * 75 + 85]
            }),
            position: "relative"
        }),
        [base]
    );

    const dropdownItems = [header, ...options];

    const onToggle = () => {
        stopClock(clock);
        setIsExpanded(!isExpanded);
    };

    return (
        <Animated.View style={rStyle}>
            {dropdownItems.map((item, index) => (
                <DropdownListItem
                    key={index}
                    index={index}
                    {...item}
                    base={base}
                    dropdownItemsCount={dropdownItems.length}
                    onToggle={onToggle}
                />
            ))}
        </Animated.View>
    );
};

export { Dropdown };
