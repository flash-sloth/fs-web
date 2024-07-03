import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';

export interface ConfigFormInstance {
  hasChange: () => boolean;
  validate: () => Promise<CodeCreatorEidtDto | null>;
}

export interface BaseInfoFormInstance extends ConfigFormInstance {
  setModles: (data: CodeCreatorEidtDto) => void;
  save: () => Promise<any>;
}
