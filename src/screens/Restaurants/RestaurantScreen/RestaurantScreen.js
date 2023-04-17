import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { MyCarousel, Loading } from "../../../components/Shared";
import {
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
  BtnFavoriteNotLoged,
} from "../../../components/Restaurant";
import { db } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";

export function RestaurantScreen({ route }) {
  const [restaurant, setRestaurant] = useState(null);

  const [hasLogged, setHasLogged] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  if (!restaurant) return <Loading show text="Loading Restaurants" />;
  return (
    <ScrollView style={styles.content}>
      <MyCarousel arrayImages={restaurant.images} />
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={route.params.id} />
      <Reviews idRestaurant={route.params.id} />
      {hasLogged ? (
        <BtnFavorite idRestaurant={route.params.id} />
      ) : (
        <BtnFavoriteNotLoged />
      )}
    </ScrollView>
  );
}
