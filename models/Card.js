module.exports = class Card{
    number = 0;
    shape = "";
    image = "";

    constructor(number, shape, image){
        this.number = number;
        this.shape = shape;
        this.image = image;
    }
}