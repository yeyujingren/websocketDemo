import React, { LazyExoticComponent, FC, lazy, ComponentClass, SFC } from 'react';

export type LazyComponent =
  LazyExoticComponent<FC<any>> |
  LazyExoticComponent<ComponentClass<any>> |
  LazyExoticComponent<SFC<any>>;

export const Message: LazyComponent= lazy(
  () => import('../message')
);
