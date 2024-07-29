export type CollapseProps = {
  /** 折叠面板的位置 */
  collapsePanelPosition: 'left' | 'right' | 'top' | 'bottom';
  /** 是否折叠 v-model: [expanded, onCollapseChange] */
  expanded: boolean;
  /** 收起时折叠面板大小 */
  min: string | number;
  /** 展开时折叠面板大小 */
  max: string | number;
  /** 面板展开时旋转按钮的提示 */
  expandedTip: string;
  /** 面板收起时旋转按钮的提示 */
  unExpandedTip: string;
};
