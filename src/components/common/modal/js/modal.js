import Modal from '../Modal'

var plugin = {}
var installed = false
var instance = null
plugin.install = function (Vue, options = {}) {
    const ModalConstructor = Vue.extend(Modal)
    // Vue.modal = () => {

    // }
    if (installed) {
        return
    }
    instance = new ModalConstructor().$mount(document.createElement('div'))
    installed = true
    document.body.appendChild(instance.$el)
    Vue.prototype.$modal = (option = {}) => {
        instance.visible = option.visible !== undefined ? option.status : true
        instance.message = option.message || option
        instance.header = option.header || ''
        instance.footer = option.footer || {}
        // instance.handle = option.btnMethod || instance.handle
    }
}

export default plugin
