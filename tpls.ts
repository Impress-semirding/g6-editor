interface ModelCard {
  label: string;
  color_type: string;
  type_icon_url: string;
  state_icon_url:string;
}

interface Tpls {
  'k-means': ModelCard;
}

let card: ModelCard = {
  label: 'k 均值聚类',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
}

let tpls: Tpls = {
  "k-means": card
}

export default tpls;
