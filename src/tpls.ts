/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-07-10 06:33:59
 * @modify date 2018-07-10 06:33:59
 * @desc [description]
*/

interface ModelCard {
  type: string;
  label: string;
  color_type: string;
  type_icon_url: string;
  state_icon_url:string;
}

const card: ModelCard = {
  type: 'k-means',
  label: 'k 均值聚类',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
}

const tpls: Array<ModelCard> = [card]


export default function getTpl(type: string) {
  const tpl = tpls.filter((card) => card.type === type)
  if (tpl.length) return tpl[0]
  return null;
}
