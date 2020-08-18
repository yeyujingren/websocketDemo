import { LazyExoticComponent, FC, ComponentClass, SFC } from 'react';

export enum TabsTyps {
  Msg,
  Fri,
  Per,
};

export interface RenderContentProps {
  (a: TabsTyps): JSX.Element
}

export type LazyComponent =
LazyExoticComponent<FC<any>> |
LazyExoticComponent<ComponentClass<any>> |
LazyExoticComponent<SFC<any>>;
