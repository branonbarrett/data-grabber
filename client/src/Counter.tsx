import React from 'react';
import { useContainerContext } from './ContainerContext';

export const Counter = () => {
  const context = useContainerContext();
  const { count } = context.state;
  const { increase, decrease } = context.actions;
  return (
    <div>
      <h4>Count: {count}</h4>
      <button onClick={() => increase()}>+</button>
      <button onClick={() => decrease()}>-</button>
    </div>
  );
};