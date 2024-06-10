// 列配置

import type { VxeGridPropTypes } from 'vxe-table';
import type { RowVO } from './model';

export const columns: VxeGridPropTypes.Columns<RowVO> = [
  { type: 'checkbox', width: 50 },
  { type: 'seq', width: 60 },
  {
    field: 'name',
    title: '名字',
    editRender: {
      name: 'VxeInput'
    }
  },
  {
    field: 'type3',
    title: 'type3',
    editRender: {
      name: 'VxeInput'
    }
  },
  {
    field: 'type2',
    title: 'type3',
    editRender: {
      name: 'VxeInput'
    }
  }
];
