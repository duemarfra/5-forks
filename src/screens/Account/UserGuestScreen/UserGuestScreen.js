import React from "react";
import { ScrollView } from "react-native";
import { Text, Button, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./UserGuestScreen.styles";

export function UserGuestScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>check out their 5 forks profile</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Search and view the best
        restaurants in a simple way, vote which one you liked the most and
        comment on how your experience has been.
      </Text>
      <Button
        title="View your profile"
        onPress={() => {
          navigation.navigate(screen.account.login);
        }}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}
