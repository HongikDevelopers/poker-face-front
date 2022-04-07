import { useEffect, useState } from 'react';

const getConnectedDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices;
};

export type Devices = Record<MediaDeviceKind, MediaDeviceInfo[]>;

export const initialDevices: Devices = {
  audioinput: [],
  audiooutput: [],
  videoinput: [],
};
export function useEnumerateDevice() {
  const [devices, setDevices] = useState<Devices>(initialDevices);

  const enumerateDevices = async () => {
    try {
      const devices = await getConnectedDevices();
      const newDevices: Devices = {
        audioinput: devices.filter((device) => device.kind === 'audioinput'),
        audiooutput: devices.filter((device) => device.kind === 'audiooutput'),
        videoinput: devices.filter((device) => device.kind === 'videoinput'),
      };

      setDevices(newDevices);
    } catch (err) {
      console.error(err);
      setDevices({ ...initialDevices });
    }
  };

  useEffect(() => {
    enumerateDevices();

    const handleDeviceChange = () => enumerateDevices();
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    return () =>
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        handleDeviceChange,
      );
  }, []);

  return devices;
}
