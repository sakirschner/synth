import { Box, Text } from '@mantine/core';
import { getIsSharp } from '../utils/getIsSharp';
import { BLACK_KEY_WIDTH, WHITE_KEY_WIDTH } from '../utils/constants';
import { getKeyStyle } from '../utils/getKeyStyle';

interface Props {
  keyboardKey: string;
  note: string;
  isActive: boolean;
  onClick: (note: string) => void;
  position: number;
}

export default function Key({
  keyboardKey,
  note,
  isActive,
  onClick,
  position,
}: Props) {
  const isSharp = getIsSharp(note);
  const keyWidth = isSharp ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH;

  return (
    <Box
      key={`${keyboardKey}-${note}`}
      style={getKeyStyle({ isActive, isSharp, keyWidth, left: position })}
      onMouseUp={() => onClick(note)}
      onMouseDown={() => onClick(note)}
    >
      <Text
        style={{ color: isSharp ? 'white' : 'black' }}
        mb={isSharp ? 0 : '2em'}
      >
        {keyboardKey}
      </Text>
    </Box>
  );
}
