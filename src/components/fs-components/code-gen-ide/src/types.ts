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
