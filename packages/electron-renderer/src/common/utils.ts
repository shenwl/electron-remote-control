const { desktopCapturer } = window.require('electron');
const Event = require('events');

export const eventHub = new Event();

export async function getScreenStream() {
  const resources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: resources[0].id,
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