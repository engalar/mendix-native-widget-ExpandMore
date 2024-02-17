import { createElement, useState, useMemo } from "react";
import { View } from "react-native";
import { stopClock, Clock } from "react-native-reanimated";
import { DropdownListItem } from "./dropdown-list-item";
import { runTiming, runSpring } from "./util";

const clock = new Clock();
const Dropdown = ({ header, options }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const base = useMemo(() => runSpring(clock, isExpanded ? 0 : 1, isExpanded ? 1 : 0), [isExpanded]);

    const dropdownItems = [header, ...options];

    const onToggle = () => {
        stopClock(clock);
        setIsExpanded(!isExpanded);
    };

    return (
        <View>
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
        </View>
    );
};

export { Dropdown };
