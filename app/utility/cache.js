import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';

const prefix = 'cache';
const expireInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = item => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, 'minute') > expireInMinutes;
};

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    // check if item has expired. If expired, move from cach
    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    // item hasn't expired
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
