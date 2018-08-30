export default class Variable
{
    constructor(token)
    {
        this.token = token;
        this.value = this.token.value;
    }

    toString()
    {
        return `${this.value}`;
    }
}