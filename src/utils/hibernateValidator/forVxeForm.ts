import type { VxeFormDefines } from 'vxe-pc-ui';
import type { HibernateValidator } from '@/typings/hibernateValidator';
import { validate as hibernateValidate } from './validator';
/**
 * @param validtor 将hibernateValidator转换为vxe-pc-ui的form校验规则
 * @returns
 */
export function transformHandler(validtor: HibernateValidator): VxeFormDefines.FormRule {
  if (validtor.type === 'NotNull' || validtor.type === 'NotEmpty' || validtor.type === 'NotBlank') {
    return requiredTransformer(validtor.message);
  }
  return {
    validator: ({ itemValue }) => {
      const result = hibernateValidate(itemValue, validtor);
      return new Promise((resolve, reject) => {
        if (result === true) {
          resolve('');
        } else {
          reject(new Error(result));
        }
      });
    }
  };
}

function requiredTransformer(message: string): VxeFormDefines.FormRule {
  return { required: true, message };
}
