import type { InjectionKey } from 'vue';
import { createContext, useContext } from '@/hooks/core/useContext';

export interface AppProviderContextProps {
  prefixCls: string;
}

const key: InjectionKey<AppProviderContextProps> = Symbol('fs-prefixCls-key');

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}

export function useDesign(scope: string) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls || ''}-${scope}`,
    prefixVar: values.prefixCls || ''
  };
}
