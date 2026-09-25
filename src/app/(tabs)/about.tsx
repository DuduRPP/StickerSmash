import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.intro}>
                <Text style={styles.eyebrow}>STICKERSMASH</Text>
                <Text style={styles.title}>Make ordinary photos feel like yours.</Text>
                <Text style={styles.description}>
                    StickerSmash is a small creative space for turning a favorite photo
                    into something playful, personal, and ready to share.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>How it works</Text>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>01</Text>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Choose a photo</Text>
                        <Text style={styles.stepDescription}>
                            Start with an image from your library or use the built-in background.
                        </Text>
                    </View>
                </View>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>02</Text>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Add your mood</Text>
                        <Text style={styles.stepDescription}>
                            Pick a sticker, drag it into place, and double-tap to resize it.
                        </Text>
                    </View>
                </View>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>03</Text>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Save the moment</Text>
                        <Text style={styles.stepDescription}>
                            When it feels right, save your finished creation to your device.
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.note}>
                <Text style={styles.noteTitle}>Made for small moments</Text>
                <Text style={styles.noteText}>
                    Your edits stay in your hands. StickerSmash keeps the experience simple,
                    focused, and centered on the images you choose.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#25292e",
        padding: 24,
        paddingBottom: 40,
    },
    intro: {
        marginBottom: 36,
        marginTop: 12,
    },
    eyebrow: {
        color: "#ffd33d",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        marginBottom: 12,
    },
    title: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "800",
        lineHeight: 38,
        marginBottom: 16,
    },
    description: {
        color: "#c7c9cc",
        fontSize: 16,
        lineHeight: 24,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 18,
    },
    step: {
        borderTopColor: "#42474d",
        borderTopWidth: 1,
        flexDirection: "row",
        paddingVertical: 16,
    },
    stepNumber: {
        color: "#ffd33d",
        fontSize: 14,
        fontWeight: "700",
        paddingTop: 2,
        width: 42,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },
    stepDescription: {
        color: "#aeb2b6",
        fontSize: 14,
        lineHeight: 21,
    },
    note: {
        backgroundColor: "#30353b",
        borderLeftColor: "#ffd33d",
        borderLeftWidth: 3,
        padding: 18,
    },
    noteTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    noteText: {
        color: "#c7c9cc",
        fontSize: 14,
        lineHeight: 21,
    },
    text: {
        color: "#fff",
    },
});
