export default class Customer{


    constructor(name,addres,email,tel) {
        this._name = name;
        this._addres = addres;
        this._email = email;
        this._tel = tel;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get addres() {
        return this._addres;
    }

    set addres(value) {
        this._addres = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        this._tel = value;
    }
}