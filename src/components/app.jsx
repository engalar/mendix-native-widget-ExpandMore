import { createElement } from "react";
import { FlatList, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

const ListItem = ({ item, index }) => (
    <Animatable.View animation="bounceInLeft" duration={1000} delay={index * 200} style={{ marginBottom: 10 }}>
        <Text>{item.title}</Text>
    </Animatable.View>
);

const AnimatedFlatList = ({ data }) => (
    <FlatList
        data={data}
        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
        keyExtractor={item => item.id.toString()}
    />
);

const App = () => {
    const data = [
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
        { id: 3, title: "Item 3" },
        { id: 4, title: "Item 4" },
        { id: 5, title: "Item 5" }
    ];

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <AnimatedFlatList data={data} />
        </View>
    );
};

export default App;
