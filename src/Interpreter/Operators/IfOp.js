export default class IfOp
{
    constructor(condition, positiveList, negativeList)
    {
        this.condition = condition;
        this.positiveList = positiveList;
        this.negativeList = negativeList;
    }

    toString()
    {
        return `if (${this.condition.toString()}) then (${this.positiveList.toString()}) else (${this.negativeList.toString()})`;
    }
}