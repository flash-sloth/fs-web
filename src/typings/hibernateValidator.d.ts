export interface BaseValidator {
  message: string;
}
/** （任何元素）必须不为 null,undefined */
export interface NotNull extends BaseValidator {
  type: 'NotNull';
}
/** @NotEmpty 用来校验字符串、集合、map、数组不能为null或空 */
export interface NotEmpty extends BaseValidator {
  type: 'NotEmpty';
}
/** 用来校验字符串、集合、map、数组不能为null或空 （字符串传入空格也不可以）（集合需至少包含一个元素） */
export interface NotBlank extends BaseValidator {
  type: 'NotBlank';
}
/** @Size(max=, min=) 指定的字符串、集合、map、数组长度必须在指定的max和min内允许元素为null，字符串允许为空格 */
export interface Size extends BaseValidator {
  type: 'Size';
  max: number;
  min: number;
}
/** 只用来校验字符串，长度必须在指定的max和min内 允许元素为null */
export interface Length extends BaseValidator {
  type: 'Length';
  max: number;
  min: number;
}
/** 校验邮箱 允许为空 */
export interface Email extends BaseValidator {
  type: 'Email';
}
/** @Range(min=,max=) 用来校验数字或字符串的大小必须在指定的min和max内 允许为空 */
export interface Range extends BaseValidator {
  type: 'Range';
  max: number;
  min: number;
}

/** Min() 校验数字（包括integer short long int 等）的最小值，不支持小数即double和float */
export interface Min extends BaseValidator {
  type: 'Min';
  value: number;
}
/** Max() 校验数字（包括integer short long int 等）的最大值，不支持小数即double和float */
export interface Max extends BaseValidator {
  type: 'Max';
  value: number;
}
/** 正则表达式匹配，可用来校验年月日格式，是否包含特殊字符 */
export interface Pattern extends BaseValidator {
  type: 'Pattern';
  regexp: string;
}
// /** @Past 被注释的元素必须是一个过去的日期 */
// export interface Past extends BaseValidator {
//   type: 'Past';
// }
// /** @Future 被注释的元素必须是一个将来的日期 */
// export interface Future extends BaseValidator {
//   type: 'Future';
// }
/** 只实现了常用的 @Size @NotBlank @NotNull @Email @Range @Min @Max @Pattern @Max @Min */
export type HibernateValidator =
  | NotNull
  | NotBlank
  | Size
  | Length
  | Email
  | Range
  | Min
  | Max
  | Pattern
  | Max
  | NotEmpty
  | Min;
