import React, { useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import Video, { ReactVideoSource, VideoRef } from 'react-native-video';

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const background: ReactVideoSource = { uri: 'https://vjs.zencdn.net/v/oceans.mp4' };
  const [paused, setPaused] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [rate, setRate] = useState(1);
  const [isHolding, setIsHolding] = useState(false);

  const handlePressIn = () => {
    const timeout = setTimeout(() => {
      setRate(3);
      setPaused(false);
      setIsHolding(true);
    }, 500);

    setHoldTimeout(timeout);
  };

  const handlePressOut = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
    }
    
    if (isHolding) {
      setRate(1);
      setIsHolding(false);
    } else {
      setPaused(!paused);
    }
  };
 
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Video 
        controls={false}
        paused={paused}
        rate={rate}
        ref={videoRef}
        repeat
        style={styles.backgroundVideo}
        source={background}
      />
    </TouchableWithoutFeedback>
  )
}

export default VideoPlayer;