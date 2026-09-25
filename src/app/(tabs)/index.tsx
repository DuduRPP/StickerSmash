import Button from "@/components/button";
import CircleButton from "@/components/circle-button";
import EmojiList from "@/components/emoji-list";
import EmojiPicker from "@/components/emoji-picker";
import EmojiSticker from "@/components/emoji-sticker";
import IconButton from "@/components/icon-button";
import ImageViewer from "@/components/image-viewer";
import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library/legacy";
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setPickedEmoji(undefined);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if(Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved successfully!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: imageSize.width,
          height: imageSize.height,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
    
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View
          ref={imageRef}
          collapsable={false}
          style={styles.imageFrame}
          onLayout={({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout;
            setImageSize((current) =>
              current.width === width && current.height === height ? current : { width, height }
            );
          }}
        >
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji && (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
              imageWidth={imageSize.width}
              imageHeight={imageSize.height}
            />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 640,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  imageFrame: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  footerContainer: {
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  optionsContainer: {
    width: "100%",
    maxWidth: 520,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  optionsRow: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
