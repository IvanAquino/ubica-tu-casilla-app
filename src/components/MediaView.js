import React from 'react';
import { Dimensions } from 'react-native';
import { NativeMediaView } from 'react-native-admob-native-ads';

export const MediaView = ({ aspectRatio = 1.5 }) => {
  const onVideoPlay = () => {
    console.log('VIDEO', 'PLAY', 'Video is now playing');
  };

  const onVideoPause = () => {
    console.log('VIDEO', 'PAUSED', 'Video is now paused');
  };

  const onVideoProgress = event => {
    console.log('VIDEO', 'PROGRESS UPDATE', event);
  };

  const onVideoEnd = () => {
    console.log('VIDEO', 'ENDED', 'Video end reached');
  };

  const onVideoMute = muted => {
    console.log('VIDEO', 'MUTE', muted);
  };

  return (
    <NativeMediaView
      style={{
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').width / aspectRatio,
        backgroundColor: 'white',
      }}
      onVideoPause={onVideoPause}
      onVideoPlay={onVideoPlay}
      onVideoEnd={onVideoEnd}
      onVideoProgress={onVideoProgress}
      onVideoMute={onVideoMute}
    />
  );
};
