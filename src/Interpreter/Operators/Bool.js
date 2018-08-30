export default class Bool
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