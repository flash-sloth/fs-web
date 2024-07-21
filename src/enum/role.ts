export enum RoleEnum {
  // super admin
  SUPER = 'super'
}

export enum PermModeEnum {
  // 拥有所有
  Has = 'Has',
  // 拥有任意一个
  HasAny = 'HasAny',
  // 没有所有
  Without = 'Without',
  // 没有任意一个
  WithoutAny = 'WithoutAny'
}
