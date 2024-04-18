import { useContext, useEffect, useRef } from 'react';
import { SynthContext } from '../../synth/state/SynthContextProvider';
import { Analyser } from 'tone';

export default function Screen() {
  const { synth } = useContext(SynthContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const analyser = new Analyser('waveform', 1024);

    if (synth && canvasRef.current) {
      synth.connect(analyser);

      const canvas = canvasRef?.current;
      const canvasContext = canvas?.getContext('2d');

      const drawWaveform = () => {
        requestAnimationFrame(drawWaveform);
        const waveform = analyser.getValue();
        canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext?.beginPath();
        canvasContext?.moveTo(0, canvas.height / 2);
        for (let i = 0; i < waveform.length; i++) {
          const x = (i / waveform.length) * canvas.width;
          const y = (((waveform[i] as number) + 1) / 2) * canvas.height;
          canvasContext?.lineTo(x, y);
        }
        canvasContext?.stroke();
      };

      drawWaveform();
    }

    return () => {
      analyser.dispose();
    };
  }, [synth]);

  return <canvas ref={canvasRef} width={800} height={200} />;
}
