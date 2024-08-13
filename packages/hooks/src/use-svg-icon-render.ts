import { h } from 'vue';
import type { Component } from 'vue';

/**
 * Svg icon render hook
 *
 * @param SvgIcon Svg icon component
 */
export default function useSvgIconRender(SvgIcon: Component) {
  interface IconConfig {
    name: string;
  }

  /**
   * Svg icon VNode
   *
   * @param config
   */
  const SvgIconVNode = (config: IconConfig) => {
    const { name } = config;

    if (!name) {
      return undefined;
    }

    return () => h(SvgIcon, config);
  };

  return {
    SvgIconVNode
  };
}
