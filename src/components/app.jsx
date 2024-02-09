import { createElement, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

const ListItem = ({ item, index }) => (
    <Animatable.View
        animation="bounceInLeft"
        duration={1000}
        delay={index * 200}
        style={{ marginBottom: 10, backgroundColor: "#F5FCFF" }}
    >
        <Text>{item.title}</Text>
    </Animatable.View>
);

const AnimatedFlatList = ({ data, expanded }) => (
    <FlatList
        data={expanded ? data : [data[0]]} // 如果展开则显示所有数据，否则只显示第一条
        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
        keyExtractor={item => item.id.toString()}
    />
);

const App = () => {
    const [expanded, setExpanded] = useState(false);

    const data = [
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
        { id: 3, title: "Item 3" },
        { id: 4, title: "Item 4" },
        { id: 5, title: "Item 5" }
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={{ padding: 10, backgroundColor: "#ccc", borderRadius: 5 }}
                >
                    <Text>{expanded ? "Collapse" : "Expand more"}</Text>
                </TouchableOpacity>
            </View>
            <AnimatedFlatList data={data} expanded={expanded} />
        </View>
    );
};

export default App;
