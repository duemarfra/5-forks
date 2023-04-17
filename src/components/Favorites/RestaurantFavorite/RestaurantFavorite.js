import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { styles } from "./RestaurantFavorite.styles";

export function RestaurantFavorite({ restaurant }) {
  const navigation = useNavigation();
  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };
  const removeFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={removeFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
