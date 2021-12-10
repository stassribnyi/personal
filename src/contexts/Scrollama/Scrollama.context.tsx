import React, { createContext, useContext, useState } from 'react';
import { Scrollama } from 'react-scrollama';

export enum MoveDirection {
  UP = 'up',
  DOWN = 'down',
}

export enum StepDirection {
  ENTER,
  EXIT,
}

const ScrollamaContext = createContext<{
  data: {
    id: string;
  };
  direction: MoveDirection;
  step: StepDirection;
}>(null);

export const ScrollamaProvider: React.FC = ({ children }) => {
  const [scrollamaCurrent, setScrollamaCurrent] = useState({
    data: {
      id: '',
    },
    direction: MoveDirection.DOWN,
    step: StepDirection.ENTER,
  });

  const onSectionReachedInternal = (data, direction, step) => {
    setScrollamaCurrent({
      data,
      direction,
      step,
    });
  };

  return (
    <ScrollamaContext.Provider value={scrollamaCurrent}>
      <Scrollama
        offset={0.1}
        onStepEnter={({ data, direction }) => {
          onSectionReachedInternal(data, direction, StepDirection.ENTER);
        }}
        onStepExit={({ data, direction }) => {
          onSectionReachedInternal(data, direction, StepDirection.EXIT);
        }}
        debug
      >
        {children}
      </Scrollama>
    </ScrollamaContext.Provider>
  );
};

export const useScrollamaContext = () => useContext(ScrollamaContext);
