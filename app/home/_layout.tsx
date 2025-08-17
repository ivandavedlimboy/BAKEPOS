import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index"    options={{ headerShown: false}}/>
      <Stack.Screen name="home"   options={{ headerShown: true, title: "" }}/>
      <Stack.Screen name="classic"   options={{ headerShown: true, title: "" }}/>
      <Stack.Screen name="partyset"   options={{ headerShown: true, title: "" }}/>
      <Stack.Screen name="checkout"   options={{ headerShown: true, title: "" }}/>
    </Stack>
  );
}
//hay nakoooooooooooooooooooooooooooooo
