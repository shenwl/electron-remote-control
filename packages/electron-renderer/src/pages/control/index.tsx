import React, { useState, useEffect } from 'react';
import { eventHub, getScreenStream } from '../../common/utils';
// import { IPC_EVENTS, CONTROL_TYPE } from '../../constants';


export default function Control() {
  const play = (steam: MediaProvider) => {
    const $video = document.getElementById('video') as HTMLVideoElement;
    $video.srcObject = steam;
    $video.play();
  }

  const init = async () => {
    getScreenStream();
    eventHub.on('add-stream', (steam: MediaProvider) => play(steam));
  }

  useEffect(() => {
    init();
  }, []);


  return (
    <div>
      <video id="video"></video>
    </div>
  );
}
