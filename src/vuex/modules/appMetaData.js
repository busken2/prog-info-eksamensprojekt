
export const appMetaData = {
  namespaced: true,
  // initial state
  state: {
    app_url: 'localhost',
    theme: localStorage.theme 
  },
  
  // getters
  getters: {},
  
  // actions
  actions: {
    
  },
  
  // mutations
  mutations: {
    initialiseAppInfo (state, payload) {
      localStorage.setItem("theme", payload )
    },
    uninitialiseAppInfo () {
      localStorage.removeItem("theme")
    },
  },
}