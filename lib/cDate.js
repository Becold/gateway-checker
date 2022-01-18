

module.exports = cDate = function (date) {
    if (date == null) this.date = new Date();
    else this.date = date;

    // On stocke les parties de la date
    this.seconds = this.date.getSeconds();
    this.minutes = this.date.getMinutes();
    this.hour = this.date.getHours();
    this.milliSeconds = this.date.getMilliseconds();

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1; // Janvier = 1; Février = 2; etc.
    this.day = this.date.getDate();

    // Formatage du texte
    if (this.day < 10) {
        this.day = '0' + this.day
    }
    if (this.month < 10) {
        this.month = '0' + this.month
    }
    if (this.hour < 10) {
        this.hour = '0' + this.hour
    }
    if (this.minutes < 10) {
        this.minutes = '0' + this.minutes
    }
    if (this.seconds < 10) {
        this.seconds = '0' + this.seconds
    }
    if (this.milliSeconds < 100) {
        this.milliSeconds = '0' + this.milliSeconds
    }
    if (this.milliSeconds < 10) {
        this.milliSeconds = '0' + this.milliSeconds
    }
};

/*
 * Permet d'avoir une date au format texte
 * @return string Date au format dd-MM-YY
 *
 * Exemple:
 * var date = new cDate(new Date()).getTextDate();
 */
cDate.prototype.getTextDate = function () {
    return [this.day, this.month, this.year].join("-");
};

/*
 * Permet d'avoir une heure au format texte
 * @return string Heure au format hh:mm:ss.milli
 *
 * Exemple:
 * var date = new cDate(new Date()).getTextHour();
 */
cDate.prototype.getTextHour = function () {
    return [this.hour, this.minutes, this.seconds].join(":") + "." + this.milliSeconds;
};