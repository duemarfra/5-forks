import React, { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, Animated } from "react-native";
import { styles, width } from "./MyCarousel.styles";

export const MyCarousel = ({ arrayImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((activeIndex + 1) % arrayImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex * -width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <Animated.View
          style={[
            styles.carouselInner,
            { transform: [{ translateX: animation }] },
          ]}
        >
          {arrayImages.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={styles.indicatorContainer}>
        {arrayImages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};
