import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useEnumerateDevice,
  Devices,
  initialDevices,
} from '../hooks/useEnumerateDevice';
import { useUserMediaStream } from '../hooks/useUserMediaStream';

type MediaContextType = {
  userMediaStream: MediaStream;
  devices: Devices;
  selectedDevice: SelectedDevice;
  changeSelectedDevice: (kind: MediaDeviceKind, deviceId: string) => void;
};

type Props = {};

export type SelectedDevice = Record<MediaDeviceKind, MediaDeviceInfo | null>;

const initialSelectedDevice: SelectedDevice = {
  audioinput: null,
  audiooutput: null,
  videoinput: null,
};

export const MediaContext = createContext<MediaContextType>({
  userMediaStream: new MediaStream(),
  devices: initialDevices,
  selectedDevice: initialSelectedDevice,
  changeSelectedDevice: () => {},
});

export const MediaStore = (props: PropsWithChildren<Props>) => {
  const [selectedDevice, setSelectedDevice] = useState<SelectedDevice>(
    initialSelectedDevice,
  );

  // TODO:
  // 1. constraints 세분화(size 등)
  const constraints: MediaStreamConstraints = useMemo(() => {
    const videoinputDeviceId = selectedDevice.videoinput?.deviceId;
    const audioinputDeviceId = selectedDevice.audioinput?.deviceId;
    return {
      video: {
        deviceId: videoinputDeviceId && {
          exact: videoinputDeviceId,
        },
      },
      audio: {
        deviceId: audioinputDeviceId && {
          exact: audioinputDeviceId,
        },
      },
    };
  }, [selectedDevice]);

  const userMediaStream = useUserMediaStream(constraints);
  const devices = useEnumerateDevice();

  const changeSelectedDevice = (kind: MediaDeviceKind, deviceId: string) => {
    setSelectedDevice({
      ...selectedDevice,
      [kind]:
        devices[kind].find((device) => device.deviceId === deviceId) ?? null,
    });
  };

  useEffect(() => {
    setSelectedDevice({
      videoinput: devices.videoinput[0] ?? null,
      audioinput: devices.audioinput[0] ?? null,
      audiooutput: devices.audiooutput[0] ?? null,
    });
  }, [devices]);

  return (
    <MediaContext.Provider
      value={{
        userMediaStream,
        devices,
        selectedDevice,
        changeSelectedDevice,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};
