import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "@rneui/base";
import { styles } from "./Loading.styles";

export function Loading({ show, text }) {
  if (!show) return null;
  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#00a680" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
