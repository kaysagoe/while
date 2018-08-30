export default class BinaryOp
{
    constructor(left, token, right)
    {
        this.left = left;
        this.token = token;
        this.right = right;
    }

    toString()
    {
        return `${this.left.toString()} ${this.token.value} ${this.right.toString()}`;
    }
}