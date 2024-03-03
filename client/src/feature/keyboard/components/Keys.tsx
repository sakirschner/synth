import { Box, Text } from '@mantine/core';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { BLACK_KEY_WIDTH, NOTES, WHITE_KEY_WIDTH } from '../utils/constants';
import { useKeyboardListener } from '../hooks/useKeyboardListener';
import { getIsSharp } from '../utils/getIsSharp';

export default function Keys() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const positionRef = useRef(0);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    setActiveKeys((activeKeys) => [...activeKeys, event.key]);
  }, []);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    setActiveKeys((activeKeys) =>
      activeKeys.filter((key) => key !== event.key)
    );
  }, []);

  useKeyboardListener({ eventName: 'keydown', handler: onKeyDown });
  useKeyboardListener({ eventName: 'keyup', handler: onKeyUp });

  const renderKey = useCallback(
    ([key, note]: [key: string, note: string]) => {
      const isSharp = getIsSharp(note);
      const keyWidth = isSharp ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH;
      const isActive = activeKeys[0] === key;

      let left = positionRef.current;

      if (isSharp) {
        left -= (WHITE_KEY_WIDTH - keyWidth) / 2;
      } else {
        positionRef.current += keyWidth;
      }

      const style: CSSProperties = {
        width: `${keyWidth}em`,
        height: isSharp ? '120px' : '200px',
        border: '1px solid black',
        position: 'absolute',
        left: `${left}em`,
        zIndex: isSharp ? 1 : 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: isActive ? 'yellow' : isSharp ? 'black' : 'white',
      };

      return (
        <Box key={`${key}-${note}`} style={style}>
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
