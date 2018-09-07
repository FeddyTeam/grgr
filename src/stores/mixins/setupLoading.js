import { decorate, observable, action } from 'mobx'

export default function(target) {
    target.prototype.loading = false
    target.prototype.startProgress = function() {
        this.loading = true
    }
    target.prototype.stopProgress = function() {
        this.loading = false
    }

    decorate(target, {
        loading: observable,
        startProgress: action,
        stopProgress: action
    })
}
