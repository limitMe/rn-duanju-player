import React from 'react';
import type { PropsWithChildren } from 'react';
import PagerView from 'react-native-pager-view';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const HorizontalPager = () => {
  return (
    <PagerView style={styles.horizontalPager} initialPage={1}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
      <View key="3">
        <Text>Third page</Text>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  horizontalPager: {
    width: '100%',
    height: '100%'
  },
});

export default HorizontalPager;