import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
});
