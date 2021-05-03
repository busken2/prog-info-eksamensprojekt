// eslint-disable-next-line no-unused-vars
import { createStore, createLogger } from "vuex" 
import { appMetaData } from './modules/appMetaData'

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? createLogger() : [];

export default createStore({
  modules: {
    appMetaData: appMetaData
  },
  state: {
    count: 0
  },
  plugins: [
    plugins,

  ]
})