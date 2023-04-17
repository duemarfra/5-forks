import { StyleSheet, Dimensions } from "react-native";

export const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    width,
    height: 220,
    overflow: "hidden",
  },
  carouselInner: {
    flexDirection: "row",
  },
  slide: {
    width,
    height: 250,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#00a680",
    marginHorizontal: 5,
    marginHorizontal: 15,
  },
  activeIndicator: {
    width: 12,
    height: 12,
    backgroundColor: "#00a680",
  },
});
