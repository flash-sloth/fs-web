/** 模板生成文件 */
export interface FsGenFile {
  id?: string;
  name: string;
  path: string;
  content?: string;
  /** 类型 */
  type: FsGenFileType;
  isReadonly: boolean;
  /** 子文件 */
  children?: FsGenFile[];
  /**
   * 生成配置
   *
   * OVERWRITE: 覆盖 IGNORE: 忽略 BACKUPS: 备份 ADD: 添加 EXIST_IGNORE: 存在则忽略
   *
   * @default OVERWRITE
   */
  generateConfig?: 'OVERWRITE' | 'IGNORE' | 'BACKUPS' | 'ADD' | 'EXIST_IGNORE';
}
/** 生成文件类型 */
export enum FsGenFileType {
  /** 文件 */
  File = 'file',
  /** 目录 */
  Dir = 'dir',
  /** 项目 */
  Project = 'project'
}
