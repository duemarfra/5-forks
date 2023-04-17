import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon } from "@rneui/base";
import { AirbnbRating, Rating } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./RestaurantRanking.styles";

export function RestaurantRanking({ restaurant, index }) {
  const navigation = useNavigation();

  const goTORestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7f32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goTORestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
          <AirbnbRating
            count={5}
            defaultRating={restaurant.ratingMedia}
            size={15}
            readonly
            isDisabled
            showRating={false}
          />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
