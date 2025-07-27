
class Cell {
    constructor() {
        this.value = null;
        this.attacked = false;
    }

    setValue(val) {
        this.value = val;
    }

    markAttacked() {
        this.attacked = true;
    }

    isAttacked() {
        return this.attacked;
    }

    getValue() {
        return this.value;
    }
}

export {
    Cell
}