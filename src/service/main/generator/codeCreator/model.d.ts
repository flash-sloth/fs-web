export interface CodeCreator {
  id: number;
  tableName: string;
  tableDescription: string;
  entityDesign: EntityDesign;
}

export interface CodeGenDto {
  ids: string[];
  reload?: boolean;
  genStrategy?: Record<string, any>;
}

export interface EntityDesign {
  name: string;
}

export interface CodeCreatorPageDto {
  tableName?: string;
}

export interface CodeCreatorImportDto {
  tableName: Set<string>;
  dsId: number;
}

export interface CodeCreatorColumn {
  id?: number;
  codeCreatorId?: number;
  name?: string;
  typeName?: string;
  remarks?: string;
  size?: number;
  digit?: number;
  isPk?: boolean;
  autoIncrement?: boolean;
  isNullable?: boolean;
  defValue?: string;
  weight?: number;
}

export interface CodeCreatorEidtDto {
  id?: number;
  author?: string;
  columnList?: CodeCreatorColumn[];
  tableName?: string;
  tableDescription?: string;
  dsId?: number;
  packageDesign?: {
    sourceDir?: string;
    basePackage?: string;
    module?: string;
    moduleDescription?: string;
    subSystemId?: number;
    author?: string;
  };
  entityDesign?: {
    packageName?: string;
    name?: string;
    description?: string;
    superClassName?: string;
    genericityTypeName?: string;
    withLombok?: boolean;
    withChain?: boolean;
    withSwagger?: boolean;
    withBaseClassEnable?: boolean;
    alwaysGenColumnAnnotation?: boolean;
  };
  voDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
    genericityTypeName?: string;
    implInterfaceNames?: [];
    withLombok?: boolean;
    withChain?: boolean;
    withSwagger?: boolean;
    withExcel?: boolean;
  };
  queryDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
    genericityTypeName?: string;
    implInterfaceNames?: [];
    withLombok?: boolean;
    withChain?: boolean;
    withSwagger?: boolean;
    withExcel?: boolean;
  };
  dtoDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
    genericityTypeName?: string;
    implInterfaceNames: string[];
    withLombok?: boolean;
    withChain?: boolean;
    withValidator?: boolean;
    withSwagger?: boolean;
    ignoreColumns: string[];
  };
  xmlDesign?: {
    path?: string;
    filePrefix?: string;
    fileSuffix?: string;
    withResultMap?: boolean;
    withSql?: boolean;
  };
  mapperDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
  };
  serviceDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
  };
  serviceImplDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    superClassName?: string;
    withCache?: boolean;
  };
  controllerDesign?: {
    packageName?: string;
    classPrefix?: string;
    classSuffix?: string;
    requestMappingPrefix?: string;
    withCrud?: boolean;
    restStyle?: boolean;
    superClassName?: string;
  };
  menuDesign?: {
    execute?: boolean;
    code?: string;
    name?: string;
    icon?: string;
    weight?: string;
    parentId?: number;
  };
  slaveDesign?: {
    vo?: string;
  };
  frontDesign?: {
    sourceDir?: string;
    openMode?: string;
    layout?: string;
    i18n?: boolean;
    keepAlive?: boolean;
  };
  searchDesign?: [
    {
      name?: string;
      show?: boolean;
      hidden?: boolean;
      align?: string;
      titleOverflow?: string;
      componentType?: string;
      sequence?: number;
    }
  ];
  listDesign?: [
    {
      name?: string;
      show?: boolean;
      hidden?: boolean;
      width?: string;
      autoWidth?: boolean;
      align?: string;
      componentType?: string;
      format?: string;
      filter?: boolean;
      resizable?: boolean;
      sequence?: number;
      sort?: boolean;
    }
  ];
  treeDesign?: [
    {
      vo?: string;
    }
  ];
  fromDesign?: [
    {
      name?: string;
      show?: boolean;
      hidden?: boolean;
      align?: string;
      titleOverflow?: string;
      componentType?: string;
      sequence?: number;
    }
  ];
  propertyDesign?: [
    {
      name?: string;
      property?: string;
      propertySimpleType?: string;
      propertyType?: string;
      tsType?: string;
      swaggerDescription?: string;
      required?: boolean;
      version?: boolean;
      large?: boolean;
      tenant?: boolean;
    }
  ];
  buttonDesign?: [
    {
      state?: boolean;
      name?: string;
      code?: string;
      icon?: string;
      authCode?: string;
    }
  ];
}
