import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: "#ffffff",
  },
  image: {
    height: 150,
    width: "100%",
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medal: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
