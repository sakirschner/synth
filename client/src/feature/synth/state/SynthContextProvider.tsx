import { createContext, useMemo, type ReactNode } from 'react';
import { PolySynth, Synth, SynthOptions } from 'tone';

export interface ISynthContext {
  synth: PolySynth<Synth<SynthOptions>> | null;
}

export const SynthContext = createContext<ISynthContext>({
  synth: null,
});

export function SynthContextProvider({ children }: { children: ReactNode }) {
  const synth = useMemo(() => {
    return new PolySynth(Synth, {
      oscillator: { type: 'sine' },
    }).toDestination();
  }, []);

  synth.maxPolyphony = 6;
  synth.set({ oscillator: { type: 'sine' } });

  const synthContextValue: ISynthContext = {
    synth,
  };

  // console.log(synth.get());

  return (
    <SynthContext.Provider value={synthContextValue}>
      {children}
    </SynthContext.Provider>
  );
}
