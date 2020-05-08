import React, { lazy } from 'react';
import {LazyComponent} from './type';

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
