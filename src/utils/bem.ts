import { prefixCls } from '@/constants/designSetting';

type Mod = string | { [key: string]: any };
type Mods = Mod | Mod[];

export type BEM = ReturnType<typeof createBEM>;

function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + genBem(name, item), '');
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '');
}

/**
 * bem helper b() // 'button' b('text') // 'button__text' b({ disabled }) // 'button button--disabled' b('text', {
 * disabled }) // 'button__text button__text--disabled' b(['disabled', 'primary']) // 'button button--disabled
 * button--primary'
 */
export function buildBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    let varMods = mods;
    let varEl = el;
    if (varEl && typeof varEl !== 'string') {
      varMods = el;
      varEl = '';
    }

    varEl = varEl ? `${name}__${varEl}` : name;

    return `${varEl}${genBem(varEl, varMods)}`;
  };
}

export function createBEM(name: string) {
  return [buildBEM(`${prefixCls}-${name}`)];
}

export function createNamespace(name: string) {
  const prefixedName = `${prefixCls}-${name}`;
  return [prefixedName, buildBEM(prefixedName)] as const;
}
