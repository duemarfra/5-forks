import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "@rneui/base";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { size, forEach } from "lodash";
import { db } from "../../../utils";
import { styles } from "./BtnFavorite.styles";

export function BtnFavorite({ idRestaurant }) {
  const auth = getAuth();

  const user = auth.currentUser;
  const myTime = new Date().getTime();
  const uuid = user.uid + myTime;

  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [idRestaurant, isReload]);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", user.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuid;
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: user.uid,
      };

      await setDoc(doc(db, "favorites", idFavorite), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00f00" : "#000000"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}
