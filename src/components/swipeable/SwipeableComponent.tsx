import React, { type ReactNode } from 'react';
import { useSwipeable, type SwipeableHandlers } from 'react-swipeable';

interface SwipeableDivProps {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
  onSwipedUp: () => void;
  onSwipedDown: () => void;
  children: ReactNode;
}

const SwipeableDiv = ({ onSwipedLeft, onSwipedRight, onSwipedUp, onSwipedDown, children } : SwipeableDivProps) => {
    const handlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        onSwipedUp,
        onSwipedDown
    });

  return <div {...handlers}>{children}</div>;
};

export default SwipeableDiv;
