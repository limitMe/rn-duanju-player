import React, { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import PagerView from 'react-native-pager-view';
import {
  StyleSheet,
  View,
} from 'react-native';

const MatrixPager: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const pagerRef = useRef<PagerView>(null);
  const handlePageSelected = (event: { nativeEvent: { position: number } }) => {    
    if (pagerRef.current && event.nativeEvent.position !== 1) {
      pagerRef.current.setPageWithoutAnimation(1)
    }
  };

  return (
    <PagerView
      ref={pagerRef}
      style={styles.horizontalPager}
      initialPage={1}
      onPageSelected={handlePageSelected}
    >
      <View key="1">
        <VerticalPager />
      </View>
      <View key="2">
        <VerticalPager>{children}</VerticalPager>
      </View>
      <View key="3">
        <VerticalPager />
      </View>
    </PagerView>
  );
};

const VerticalPager: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const hasChildren = React.Children.count(children) > 0
  const pagerRef = useRef<PagerView>(null);
  const handlePageSelected = (event: { nativeEvent: { position: number } }) => {    
    if (pagerRef.current && event.nativeEvent.position !== 1) {
      pagerRef.current.setPageWithoutAnimation(1)
    }
  };

  return (
    <PagerView
      ref={pagerRef}
      style={styles.verticalPager}
      orientation='vertical'
      initialPage={1}
      onPageSelected={handlePageSelected}
    >
      <View key="1" style={styles.emptyPager}></View>
      <View key="2" style={hasChildren ? styles.contentPager : styles.emptyPager}>
        {children}
      </View>
      <View key="3" style={styles.emptyPager}></View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  horizontalPager: {
    width: '100%',
    height: '100%'
  },
  verticalPager: {
    width: '100%',
    height: '100%'
  },
  emptyPager: {
    backgroundColor: '#000'
  },
  contentPager: {
    backgroundColor: '#fff'
  },
});

export default MatrixPager;