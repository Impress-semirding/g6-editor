import { ActionCreators } from 'redux-undo';

import store from './store'

class Manager {

  public addNode(node) {
    store.dispatch({ type: 'node@@add_node', payload: { node }});
  }

  public updateNode(node) {
    store.dispatch({ type: 'node@@update_node', payload: { node }});
  }

  public deleteNode(node) {
    store.dispatch({ type: 'node@@delete_node', payload: { node }});
  }

  public undo() {
    store.dispatch(ActionCreators.undo())
  }

  public redo() {
    store.dispatch(ActionCreators.redo())
  }

  public jump(step) {
    store.dispatch(ActionCreators.jump(step))
  }
}

export default Manager;