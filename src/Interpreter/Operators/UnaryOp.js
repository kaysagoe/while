export default class UnaryOp
{
    constructor(token, expr)
    {
        this.token = token;
        this.value = expr;
    }

    toString()
    {
        return `!${this.value.toString()}`;
    }
}