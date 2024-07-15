import type { VxeFormPropTypes } from 'vxe-table';
import type { VxeFormDefines } from 'vxe-pc-ui';
import type { HibernateValidator } from '@/typings/hibernateValidator';
import { validate as hibernateValidate } from './validator';
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
export function transformRules<T>(validators: { [key: string]: HibernateValidator[] }): VxeFormPropTypes.Rules<T> {
  const result: VxeFormPropTypes.Rules<T> = {};
  Object.keys(validators).forEach(cur => {
    const validatorsList = validators[cur];
    const rules: VxeFormDefines.FormRule<T>[] = [];
    validatorsList.forEach(validator => {
      rules.push(transformHandler(validator));
    });
    result[cur] = rules as any;
  });
  return result;
}

function requiredTransformer(message: string): VxeFormDefines.FormRule {
  return { required: true, message };
}
