import { AsyncStorage as RNAsyncStorage } from "react-native";

const getItem = async (key, callback) => {
  const value = await RNAsyncStorage.getItem(key, callback);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

const setItem = async (key, value, callback) => {
  const valueStr = JSON.stringify(value);
  await RNAsyncStorage.setItem(key, valueStr, callback);
};

const removeItem = async (key, callback) => {
  return await RNAsyncStorage.removeItem(key, callback);
};

const printAsyncStorage = async () => {
  let keys = await RNAsyncStorage.getAllKeys();
  keys = keys.filter(key => ["@Settings/language"].includes(key));

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    console.log("Key:   ", key);
    const value = await getItem(key);
    console.log("Value: ", value);
    console.log(" ");
  }
};

export const AsyncStorage = {
  getItem,
  setItem,
  removeItem,
  printAsyncStorage
};
