Date.prototype.addSeconds = function (s) {
    this.setSeconds(this.getSeconds()+parseInt(s))
    return this
}

exports.dateNow = new Date()