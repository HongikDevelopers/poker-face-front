import { useEffect, useState } from 'react';

const getMediaTracksWithConstraints = async (
  constraints: MediaStreamConstraints,
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return [...stream.getTracks()];
  } catch (err) {
    // TODO:
    // 1. OverconstrainedError 처리
    console.error(err);
    return [];
  }
};

export function useUserMediaStream(constraints: MediaStreamConstraints) {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream>(
    new MediaStream(),
  );

  useEffect(
    function () {
      const getUserMedia = async () => {
        const videoTracks = await getMediaTracksWithConstraints({
          video: constraints.video,
        });
        const audioTracks = await getMediaTracksWithConstraints({
          audio: constraints.audio,
        });
        const tracks = [...videoTracks, ...audioTracks];
        const stream = new MediaStream(tracks);

        setUserMediaStream((prevStream) => {
          prevStream.getTracks().forEach((track) => track.stop());
          return stream;
        });
      };

      getUserMedia();
    },
    [constraints],
  );

  return userMediaStream;
}
