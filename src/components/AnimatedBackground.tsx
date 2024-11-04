import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  withDelay,
} from "react-native-reanimated";

export default function AnimatedBackground() {
  const { height } = useWindowDimensions();

  const top1 = useSharedValue(0.3 * height);
  const top2 = useSharedValue(0.5 * height);
  const top3 = useSharedValue(0.7 * height);

  useEffect(() => {
    const options = {
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
    };
    top1.value = withRepeat(withTiming(0.2 * height, options), -1, true);
    top2.value = withDelay(
      1000,
      withRepeat(withTiming(0.4 * height, options), -1, true)
    );
    top3.value = withDelay(
      2000,
      withRepeat(withTiming(0.6 * height, options), -1, true)
    );
  });

  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 items-center">
      <Animated.View
        className="absolute w-[400%] aspect-square rounded-full bg-yellow-400 top-[30%]"
        style={{ top: top1 }}
      />
      <Animated.View
        className="absolute w-[400%] aspect-square rounded-full bg-yellow-300 top-[50%]"
        style={{ top: top2 }}
      />
      <Animated.View
        className="absolute w-[400%] aspect-square rounded-full bg-orange-500 top-[70%]"
        style={{ top: top3 }}
      />
    </View>
  );
}
