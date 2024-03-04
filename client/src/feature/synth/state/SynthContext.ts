import { createContext } from 'react';
import { PolySynth, Synth, type SynthOptions } from 'tone';

export interface ISynthContext {
  synth: PolySynth<Synth<SynthOptions>> | null;
}

export const SynthContext = createContext<ISynthContext>({
  synth: null,
});
