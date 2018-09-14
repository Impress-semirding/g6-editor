/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-07-10 06:33:59
 * @modify date 2018-07-10 06:33:59
 * @desc [description]
*/

// interface ModelCard {
//   type: string;
//   label: string;
//   color_type: string;
//   type_icon_url: string;
//   state_icon_url:string;
//   width: number;
//   height: number;
// }

// const card: ModelCard = {
//   type: 'k-means',
//   label: 'k 均值聚类',
//   color_type: '#1890FF',
//   type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
//   // state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
//   state_icon_url: 'https://imadmin2-dev.zhongan.io/image/file/a640c6cd-5350-4178-8db3-fb2febd34c92',
//   width: 168,
//   height: 48
// }

const tpls: object = {
  'k-means': (option) => {
    return {
      type: 'k-means',
      label: option.name ? option.name : 'k 均值聚类',
      color_type: option.color ? option.color : '#1890FF',
      type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
      // state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
      state_icon_url: 'https://imadmin2-dev.zhongan.io/image/file/a640c6cd-5350-4178-8db3-fb2febd34c92',
      width: 168,
      height: 48
    }
  }
}


export default function getTpl(type: string) {
  if (tpls[type]) { return tpls[type] }
  return null;
}
