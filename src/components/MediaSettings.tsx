import { useContext } from 'react';

import { MediaContext } from '../stores/MediaStore';
import { DeviceSelect } from './DeviceSelect';
import { Video } from './Video';

export function MediaSettings() {
  const { userMediaStream, devices, selectedDevice, changeSelectedDevice } =
    useContext(MediaContext);

  const handleChangeDeivceSelect =
    (deviceKind: MediaDeviceKind) => (deviceId: string) =>
      changeSelectedDevice(deviceKind, deviceId);

  return (
    <div className="flex flex-col items-center  w-[40rem] px-6 py-10 border-slate-400 border-2 rounded-lg">
      <Video stream={userMediaStream} />
      <DeviceSelect
        onChange={handleChangeDeivceSelect('videoinput')}
        defaultValue={selectedDevice.videoinput?.deviceId ?? null}
        deviceType="카메라"
        devices={devices.videoinput}
      />
      <DeviceSelect
        onChange={handleChangeDeivceSelect('audioinput')}
        defaultValue={selectedDevice.audioinput?.deviceId ?? null}
        deviceType="마이크"
        devices={devices.audioinput}
      />
      <DeviceSelect
        onChange={handleChangeDeivceSelect('audiooutput')}
        defaultValue={selectedDevice.audiooutput?.deviceId ?? null}
        deviceType="스피커"
        devices={devices.audiooutput}
      />
    </div>
  );
}
