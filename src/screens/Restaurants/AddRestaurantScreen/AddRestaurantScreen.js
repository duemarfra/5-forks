import React from "react";
import { View, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  InfoForm,
  UploadImageForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurant";
import { db } from "../../../utils";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { styles } from "./AddRestaurantScreen.styles";

export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;
  const myTime = new Date().getTime();
  const uuid = user.uid + myTime;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid;
        newData.createdAt = new Date();

        await setDoc(doc(db, "restaurants", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImageForm formik={formik} />
      <Button
        title="Add Restaurant"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
