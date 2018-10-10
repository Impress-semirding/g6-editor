const dagre = require('dagre');

function execute(source) {
  const { nodes, edges } = source;
  const nodeMap = {};
  const nextNodes = [];
  const g = new dagre.graphlib.Graph();
  const useEdgeControlPoint = false;
  g.setGraph({
    rankdir: 'TB',
      align: undefined,
      nodesep: 80,
      edgesep: 10,
      ranksep: 50,
      marginx: 0,
      marginy: 0,
      acyclicer: undefined,
      useEdgeControlPoint: true,
      ranker: 'network-simplex',
  });
  g.setDefaultEdgeLabel(function() { return {}; });
  nodes.forEach(node => {
    g.setNode(node.id, { width: 145, height: 48 });
    nodeMap[node.id] = node;
  });
  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target);
  });
  dagre.layout(g);
  g.nodes().forEach(v => {
    const node = g.node(v);
    nodeMap[v].x = node.x;
    nodeMap[v].y = node.y;
  });
  g.edges().forEach((e, i) => {
    const edge = g.edge(e);
    if (useEdgeControlPoint) {
      edges[i].controlPoints = edge.points.slice(1, edge.points.length - 1);
    }
  });
  for (const i in nodeMap) {
    nextNodes.push(nodeMap[i]);
  }
  return { nodes: nextNodes, edges }
}

export default execute;
