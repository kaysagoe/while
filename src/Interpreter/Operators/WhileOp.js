export default class WhileOp
{
    constructor(condition, statementList)
    {
        this.condition = condition;
        this.statementList = statementList;
    }

    toString()
    {
        return `while (${this.condition.toString()}) do (${this.statementList.toString()})`;
    }
}