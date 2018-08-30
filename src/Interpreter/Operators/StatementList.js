export default class StatementList
{
    constructor()
    {
        this.children = [];
    }

    toString()
    {
        let string = ""
        for(let index = 0; index < this.children.length; index++)
        {
            if (index === this.children.length - 1)
            {
                string = `${string}${this.children[index].toString()}`;
            } else
            {
                string = `${string}${this.children[index].toString()};`;
            }
        }
        return string;
    }
}