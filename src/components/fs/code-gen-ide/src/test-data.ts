import { type FsGenFile, FsGenFileType } from './types';

export const fileTreeData: FsGenFile[] = [
  {
    id: '1',
    name: 'Fs-Boot',
    path: 'D:/flashSloth/fs-boot',
    type: FsGenFileType.Project,
    isReadonly: true,
    children: [
      {
        id: '2',
        name: '/modules/demo',
        path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo',
        isReadonly: true,
        type: FsGenFileType.Dir,
        children: [
          {
            id: '3',
            name: 'controller',
            path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/controller',
            isReadonly: true,
            type: FsGenFileType.Dir,
            children: [
              {
                id: '7',
                name: 'RoleController.java',

                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/controller/RoleController.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public class RoleController{
                }`
              }
            ]
          },
          {
            id: '22',
            name: 'entity',
            path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity',
            isReadonly: true,
            type: FsGenFileType.Dir,
            children: [
              {
                id: '8',
                name: 'Role.java',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/Role.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public class Role{
                }`
              },
              {
                id: '9',
                name: 'RoleQuery.java',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/RoleQuery.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public class RoleQuery{
                }`
              },
              {
                id: '10',
                name: 'RoleVo.java',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/RoleVo.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public class RoleVo{
                }`
              }
            ]
          },
          {
            id: '4',
            name: 'mapper',
            path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/mapper',
            isReadonly: true,
            type: FsGenFileType.Dir,
            children: [
              {
                id: '199',
                name: 'RoleMapper.java',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/RoleMapper.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public interface RoleMapper{
                }`
              }
            ]
          },
          {
            id: '51',
            name: 'service',
            path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/service',
            isReadonly: true,
            type: FsGenFileType.Dir,
            children: [
              {
                id: '61',
                name: 'serviceImpl',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/serviceImpl',
                isReadonly: true,
                type: FsGenFileType.Dir,
                children: [
                  {
                    id: '110',
                    name: 'RoleServiceImpl.java',
                    path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/RoleServiceImpl.java',
                    isReadonly: false,
                    type: FsGenFileType.File,
                    content: `public class RoleService{
                    }`
                  }
                ]
              },
              {
                id: '101',
                name: 'RoleService.java',
                path: 'D:/flashSloth/fs-boot/src/main/java/top/fsfsfs/boot/modules/demo/entity/RoleService.java',
                isReadonly: false,
                type: FsGenFileType.File,
                content: `public interface RoleService{
                }`
              }
            ]
          }
        ]
      }
    ]
  }
];
