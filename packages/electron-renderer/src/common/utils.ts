const { desktopCapturer } = window.require('electron');
const Event = require('events');

export const eventHub = new Event();

export async function getScreenStream() {
  const resources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  (navigator as any).webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: resources[1].id,
        maxWidth: window.screen.width,
        maxHeight: window.screen.height,
      }
    }
  }, (stream: MediaProvider) => {
    eventHub.emit('add-stream', stream)
  }, (err: any) => {
    console.error(err);
  })
}

// 等比缩放鼠标点击坐标（DOM映射屏幕）
export const scalarPosition = (x: number, y: number, video: HTMLVideoElement) => {
  const newX = x * video.videoWidth / screen.width;
  const newY = y * video.videoHeight / screen.height;
  return {
    x: newX,
    y: newY,
  }
}

