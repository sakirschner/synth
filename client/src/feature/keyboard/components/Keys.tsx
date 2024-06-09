import { Box } from '@mantine/core';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { BLACK_KEY_WIDTH, NOTES, WHITE_KEY_WIDTH } from '../utils/constants';
import { useKeyboardListener } from '../hooks/useKeyboardListener';
import { SynthContext } from '../../synth/state/SynthContextProvider';
import Key from './Key';
import { getIsSharp } from '../utils/getIsSharp';

export default function Keys() {
  const { synth } = useContext(SynthContext);
  const positionRef = useRef(0);

  const [activeNotes, setActiveNotes] = useState<string[]>([]);

  const keyPositions = useMemo(() => {
    positionRef.current = 0;
    const positions: number[] = [];
    Object.entries(NOTES).forEach(([, note]) => {
      const isSharp = getIsSharp(note);
      const keyWidth = isSharp ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH;
      if (isSharp) {
        positions.push(positionRef.current - (WHITE_KEY_WIDTH - keyWidth) / 2);
      } else {
        positions.push(positionRef.current);
        positionRef.current += keyWidth;
      }
    });
    return positions;
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const note = NOTES[key];
      if (note && synth && !activeNotes.includes(note)) {
        setActiveNotes((prev) => [...prev, note]);
        synth.triggerAttack(note);
      }
    },
    [activeNotes, synth]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const note = NOTES[key];
      if (note && synth) {
        setActiveNotes((prev) =>
          prev.filter((activeNote) => activeNote !== note)
        );
        synth.triggerRelease(note);
      }
    },
    [synth]
  );

  useKeyboardListener({ eventName: 'keydown', handler: onKeyDown });
  useKeyboardListener({ eventName: 'keyup', handler: onKeyUp });

  const getIsActive = useCallback(
    (note: string) => {
      return activeNotes.includes(note);
    },
    [activeNotes]
  );

  const handleClickKey = useCallback(
    (note: string) => {
      if (getIsActive(note)) {
        setActiveNotes((prev) =>
          prev.filter((activeNote) => activeNote !== note)
        );
        synth?.triggerRelease(note);
      } else {
        setActiveNotes((prev) => [...prev, note]);
        synth?.triggerAttack(note);
      }
    },
    [getIsActive, synth]
  );

  return (
    <Box
      style={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {Object.entries(NOTES).map(([keyboardKey, note], index) => (
        <Key
          keyboardKey={keyboardKey}
          note={note}
          isActive={getIsActive(note)}
          onClick={handleClickKey}
          position={keyPositions[index]}
        />
      ))}
    </Box>
  );
}
