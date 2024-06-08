import type { CSSProperties } from 'vue';
import type { VxeGridProps } from 'vxe-table';

export type BasicTableProps = VxeGridProps & {
  tableClass?: string;
  tableStyle?: CSSProperties;
};
