import { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
}

const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 440;
const STICKER_TOP = IMAGE_HEIGHT - 350;

export default function EmojiSticker({imageSize, stickerSource}: Props) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });
    
    const drag = Gesture.Pan().onChange((event) => {
        const nextX = translateX.value + event.changeX;
        const nextY = translateY.value + event.changeY;
        const stickerSize = scaleImage.value;

        translateX.value = Math.min(
            Math.max(nextX, 0),
            Math.max(0, IMAGE_WIDTH - stickerSize),
        );
        translateY.value = Math.min(
            Math.max(nextY, -STICKER_TOP),
            Math.max(0, IMAGE_HEIGHT - stickerSize - STICKER_TOP),
        );
    });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, {top: -350}]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image source={stickerSource}
                        resizeMode="contain"
                        style={[{width: imageSize, height: imageSize}, imageStyle]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}
