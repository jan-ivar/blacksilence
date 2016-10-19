let silence = () => {
  let ctx = new AudioContext(), oscillator = ctx.createOscillator();
  let dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  return Object.assign(dst.stream.getAudioTracks()[0], {enabled: false});
}

let black = ({width = 640, height = 480} = {}) => {
  let canvas = Object.assign(document.createElement("canvas"), {width, height});
  canvas.getContext('2d').fillRect(0, 0, width, height);
  let stream = canvas.captureStream();
  return {track: Object.assign(stream.getVideoTracks()[0], {enabled: false}), stream};
}

let blackSilence = (...args) => {
  let {track, stream} = black(...args);
  return window.MediaStream ? new MediaStream([track, silence()])
                            : (stream.addTrack(silence()), stream); // Chrome kludge
};
