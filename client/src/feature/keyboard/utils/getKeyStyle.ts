import { CSSProperties } from 'react';

export const getKeyStyle = ({
  isActive,
  isSharp,
  keyWidth,
  left,
}: {
  isActive: boolean;
  isSharp: boolean;
  keyWidth: number;
  left: number;
}): CSSProperties => {
  return {
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
};
