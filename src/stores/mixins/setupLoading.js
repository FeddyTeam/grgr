import { observable, action } from 'mobx'

export default function(target) {
    return class extends target {
        @observable loading = false
        @action startProgress() {
            this.loading = true
        }
        @action stopProgress() {
            this.loading = false
        }
    }
}
