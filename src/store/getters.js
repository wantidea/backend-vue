const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.systemAdmin.token,
  avatar: state => state.systemAdmin.avatar,
  name: state => state.systemAdmin.name,
  addRouters: state => state.systemMenu.addRouters,
  routers: state => state.systemMenu.routers
}
export default getters
