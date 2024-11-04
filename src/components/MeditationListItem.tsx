import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Meditation } from "@/types";
import FeatherIcon from "@expo/vector-icons/Feather";

export function MeditationListItem({ meditation }: { meditation: Meditation }) {
  const id = meditation.id.toString();
  return (
    <Link href={`../meditation/${id}`} asChild>
      <Pressable className="flex-row items-center gap-5">
        <View className="bg-green-700 p-1 w-6 aspect-square items-center justify-center rounded-full">
          <FeatherIcon name="check" size={16} color="white" />
        </View>

        <View className="flex-1 p-5  bg-neutral-100 rounded-2xl">
          <Text className="font-semibold text-xl mb-2">{meditation.title}</Text>

          <View className="flex-row items-center gap-2 pb-2">
            <FeatherIcon name="volume-2" size={16} color="dimgray" />
            <Text className="font-bold text-orange-600">
              {meditation.subtitle}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <FeatherIcon name="clock" size={16} color="dimgray" />
            <Text className="text-gray-600">{meditation.duration} min</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
