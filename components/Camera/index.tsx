import React, { useState } from "react";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Image,
} from "react-native";
import { IPicture } from "../../App";
import LoadingLottie from "../LoadingLottie";

interface ICamraProps {
  setPicture: (params: IPicture) => void;
}

const Camera = ({ setPicture }: ICamraProps) => {
  const [type, setType] = useState(CameraType.back);
  const [loading, setLoading] = useState<boolean>(false);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  // const camera = React.useRef<Camera>(null);
  let camera: ExpoCamera;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    setLoading(true);
    try {
      if (!camera) return;
      const picture = await camera.takePictureAsync();

      if (picture) {
        setLoading(false);
        setPicture(picture);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(`${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <ExpoCamera
        autoFocus={false}
        focusDepth={1}
        zoom={0}
        ref={(r: ExpoCamera) => {
          camera = r;
        }}
        style={styles.camera}
        type={type}
      >
        {loading && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#ffffff80",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <LoadingLottie />
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: "40%",
              flexDirection: "row",
              marginBottom: "20%",
            }}
          >
            <View style={styles.gridCornerLT} />
            <View style={styles.gridCornerRT} />
          </View>
          <View style={{ marginTop: "50%", flexDirection: "row" }}>
            <View style={styles.gridCornerLB} />
            <View style={styles.gridCornerRB} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={loading}
              style={styles.button}
              onPress={takePicture}
            >
              <View style={[styles.insideCircle, { backgroundColor: "red" }]} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              style={styles.toggleButton}
              onPress={toggleCameraType}
            >
              <Text style={{ fontSize: 20 }}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ExpoCamera>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "relative",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  gridCornerLT: {
    width: 50,
    height: 80,
    marginRight: "30%",
    borderRadius: 6,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderColor: "#fff",
  },
  gridCornerRT: {
    width: 50,
    height: 80,
    marginLeft: "30%",
    borderRadius: 6,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderColor: "#fff",
  },
  gridCornerLB: {
    width: 50,
    height: 80,
    marginRight: "30%",
    borderRadius: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderColor: "#fff",
  },
  gridCornerRB: {
    width: 50,
    height: 80,
    marginLeft: "30%",
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: "#fff",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    width: 70,
    height: 70,
    borderWidth: 6,
    padding: 4,
    borderColor: "#fff",
    borderRadius: 100,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderWidth: 3,
    padding: 4,
    borderColor: "#fff",
    borderRadius: 100,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
  },
  insideCircle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 100,
  },
});
