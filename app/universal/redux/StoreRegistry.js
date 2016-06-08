/**
 * Store Registry
 * 
 * 
 * SOURCES:
 *      https://github.com/reactjs/redux/issues/37#issue-85098222
 *      https://github.com/insin/react-examples/tree/master/code-splitting-redux-reducers
 *      http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application/33044701
 * */
import { combineReducers } from 'redux';

export default class StoreRegistry {

  constructor(intialStore = {}) {
    this._store = intialStore;
    this._emitChange = null;
  }

  register(newStore) {
    this._store = Object.assign({}, this._store,newStore);
    if (this._emitChange != null) {
      this._emitChange(this.getStore());
    }
  }
  
  getStore() {
    return this._store;
  }

  setChangeListener(listener) {
    if (this._emitChange != null) {
      throw new Error('StoreRegistry: Cannot set multiple listeners');
    }
    this._emitChange = listener;
  }

  
  /**
   * Replace the given store and update with the new store
   * Needed for hot reload
   * 
   */
  updateStore(store, updatedStore) {
    const currentStore = this.getStore();
    Object.keys(updatedStore).forEach((s) => {
      if (!currentStore[s]) {
        delete updatedStrore[s];
      }
    });
    
    store.replaceReducer(combineReducers({...currentStore, ...updatedStore}));
  }
  
}