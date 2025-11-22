import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setFacialRegistered(value: boolean) {
    await AsyncStorage.setItem("facialRegistered", value ? "1" : "0");
}

export async function getFacialRegistered() {
    const v = await AsyncStorage.getItem("facialRegistered");
    return v === "1";
}
