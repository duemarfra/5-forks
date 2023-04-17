import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "@rneui/base";
import { AirbnbRating } from "@rneui/themed";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { map } from "lodash";
import { DateTime } from "luxon";
import { Loading } from "../../Shared";
import { db } from "../../../utils";
import { styles } from "./Reviews.styles";
import "intl";
import "intl/locale-data/jsonp/es";

export function Reviews({ idRestaurant }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) return <Loading show text="cargando" />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();
        const createdReview = new Date(data.createdAt.seconds * 1000);
        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subTitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    size={15}
                    isDisabled
                    showRating={false}
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(createdReview.toISOString()).toFormat(
                      "yyyy/LL/dd - hh:mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
