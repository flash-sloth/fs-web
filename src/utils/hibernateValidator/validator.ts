import { isArray, isInteger, isNumber, isObject, isSet, isString } from 'xe-utils';
import type {
  Email,
  HibernateValidator,
  Length,
  Max,
  Min,
  NotBlank,
  NotEmpty,
  NotNull,
  Pattern,
  Range,
  Size
} from '@/typings/hibernateValidator';

export function validate(value: any, validator: HibernateValidator) {
  const validateMap: { [key: string]: (value: any, validator: any) => string | true } = {
    NotNull: validateNotNull,
    NotEmpty: validateNotEmpty,
    NotBlank: validateNotBlank,
    Size: validateSize,
    Length: validateLength,
    Min: validateMin,
    Max: validateMax,
    Range: validateRange,
    Pattren: validatePattern,
    Email: validateEmail
  };
  return validateMap[validator.type] ? validateMap[validator.type](value, validator) : true;
}

/**
 * 验证给定的值是否为非空值。 此函数主要用于配合NotNull验证器使用，以确保字段不为null或undefined。 如果值为空，则返回验证器提供的错误消息；如果值非空，则返回true表示验证通过。
 *
 * @param value 任意类型的值，需要验证其是否为空。
 * @param validator NotNull验证器实例，提供错误消息。
 * @returns 如果值为空，则返回错误消息；否则返回true。
 */
function validateNotNull(value: any, validator: NotNull) {
  if (value === null || value === undefined) {
    return validator.message;
  }
  return true;
}
/**
 * 获取输入值的长度。
 *
 * 此函数旨在根据输入值的类型，返回其相应的长度或大小。 它支持字符串、数字、Set、数组和对象等类型的输入。 如果输入值的类型不被支持，或者当justStrNumber参数为true且输入值不是字符串或数字时，函数将返回NaN。
 *
 * @param value 任意类型的输入值。
 * @param justStrNumber 布尔值，指示函数是否仅在输入为字符串或数字时返回长度。 如果为true，则对于非字符串/数字类型的输入将返回NaN。
 * @returns 输入值的长度、大小或NaN（如果输入不被支持或符合justStrNumber的条件）。
 */
function getValueLen(value: any, justStrNumber: boolean = false) {
  if (isString(value)) {
    return value.length;
  }
  if (isNumber(value)) {
    return String(value).length;
  }
  if (justStrNumber) {
    return Number.NaN;
  }
  if (isSet(value)) {
    return value.size;
  }
  if (isArray(value)) {
    return value.length;
  }
  if (isObject(value)) {
    return Object.keys(value).length;
  }
  return Number.NaN;
}

/**
 * 验证给定的值是否为空。 该函数主要用于检查提供的值是否为空，空值可以是null、undefined、空集合、空数组或空字符串。 如果值为空，则返回预定义的错误消息；如果值不为空，则返回true。
 *
 * @param value 任意类型的值，需要检查是否为空。
 * @param validator 包含错误消息的NotEmpty验证器对象。
 * @returns 如果值不为空，则返回true；否则返回验证器中的错误消息。
 */
function validateNotEmpty(value: any, validator: NotEmpty) {
  if (value === null || value === undefined) {
    return validator.message;
  }
  const valueLen = getValueLen(value);
  if (Number.isNaN(valueLen)) {
    return '@NotEmpty校验格式不匹配';
  }
  if (valueLen === 0) {
    return validator.message;
  }

  return true;
}
/**
 * 验证输入值是否为空。 该函数主要用于校验字符串或数字类型的输入值，确保其不为空。
 *
 * @param value 待验证的值，可以是任何类型。
 * @param validator NotBlank验证器实例，用于提供错误消息。
 * @returns 如果值有效，则返回true；否则返回验证器的错误消息。
 */
function validateNotBlank(value: any, validator: NotBlank) {
  if (value === null || value === undefined) {
    return validator.message;
  }
  const valueLen = getValueLen(value, true);
  if (Number.isNaN(valueLen)) {
    return '@NotBlank校验格式不匹配';
  }
  if (valueLen === 0) {
    return validator.message;
  }
  return true;
}
/**
 * 根据参数替换消息中的占位符。
 *
 * 该函数接受一个含有占位符的消息字符串和一个参数对象。 它通过遍历参数对象的键值对，将消息中的占位符替换为对应的值。 占位符的格式为 `{key}`，其中 `key` 是参数对象的键。
 *
 * @param message 待替换占位符的消息字符串。
 * @param params 包含占位符对应值的参数对象。
 * @returns 替换占位符后的新消息字符串。
 */

function relpaceMessage(message: string, params: { [key: string]: any }) {
  if (message) {
    let result = message;
    Object.keys(params).forEach(key => {
      result = result.replace(`{${key}}`, params[key]);
    });
    return result;
  }
  return '';
}

