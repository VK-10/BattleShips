
class Ship {
    constructor(length) {
        if (length <= 0) throw new Error('Ship length must be positive');
        this.length = length;
        this.numberHit = 0;
    }
    hit() {
        this.numberHit = this.numberHit + 1;
    }
    isSunk = () => {
        return this.numberHit >= this.length;
    }

}

export {
    Ship
}

// class ArrowShip {
//     hit = () => { this.numberHit++; }
//     constructor() { this.numberHit = 0; }
// }

// class ProtoShip {
//     constructor() { this.numberHit = 0; }
//     hit() { this.numberHit++; }
// }

// const a1 = new ArrowShip();
// const a2 = new ArrowShip();

// const p1 = new ProtoShip();
// const p2 = new ProtoShip();

// // Compare
// console.log(a1.hit === a2.hit);  // ?
// console.log(p1.hit === p2.hit);  // ?

// console.dir(a1);
// console.dir(p1);


