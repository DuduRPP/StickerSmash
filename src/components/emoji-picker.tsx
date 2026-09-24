import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Choose a sticker</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" size={22} color="#fff" />
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        height: "25%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "16%",
        backgroundColor: "#464c55",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 16,
    },
})
