import AsyncStorage from '@react-native-async-storage/async-storage';

class DataPersistor {
  private static instance: DataPersistor;

  private constructor() {}

  public static sharedInstance(): DataPersistor {
    if (!DataPersistor.instance) {
      DataPersistor.instance = new DataPersistor();
    }
    return DataPersistor.instance;
  }

  public async getLastEpisodeFileName(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem('LastEpisodeFileName');
      return value ?? ""
    } catch (e) {
      return ""
    }
  }

  public async getLastSeriesFilePath(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem('LastSeriesFilePath');
      return value ?? ""
    } catch (e) {
      return ""
    }
  }

  public async setLastEpisodeFileName(filename: string) {
    try {
      await AsyncStorage.setItem('LastEpisodeFileName', filename);
    } catch (e) {
      // saving error
    }
  }

  public async setLastSeriesFilePath(filepath: string) {
    try {
      await AsyncStorage.setItem('LastSeriesFilePath', filepath);
    } catch (e) {
      // saving error
    }
  }
}

export default DataPersistor;