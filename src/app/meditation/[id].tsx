import { Text, View, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import FeatherIcon from "@expo/vector-icons/Feather";
import Slider from "@react-native-community/slider";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { meditations } from "@/data";
import audio from "../../../assets/meditations/audio1.mp3";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top } = useSafeAreaInsets();

  const meditation = meditations.find((m) => m.id === Number(id));

  const player = useAudioPlayer(audio);
  const status = useAudioPlayerStatus(player);

  const formatSeconds = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!meditation) return <Text>Meditation not found</Text>;

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      <AnimatedBackground />
      <View className="flex-1">
        <View
          className="flex-row justify-between items-center p-5"
          style={{ marginTop: top }}
        >
          <FeatherIcon name="info" size={24} color="black" />
          <View className="bg-zinc-800 p-2 rounded-md font-semibold">
            <Text className="text-zinc-100">Today's meditation</Text>
          </View>

          <FeatherIcon
            onPress={() => router.back()}
            name="x"
            size={24}
            color="black"
          />
        </View>

        <Text className="text-3xl mt-4 text-center font-semibold text-zinc-800">
          {meditation?.title}
        </Text>
      </View>

      {/* Play / pause button */}
      <Pressable
        onPress={() => (player.playing ? player.pause() : player.play())}
        className="bg-zinc-800 self-center w-24 aspect-square p-2 rounded-full items-center justify-center"
      >
        <FeatherIcon
          name={status.playing ? "pause" : "play"}
          size={24}
          color="snow"
        />
      </Pressable>

      {/* Footer */}
      <View className="p-5 flex-1 justify-end gap-5">
        <View className="flex-row justify-between">
          <FeatherIcon name="cast" size={24} color="#3A3937" />
          <FeatherIcon name="settings" size={24} color="#3A3937" />
        </View>
        {/* playback indicator */}
        <Slider
          style={{ width: "100%", height: 38 }}
          value={status.currentTime / status.duration}
          onSlidingComplete={(value) => {
            player.seekTo(value * status.duration);
          }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#3A3937"
          maximumTrackTintColor="#3A393755"
          thumbTintColor="#3A3937"
        />
        <View className="flex-row justify-between">
          <Text>{formatSeconds(status.currentTime)}</Text>
          <Text>{formatSeconds(status.duration)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
