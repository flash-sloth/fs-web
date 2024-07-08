export interface CodeBaseClass {
  id?: number;
  name?: string;
  packageName?: string;
  fields?: any[];
  classType?: string;
  state?: boolean;
  weight?: number;
  remark?: string;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
  deletedAt?: number;
  deletedBy?: number;
}
