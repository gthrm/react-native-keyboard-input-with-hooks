import React from 'react';
import {Screen} from './Screen';

export interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  const message =
    'In the secondary tab, the keyboard input is inside a pushed screen, yet it works nonetheless! :-)';
  return (
    <>
      <Screen message={message} />
    </>
  );
};
