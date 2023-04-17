import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Modal } from "../../../Shared";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { styles } from "./MapForm.styles";
import { Button } from "@rneui/base";

export const MapForm = ({ show, close, formik }) => {
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Go to application settings and activate location",
        });
        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
        style={styles.mapStyle}
      >
        <Marker draggable coordinate={location} />
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Save"
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={saveLocation}
        />

        <Button
          title="Close"
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
          onPress={close}
        />
      </View>
    </Modal>
  );
};
