import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { IPicture } from "../../App";

interface IPictureProps {
  picture: IPicture;
  setPicture: (params: IPicture | null) => void;
}

const Picture = ({ picture, setPicture }: IPictureProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image
          style={{ width: "100%", height: "90%" }}
          source={{ uri: picture.uri }}
        />
        <TouchableOpacity
          style={{
            height: "10%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setPicture(null)}
        >
          <Text>Take other picture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Picture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  pictureContainer: {
    paddingBottom: "6%",
  },
});
