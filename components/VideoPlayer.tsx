import React, { useRef, useState, useEffect } from 'react';
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

interface VideoPlayerProps {
  source: ReactVideoSource
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const videoRef = useRef<VideoRef>(null);
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
        source={source}
      />
    </TouchableWithoutFeedback>
  )
}

export default VideoPlayer;