import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
    return (
        <View>
            <Text>About Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
});