// 类型守卫函数，用于检查一个值是否可以安全地转换为数字
function isValidNumber(value: any): value is number {
  return !Number.isNaN(value) && Number.isFinite(value);
}
/**
 * 验证给定值的大小是否符合指定的范围。
 *
 * 此函数用于检查任何类型的值的大小是否在最小值和最大值之间。 如果值是null或undefined，则被认为大小是有效的。 如果值的大小无法确定（例如，非字符串、数组或对象），则返回一个错误消息。
 * 如果值的大小不在指定范围内，则使用提供的错误消息替换默认消息。
 *
 * @param value 待验证的值。
 * @param validator 验证器对象，包含最小值(min)、最大值(max)和错误消息(message)。
 * @returns 如果值的大小有效，则返回true；否则，返回错误消息。
 */
function validateSize(value: any, validator: Size) {
  if (value === null || value === undefined) {
    return true;
  }
  const { min = -Number.NEGATIVE_INFINITY, max = Number.NEGATIVE_INFINITY, message } = validator;
  const valueLen = getValueLen(value);
  if (Number.isNaN(valueLen)) {
    return '@Size校验格式不匹配';
  }
  if (valueLen < min || valueLen > max) {
    relpaceMessage(message, { min, max });
  }
  return true;
}
/**
 * 校验字符串长度是否在范围允许内，数组会被转字符串处理
 *
 * @param value
 * @param validator
 * @returns
 */
function validateLength(value: any, validator: Length) {
  if (value === null || value === undefined) {
    return true;
  }
  const { min = -Number.NEGATIVE_INFINITY, max = Number.NEGATIVE_INFINITY, message } = validator;
  const valueLen = getValueLen(value, true);
  if (Number.isNaN(valueLen)) {
    return '@Length校验格式不匹配';
  }
  if (valueLen < min || valueLen > max) {
    relpaceMessage(message, { min, max });
  }
  return true;
}
/**
 * 校验整形值是否大于等于指定值 满足整形格式的字符串转换为数字再比较
 *
 * @param value
 * @param validator
 * @returns
 */
function validateMin(value: any, validator: Min) {
  if (value === null || value === undefined) {
    return true;
  }
  if (isValidNumber(value)) {
    const numberValue = Number(value);
    if (!isInteger(numberValue)) {
      return '@Max校验格式不匹配';
    }
    if (numberValue < validator.value) {
      return relpaceMessage(validator.message, { value: validator.value });
    }
  } else {
    return '@Min校验格式不匹配';
  }
  return true;
}
/**
 * 校验整形值是否小于等于指定值 满足整形格式的字符串转换为数字再比较
 *
 * @param value
 * @param validator
 * @returns
 */
function validateMax(value: any, validator: Max) {
  if (value === null || value === undefined) {
    return true;
  }
  if (isValidNumber(value)) {
    const numberValue = Number(value);
    if (!isInteger(numberValue)) {
      return '@Max校验格式不匹配';
    }
    if (numberValue > validator.value) {
      return relpaceMessage(validator.message, { value: validator.value });
    }
  } else {
    return '@Max校验格式不匹配';
  }
  return true;
}
/**
 * 检查数据是否再指定范围值内，字符串满足格式将被处理成字符串
 *
 * @param value
 * @param validator
 * @returns
 */
function validateRange(value: any, validator: Range) {
  if (value === null || value === undefined) {
    return true;
  }
  const { min = -Number.NEGATIVE_INFINITY, max = Number.NEGATIVE_INFINITY, message } = validator;
  if (isValidNumber(value)) {
    const numberValue = Number(value);
    if (numberValue < min || numberValue > max) {
      relpaceMessage(message, { min, max });
    }
  } else {
    return '@Max校验格式不匹配';
  }
  return true;
}

/**
 * 数字讲不被处理成字符串，字符串按正则表达式匹配
 *
 * @param value
 * @param validator
 * @returns
 */
function validatePattern(value: any, validator: Pattern) {
  if (value === null || value === undefined) {
    return true;
  }
  if (isString(value)) {
    const reg = new RegExp(validator.regexp);
    if (!reg.test(value)) {
      return relpaceMessage(validator.message, { regexp: validator.regexp });
    }
  } else {
    return '@Pattern校验格式不匹配';
  }
  return true;
}
/**
 * 验证邮箱格式是否有效。
 *
 * 此函数主要用于检查提供的值是否为有效的电子邮件地址。如果值为null或undefined，则视为有效。 如果值是字符串类型但不符合电子邮件的正则表达式模式，则返回错误消息。 如果值不是字符串类型，则直接返回一个错误消息。
 *
 * @param value 要验证的值，可以是任何类型。
 * @param validator 邮箱验证器对象，包含错误消息。
 * @returns
 */
function validateEmail(value: any, validator: Email) {
  if (value === null || value === undefined) {
    return true;
  }
  if (isString(value)) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return validator.message;
    }
  } else {
    return '@Email校验格式不匹配';
  }
  return true;
}
