import React, { useEffect, useState } from 'react';

const getConnectedDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices;
};

export function useEnumerateDevice() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const enumerateDevices = async () => {
    try {
      const devices = await getConnectedDevices();
      setDevices(devices);
    } catch (err) {
      console.error(err);
      setDevices([]);
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
