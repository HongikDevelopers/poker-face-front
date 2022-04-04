import { createContext, PropsWithChildren } from 'react';
import { useEnumerateDevice } from '../hooks/useEnumerateDevice';
import { useUserMediaStream } from '../hooks/useUserMediaStream';

type MediaContextType = {
  userMediaStream: MediaStream | null;
  devices: MediaDeviceInfo[];
};

type Props = {};

export const MediaContext = createContext<MediaContextType>({
  userMediaStream: null,
  devices: [],
});

const mediaStreamConstraints: MediaStreamConstraints = {
  video: true,
};

export const MediaStore = (props: PropsWithChildren<Props>) => {
  const userMediaStream = useUserMediaStream(mediaStreamConstraints);
  const devices = useEnumerateDevice();

  return (
    <MediaContext.Provider
      value={{
        userMediaStream,
        devices,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};
