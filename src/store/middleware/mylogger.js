export const loggerMiddleware = (store) => (next) => (action) => {
  if(process.env.NODE_ENV !== 'production'){
    if(!action.type){
      return next(action);
    }

    const actionInfo = {
      'type': action.type,
      'payload': action.payload,
      'currentState': store.getState()
    }

    next(action);
    actionInfo['newState'] = store.getState();
    // console.log( actionInfo );
  }
}