import { intersection } from 'lodash-es';
import { isArray } from '@sa/utils';
import { PermModeEnum } from '@/enum/role';
import type { RoleEnum } from '@/enum/role';
import { getResource } from '@/store/modules/route/shared';

/**
 * maxList是否包含minList
 *
 * @param maxList 大数组
 * @param minList 小数组
 */
function containsAll(maxList: string[], minList: string[]) {
  return intersection(maxList, minList).length === minList.length;
}

/**
 * 判断是否有权限
 *
 * @param permissionsOwns 用户拥有的权限（后台/anyone/visible/resource接口查询出的权限集合）
 * @param toBeVerified 待验证的权限（按钮上面写死的资源编码，如<n-button v-hasPermission="['system:menu:delete']">）
 */
function isPermitted(permissionsOwns: WildcardPermission[], toBeVerified: WildcardPermission) {
  if (permissionsOwns === null || permissionsOwns === undefined || permissionsOwns.length === 0) {
    return false;
  }
  // 遍历用户拥有的权限，按个判断是否”包含“待验证的权限
  for (const owned of permissionsOwns) {
    if (owned.implies(toBeVerified)) {
      return true;
    }
  }
  return false;
}

const WILDCARD_TOKEN = '*'; // 通配符
const PART_DIVIDER_TOKEN = ':'; // 模块分隔符
const SUBPART_DIVIDER_TOKEN = ','; // 功能分隔符

/** 通配符权限解析对象, 源码参考至shiro */
class WildcardPermission {
  // 解析后的只包含 : 的权限集合
  parts: string[][];

  /**
   * 将 wildcardString 解析存储到 parts
   *
   * @param wildcardString 原始通配符字符串
   * @param caseSensitive 是否区分大小写 true：区分；false：忽略大小写
   */
  constructor(wildcardString: string, caseSensitive: boolean) {
    this.parts = [];
    this.init(wildcardString, caseSensitive);
  }

  // 解析通配符
  private init(wildcardString: string, caseSensitive: boolean) {
    if (wildcardString === null || wildcardString === undefined || wildcardString.trim().length === 0) {
      throw new Error('权限编码通配符字符串不能为null或空。确保权限字符串的格式正确。');
    }
    const wildcard = wildcardString.trim();
    const parts: string[] = wildcard.split(PART_DIVIDER_TOKEN);
    this.parts = [];
    for (const part of parts) {
      let subParts: string[] = part.split(SUBPART_DIVIDER_TOKEN);
      if (!caseSensitive) {
        const lowerSubParts: string[] = [];
        for (const subPart of subParts) {
          lowerSubParts.push(subPart.toLocaleLowerCase());
        }
        subParts = lowerSubParts;
      }
      if (subParts.length <= 0) {
        throw new Error('权限编码通配符字符串不能包含只有分隔符的部分，确保权限编码字符串的格式正确。');
      }
      this.parts.push(subParts);
    }

    if (this.parts.length <= 0) {
      throw new Error('权限编码通配符字符串不能只包含分隔符，确保权限编码字符串的格式正确。');
    }
  }

  // 真正的判断逻辑
  implies(toBeVerified: WildcardPermission) {
    const toBeVerifiedParts = toBeVerified.parts;
    let i = 0;
    for (const toBeVerifiedPart of toBeVerifiedParts) {
      // 如果此权限的部分数少于其他权限，则此权限中包含的部分数之后的所有内容都将自动隐含，因此返回true
      if (this.parts.length - 1 < i) {
        return false;
      }
      const part = this.parts[i];
      if (!part.includes(WILDCARD_TOKEN) && !containsAll(part, toBeVerifiedPart)) {
        return false;
      }
      i++;
    }

    // 如果此权限的部分多于其他部分，则仅当所有其他部分都是通配符时才暗示它
    for (; i < this.parts.length; i++) {
      const part = this.parts[i];
      if (!part.includes(WILDCARD_TOKEN)) {
        return false;
      }
    }
    return true;
  }
}

const permMap = new Map<string, WildcardPermission>();
// const OWNS: WildcardPermission[] = [];

// User permissions related operations
export function usePermission() {
  /** 只要包含列出的任意一个权限，元素就会显示 */
  function hasAnyPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermModeEnum.HasAny);
  }
  /** 必须包含列出的所有权限，元素才显示 */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermModeEnum.Has);
  }
  /** 当不包含列出的所有权限时，渲染该元素 */
  function withoutPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermModeEnum.Without);
  }
  /** 当不包含列出的任意权限时，渲染该元素 */
  function withoutAnyPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermModeEnum.WithoutAny);
  }

  /**
   * 判断权限
   *
   * @param value 需要判断当前用户是否拥有的资源编码
   * @param def value 为空时，默认是否拥有
   * @param mode 模式 可选值： 拥有所有 拥有任意 没有
   */
  // eslint-disable-next-line complexity
  function isPermission(
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true,
    mode = PermModeEnum.Has
  ): boolean {
    // value为空时的默认值
    if (!value) {
      return def;
    }

    // 后端禁用按钮权限
    const { enabled, resourceList, caseSensitive } = getResource();
    if (!enabled) {
      return true;
    }

    // Has、Without默认有权限，HasAny、WithoutAny默认没权限
    let flag = true;
    if (mode === PermModeEnum.HasAny || mode === PermModeEnum.WithoutAny) {
      flag = false;
    }

    // 待校验权限转为数组
    let permissions = value;
    if (!isArray(value)) {
      permissions = [value];
    }

    if (permissions !== null && permissions.length > 0) {
      // 转换 用户拥有的所有权限
      const permissionsOwns: WildcardPermission[] = [];
      // bug：从开发者系统退出后，登录基础平台都会提示无权限
      // if (OWNS.length > 0) {
      //   permissionsOwns = OWNS;
      // } else {
      for (const resource of resourceList) {
        permissionsOwns.push(new WildcardPermission(resource, caseSensitive));
      }
      // permissionsOwns = OWNS;
      // }

      for (const strPerm of permissions) {
        let toBeVerified;
        if (permMap.has(strPerm)) {
          toBeVerified = permMap.get(strPerm) as WildcardPermission;
        } else {
          toBeVerified = new WildcardPermission(strPerm, caseSensitive);
        }
        // 不同的模式，校验规则不一样
        if (mode === PermModeEnum.Has) {
          // 拥有所有权限
          if (!isPermitted(permissionsOwns, toBeVerified)) {
            flag = false;
          }
        } else if (mode === PermModeEnum.Without) {
          // 没有所有权限
          if (isPermitted(permissionsOwns, toBeVerified)) {
            flag = false;
          }
        } else if (mode === PermModeEnum.HasAny) {
          // 拥有任意一个权限
          if (isPermitted(permissionsOwns, toBeVerified)) {
            flag = true;
          }
        } else if (mode === PermModeEnum.WithoutAny) {
          // 没有任意一个权限
          if (!isPermitted(permissionsOwns, toBeVerified)) {
            flag = true;
          }
        }
      }
    }

    return flag;
  }

  return {
    isPermission,
    hasPermission,
    withoutPermission,
    withoutAnyPermission,
    hasAnyPermission
  };
}
