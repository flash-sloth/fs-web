import { VXETable } from 'vxe-table';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import ExcelJS from 'exceljs';
import { withInstall } from '@/utils';
import vxeBasicTable from './src/VxeBasicTable';
import VXETablePluginAntd from './src/components';
import './src/setting';

export const VxeBasicTable = withInstall(vxeBasicTable);
export * from 'vxe-table';
export * from './src/types';

VXETable.use(VXETablePluginAntd).use(VXETablePluginExportXLSX, { ExcelJS });
