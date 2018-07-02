const tpls = {
  'k-means': {
    label: 'k 均值聚类',
    color_type: '#1890FF',
    type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
    anchor: [
      [0.5, 0, {
        type: 'input',
      }], // 上面边的中点
      [0.5, 1, {
        type: 'output',
      }], // 下边边的中点
    ],
  },
};

export default tpls;
