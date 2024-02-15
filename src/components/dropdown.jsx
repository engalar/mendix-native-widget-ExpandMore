import { createElement, useState } from "react";
import { View } from "react-native";
import { DropdownListItem } from "./dropdown-list-item";

const Dropdown = ({ header, options }) => {
    const dropdownItems = [header, ...options];
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <View>
            {dropdownItems.map((item, index) => (
                <DropdownListItem
                    key={index}
                    index={index}
                    {...item}
                    isExpanded={isExpanded}
                    dropdownItemsCount={dropdownItems.length}
                    onPress={idx => {
                        if (idx === 0) setIsExpanded(!isExpanded);
                    }}
                />
            ))}
        </View>
    );
};

export { Dropdown };
