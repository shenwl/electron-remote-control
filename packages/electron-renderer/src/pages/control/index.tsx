import React, { useEffect } from 'react';
import { eventHub, getScreenStream, scalarPosition } from '../../common/utils';
import { IPC_EVENTS, CONTROL_TYPE } from '../../constants';
const { ipcRenderer } = window.require('electron');


export default function Control() {
  const play = (steam: MediaProvider) => {
    const $video = document.getElementById('video') as HTMLVideoElement;
    $video.srcObject = steam;
    $video.play();
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const data = {
      keyCode: e.keyCode,
      shift: e.shiftKey,
      meta: e.metaKey,
      ctrl: e.ctrlKey,
      alt: e.altKey,
    }
    ipcRenderer.send(IPC_EVENTS.ROBOT, 'key', data);
  }

  const handleMouseUp = (e: MouseEvent) => {
    const pos = scalarPosition(
      e.clientX, e.clientY,
      document.getElementById('video') as HTMLVideoElement,
    );
    ipcRenderer.send(IPC_EVENTS.ROBOT, 'mouse', pos);
  }

  const init = async () => {
    getScreenStream();
    eventHub.on('add-stream', (steam: MediaProvider) => play(steam));
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mouseup', handleMouseUp);
  }

  useEffect(() => {
    init();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, []);


  return (
    <div>
      <video id="video"></video>
    </div>
  );
}
