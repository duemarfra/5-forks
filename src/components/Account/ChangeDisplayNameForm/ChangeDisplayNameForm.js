import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/base";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { styles } from "./ChangeDisplayNameForm.styles";
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data";

export const ChangeDisplayNameForm = ({ onClose, onReload }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error to changing name and surname",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder="Name and surname"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title={"Change Name and surname"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
