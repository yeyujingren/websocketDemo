import React, { LazyExoticComponent, FC, lazy, ComponentClass, SFC } from 'react';

export type LazyComponent =
  LazyExoticComponent<FC<any>> |
  LazyExoticComponent<ComponentClass<any>> |
  LazyExoticComponent<SFC<any>>;

// 引入消息相关组件
export const Message: LazyComponent= lazy(
  () => import('../message')
);

// 引入朋友列表相关组件
export const Friends: LazyComponent= lazy(
  () => import('../friends')
);

// 引入个人页面相关组件
export const Persional: LazyComponent= lazy(
  () => import('../persional')
);
