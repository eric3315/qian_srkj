const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
export function isUrl(path) {
  return reg.test(path);
}
const menuData = [
  {
    name: '趋势分析',
    icon: 'filter',
    path: 'trend'
  },
  {
    name: '智能设计',
    icon: 'filter',
    path: 'design'
  },
  {
    name: '智能制版',
    icon: 'filter',
    path: 'make',
  }
];
function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
export const getMenuData = () => formatter(menuData);
