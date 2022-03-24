// un item du frigo
export default class Item {
    constructor(id, name, nb) {
        this._id = id;
        this._name = name;
        this._nb = nb;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get nb() {
        return this._nb;
    }

    modify(nb) {
        this._nb += nb;
    }
}