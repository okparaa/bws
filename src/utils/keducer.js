export const keducer = (prefix, actionMutationMap={}) => (state={}, action) => {
     return actionMutationMap[action.type] ?
      actionMutationMap[action.type](state, action.payload) :
      action.type.indexOf(`${prefix}/`) === 0 ? {...state, ...(action.payload)} : state
    }

export const Types = (namespace, type) => ({
      PENDING: `${namespace}/${type}_PENDING`,
      SUCCESS: `${namespace}/${type}_SUCCESS`,
      ERROR: `${namespace}/${type}_ERROR`,
  });