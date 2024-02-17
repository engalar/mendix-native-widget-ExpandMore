import { createElement, useState } from "react";
import { View } from "react-native";
import { Clock, Value } from "react-native-reanimated";
import { DropdownListItem } from "./dropdown-list-item";

const Dropdown = ({ header, options }) => {
    const isExpanded = new Value(false);

    const dropdownItems = [header, ...options];

    return (
        <View>
            {dropdownItems.map((item, index) => (
                <DropdownListItem
                    key={index}
                    index={index}
                    {...item}
                    isExpanded={isExpanded}
                    dropdownItemsCount={dropdownItems.length}
                />
            ))}
        </View>
    );
};

export { Dropdown };
