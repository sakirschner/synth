import '@mantine/core/styles.css';
import Keys from './feature/keyboard/components/Keys';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Keys />
    </MantineProvider>
  );
}

export default App;
