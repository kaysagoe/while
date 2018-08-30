export default class AssignOp
{
    constructor(left, token, right)
    {
        this.left = left;
        this.token = token;
        this.right = right;
    }

    toString()
    {
        return `${this.left.toString()} := ${this.right.toString()}`;
    }
}