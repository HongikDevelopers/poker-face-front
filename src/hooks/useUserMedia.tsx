import React, { useEffect, useState } from 'react';

const getMediaTracksWithConstraints = async (
  constraints: MediaStreamConstraints,
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return [...stream.getTracks()];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export function useUserMedia(constraints: MediaStreamConstraints) {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(
    null,
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

        setUserMediaStream(stream);
      };

      getUserMedia();
    },
    [constraints],
  );

  return userMediaStream;
}
