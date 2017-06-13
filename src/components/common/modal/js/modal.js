import Modal from '../Modal'

var plugin = {}

plugin.install = function (Vue, options = {}) {
    const ModalConstructor = Vue.extend(Modal)

    Vue.prototype.$modal = (option = {}) => {
        var instance = new ModalConstructor().$mount(document.createElement('div'))
        instance.message = option.message || option
        instance.header = option.header || ''
        instance.footer = option.footer || {}
        document.body.appendChild(instance.$el)
        return instance
    }
}

export default plugin
