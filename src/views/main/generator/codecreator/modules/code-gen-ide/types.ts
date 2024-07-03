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
   * 生成选项：
   *
   * - generate: 新增
   * - ignore: 忽略
   * - generate-force: 强制生成
   * - ignore-when-exist: 存在时忽略
   */
  generateConfig?: 'generate' | 'ignore' | 'generate-force' | 'ignore-when-exist';
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
