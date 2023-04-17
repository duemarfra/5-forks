import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿You still don't have an account?{" "}
          <Text
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate(screen.account.register);
            }}
          >
            Register here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
