import { useEffect, useRef } from 'react';

type Props = {
  stream: MediaStream;
};
export function Video({ stream }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className="rounded-xl w-40 h-40 bg-black"
      width="360"
      height="240"
      autoPlay
      muted
    />
  );
}
