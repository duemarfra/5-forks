import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { screen, db } from "../../../utils";
import { styles } from "./BtnReviewForm.styles";

export function BtnReviewForm({ idRestaurant }) {
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReview(true);
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screens: screen.account.login,
    });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurantScreen, {
      idRestaurant,
    });
  };

  if (hasLogged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSendReview}>
          You already reviewed this restaurant
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Write your opinion of this restaurant"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Log in to write an opinion.{" "}
          <Text style={styles.textClick}>Log in here</Text>
        </Text>
      )}
    </View>
  );
}
