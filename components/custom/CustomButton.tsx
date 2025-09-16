import  { ReactNode } from "react";
import { Pressable, Text, StyleSheet, View, ViewStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  pressedStyle?: ViewStyle;
  icon?: ReactNode;
  righticon?: ReactNode;
}

export default function CustomButton({
  title,
  onPress,
  style,
  pressedStyle,
  icon,
  righticon,
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && (pressedStyle || styles.buttonPressed),
        style,
      ]}
      onPress={onPress}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <Text style={styles.text}>{title}</Text>

      {righticon ? <View style={styles.icon}>{righticon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F4B400",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    gap: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#F48400",
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
