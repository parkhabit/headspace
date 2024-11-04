import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { meditations } from "@/data";
import { MeditationListItem } from "@/components/MeditationListItem";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <View className="pt-10 pl-10">
        <Text>Good morning,</Text>
        <Text className="text-3xl font-semibold pb-3">Start your day</Text>
      </View>

      <FlatList
        data={meditations}
        contentContainerClassName="gap-4 p-3"
        renderItem={({ item }) => <MeditationListItem meditation={item} />}
      />
    </SafeAreaView>
  );
}
