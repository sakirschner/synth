import '@mantine/core/styles.css';
import Keys from './feature/keyboard/components/Keys';
import { MantineProvider } from '@mantine/core';
import { SynthContextProvider } from './feature/synth/state/SynthContextProvider';

function App() {
  return (
    <MantineProvider>
      <SynthContextProvider>
        <Keys />
      </SynthContextProvider>
    </MantineProvider>
  );
}

export default App;
