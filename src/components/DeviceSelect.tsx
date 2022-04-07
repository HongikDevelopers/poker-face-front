import { ChangeEvent } from 'react';

type Props = {
  deviceType: string;
  defaultValue: string | null;
  devices: MediaDeviceInfo[];
  onChange: (deviceId: string) => void;
};

export function DeviceSelect({
  deviceType,
  defaultValue,
  devices,
  onChange,
}: Props) {
  return (
    <label className="flex flex-col">
      {deviceType}
      {defaultValue ? (
        <select
          value={defaultValue}
          className="w-[30rem]"
          onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
            const value = evt.target.value;
            onChange(value);
          }}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      ) : (
        <select className="w-[30rem]">
          <option>`${deviceType} 없음`</option>
        </select>
      )}
    </label>
  );
}
