import undoable from 'redux-undo'


const ADDNODE = 'add_node';
const UPDATENODE = 'update_node';
const DELETENODE = 'delete_node';
const ADDEDGE = 'add_edge';
const UPDATEEDGE = 'update_edge';

interface Data {
  node: Array<any>;
  edge: Array<any>;
}



const edges = (state, action) => {
  const type = action.type.split('@@')[1];
  switch(type) {
    case '':
      return state;
  }
}

const nodes = (state:any, action: any) => {
  const type = action.type.split('@@')[1];
  switch(type) {
    case ADDNODE:
      return [...state, action.payload.node]
    case UPDATENODE:
      return state;
    case DELETENODE:
      return state;
    default:
      return state;
  }
}

const data: Data = { node: [], edge: [] };

const datas = (state = data, action: any) => {
  const type = action.type.split('@@');
  if (type.length < 2) return;
  switch(type[0]) {
    case 'node':
      return {
        ...state,
        node: nodes(state.node, action)
      }
    case 'edge':
      return {
        ...state,
        edge: edges(state.edge, action)
      }
  }
}

const undoableTools = undoable(datas);

export default undoableTools

export {
  Data
}