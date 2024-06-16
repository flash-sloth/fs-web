/** curd模型 */
export interface CurdModel {
  id: number;
  name: string;
  type3: string;
  type2: string;
}

/** curd保持参数模型 */
export interface CurdSaveDto {
  name: string;
  type3: string;
  type2: string;
}

/** curd更新参数模型 */
export interface CurdUpdateDto {
  id: number;
  name: string;
  type3: string;
  type2: string;
}

/** curd分页查询模型 */
export interface CurdPageDto {
  name: string;
}
/** curd分页显示模型 */
export interface CurdPageVo {
  id: number;
  name: string;
  type3: string;
  type2: string;
}
