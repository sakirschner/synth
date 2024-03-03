import { useEffect, useRef } from 'react';

type KeyboardEventName = 'keydown' | 'keypress' | 'keyup';

type EventHandler = (event: KeyboardEvent) => void;

export const useKeyboardListener = ({
  eventName,
  handler,
}: {
  eventName: KeyboardEventName;
  handler: EventHandler;
}) => {
  const savedHandler = useRef<EventHandler | undefined>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
