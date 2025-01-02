/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid
} from 'react-native';
import RNFS from 'react-native-fs';

import ManageExternalStorage from 'react-native-external-storage-permission';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import MatrixPager from './components/MatrixPager';
import VideoPlayer from './components/VideoPlayer';
import { DuanjuSeriesType, DuanjuSeries, DuanjuEpisodeType, DuanjuEpisode } from "./models/Duanju"
import DuanjuManager from './models/DuanjuManager';
import DataPersistor from './models/DataPersistor';


const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to read videos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const initDuanjuManager = async () => {
  const rootPath = `${RNFS.ExternalStorageDirectoryPath}/DJ`;
  const filesUnderRootPath = await RNFS.readDir(rootPath);
  const foldersUnderRootPath = filesUnderRootPath.filter(file => file.isDirectory())
  let allSeries: DuanjuSeriesType[] = []
  const promises = foldersUnderRootPath.map(async (folder) => {
    let videoFiles = await RNFS.readDir(`${rootPath}/${folder.name}`)
    let newSeries = new DuanjuSeries(folder.path)
    videoFiles.forEach((video) => {
      if (!video.name.endsWith(".mp4")) { return }
      // 过滤拷贝时重复的文件
      if (video.name.endsWith("(1).mp4")) { return }
      let newEpisode = new DuanjuEpisode(video.name)
      newSeries.addEpisode(newEpisode)
    })
    newSeries.sortEpisodes()
    allSeries.push(newSeries)
  })

  await Promise.all(promises)

  const manager = new DuanjuManager(
    allSeries,
    await DataPersistor.sharedInstance().getLastSeriesFilePath(),
    await DataPersistor.sharedInstance().getLastEpisodeFileName()
  )
  return manager
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const init = async () => {
      // Seems useless on latest Android but keep it for now
      const hasPermission = await requestStoragePermission();
      // Android 13 updated some permission models about media files and current react-native has not supported well
      const morePermissions = await ManageExternalStorage.checkAndGrantPermission();

      const manager = await initDuanjuManager()
    };

    init()
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <MatrixPager>
        <VideoPlayer />
      </MatrixPager>
    </SafeAreaView>
  );
}


export default App;
