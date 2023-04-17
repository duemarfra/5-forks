import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { v4 as uuid } from "uuid";
import { map, filter } from "lodash";
import { LoadingModal } from "../../../Shared";
import { styles } from "./UploadImageForm.styles";

export const UploadImageForm = ({ formik }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const timeImage = new Date().getTime();
  const uidImage = user.uid + timeImage;

  const [isLoading, setIsLoading] = useState(false);
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${uidImage}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosRestaurant(snapshot.metadata.fullPath).catch((error) => {
        console.log(error);
      });
    });
  };

  const updatePhotosRestaurant = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsLoading(false);
  };

  const removeImage = (img) => {
    Alert.alert(
      "Delete image",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const result = filter(
              formik.values.images,
              (image) => image != img
            );
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => {
              removeImage(image);
            }}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="uploading image" />
    </>
  );
};
