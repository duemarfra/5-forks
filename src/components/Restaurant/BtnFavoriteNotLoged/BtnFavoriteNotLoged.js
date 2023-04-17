import React from "react";
import { View } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./BtnFavoriteNotLoged.styles";

export function BtnFavoriteNotLoged() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };
  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart-outline"
        color="#00a680"
        size={35}
        onPress={goToLogin}
      />
    </View>
  );
}
