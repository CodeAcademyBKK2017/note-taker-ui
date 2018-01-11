import {AsyncStorage} from 'react-native';

class Utility {
    filterNotes = (notes, idToFilter) => notes.filter((item) => item.id !== idToFilter);
    setItemToStroage = (key, data) =>  AsyncStorage.setItem(key, JSON.stringify(data));
    getItemToStroage = async (key) => {
      try {
        return JSON.parse(await AsyncStorage.getItem(key));
      } catch (e) {
        return e;
      }
    }
}

export default new Utility();
