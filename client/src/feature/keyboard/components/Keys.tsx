import { Box, Text } from '@mantine/core';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { BLACK_KEY_WIDTH, NOTES, WHITE_KEY_WIDTH } from '../utils/constants';
import { useKeyboardListener } from '../hooks/useKeyboardListener';
import { getIsSharp } from '../utils/getIsSharp';
import { getKeyStyle } from '../utils/getKeyStyle';
import { SynthContext } from '../../synth/state/SynthContextProvider';

export default function Keys() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const positionRef = useRef(0);

  const { synth } = useContext(SynthContext);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const note = NOTES[key];
      if (note && synth && !activeKeys.includes(key)) {
        setActiveKeys((activeKeys) => [...activeKeys, event.key]);
        synth.triggerAttack(note);
      }
    },
    [activeKeys, synth]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const note = NOTES[key];
      if (note && synth) {
        setActiveKeys((activeKeys) =>
          activeKeys.filter((activeKey) => activeKey !== key)
        );
        synth.triggerRelease(note);
      }
    },
    [synth]
  );

  useKeyboardListener({ eventName: 'keydown', handler: onKeyDown });
  useKeyboardListener({ eventName: 'keyup', handler: onKeyUp });

  const renderKey = useCallback(
    ([key, note]: [key: string, note: string]) => {
      const isSharp = getIsSharp(note);
      const keyWidth = isSharp ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH;
      const isActive = activeKeys.includes(key);

      let left = positionRef.current;
      if (isSharp) {
        left -= (WHITE_KEY_WIDTH - keyWidth) / 2;
      } else {
        positionRef.current += keyWidth;
      }

      return (
        <Box
          key={`${key}-${note}`}
          style={getKeyStyle({ isActive, isSharp, keyWidth, left })}
        >
          <Text
            style={{ color: isSharp ? 'white' : 'black' }}
            mb={isSharp ? 0 : '2em'}
          >
            {key}
          </Text>
        </Box>
      );
    },
    [activeKeys]
  );

  const keyboard = useMemo(() => {
    positionRef.current = 0;
    return Object.entries(NOTES).map(renderKey);
  }, [renderKey]);

  return (
    <Box style={{ display: 'flex', position: 'relative' }}>{keyboard}</Box>
  );
}
