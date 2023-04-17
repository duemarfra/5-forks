import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/base";
import { AirbnbRating } from "@rneui/themed";
import { styles } from "./Header.styles";

export function Header({ restaurant }) {
  const rating = 2.3;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.contentRating}>
          <AirbnbRating
            count={5}
            defaultRating={restaurant.ratingMedia | 0}
            size={20}
            readonly
            isDisabled
            showRating={false}
          />
        </View>
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
