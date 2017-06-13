import { mapActions } from 'vuex'
const mixin = {
    methods: {
        ...mapActions([
            'hiddenLoading'
        ])
    }
}
export default mixin
