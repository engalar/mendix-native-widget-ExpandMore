import { createElement } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "./dropdown";

const options = [
    { label: "Charts", iconName: "barschart" },
    { label: "Book", iconName: "book" },
    { label: "Calendar", iconName: "calendar" },
    { label: "Camera", iconName: "camera" }
];

const header = {
    label: "Header",
    iconName: "ellipsis1"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "blue",
        // alignItems: "center",
        justifyContent: "center"
    }
});
export default function App() {
    return (
        <View style={styles.container}>
            <Dropdown header={header} options={options} />
        </View>
    );
}
