import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Camera from "./components/Camera";
import Picture from "./components/Picture";

export interface IPicture {
  height: number;
  width: number;
  uri: string;
}

export default function App() {
  const [picture, setPicture] = useState<IPicture | null>(null);

  return (
    <>
      {!picture ? (
        <Camera setPicture={setPicture} />
      ) : (
        <Picture setPicture={setPicture} picture={picture} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
