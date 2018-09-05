import AssignOp from "./Operators/AssignOp";
import BinaryOp from "./Operators/BinaryOp";
import Bool from "./Operators/Bool";
import IfOp from "./Operators/IfOp";
import NoOp from "./Operators/NoOp";
import Num from "./Operators/Num";
import StatementList from "./Operators/StatementList";
import UnaryOp from "./Operators/UnaryOp";
import Variable from "./Operators/Variable";
import WhileOp from "./Operators/WhileOp";
import {
    AND,
    EQUAL,
    GREATERTHAN,
    GREATERTHANEQUAL,
    LESSTHAN,
    LESSTHANEQUAL,
    MINUS,
    MUL, NOT,
    NOTEQUAL,
    PLUS
} from "./TokenTypes";

export default class Interpreter
{
    constructor(parser, smallStep = false, scope = {})
    {
        this.parser = parser;
        this.scope = scope;
        this.smallStep = smallStep;
        this.stepCount = 0;
        this.steps = [];
    }

    visit(node, rest = null)
    {
        if(node instanceof AssignOp)
        {
            return this.visitAssign(node, rest);
        } else if (node instanceof BinaryOp)
        {
            return this.visitBinary(node);
        } else if (node instanceof Bool)
        {
            return this.visitBool(node);
        } else if (node instanceof IfOp)
        {
            return this.visitIf(node, rest);
        } else if (node instanceof NoOp)
        {
            return this.visitNoOp(node, rest);
        } else if (node instanceof Num)
        {
            return this.visitNum(node);
        } else if (node instanceof StatementList)
        {
            return this.visitStatementList(node, rest);
        } else if (node instanceof UnaryOp)
        {
            return this.visitUnary(node);
        } else if (node instanceof Variable)
        {
            return this.visitVariable(node);
        } else if (node instanceof WhileOp)
        {
            return this.visitWhile(node, rest);
        }
    }

    visitAssign(node, rest)
    {
        this.scope[node.left.value] = this.visit(node.right);
        if(this.smallStep)
        {
            this.steps.push({
                statement: rest.toString(),
                rule: "ass",
                scope: Object.assign({}, this.scope)
            });
            this.stepCount += 1;
        }
    }

    visitBinary(node)
    {
        if (node.token.type === PLUS)
        {
            return this.visit(node.left) + this.visit(node.right);
        } else if (node.token.type === MINUS)
        {
            return this.visit(node.left) - this.visit(node.right);
        } else if (node.token.type === MUL)
        {
            return this.visit(node.left) * this.visit(node.right);
        } else if (node.token.type === AND)
        {
            return this.visit(node.left) && this.visit(node.right);
        } else if (node.token.type === GREATERTHANEQUAL)
        {
            return this.visit(node.left) >= this.visit(node.right);
        } else if (node.token.type === EQUAL)
        {
            return this.visit(node.left) === this.visit(node.right);
        } else if (node.token.type === LESSTHAN)
        {
            return this.visit(node.left) < this.visit(node.right);
        } else if (node.token.type === GREATERTHAN)
        {
            return this.visit(node.left) > this.visit(node.right);
        } else if (node.token.type === LESSTHANEQUAL)
        {
            return this.visit(node.left) <= this.visit(node.right);
        } else if (node.token.type === NOTEQUAL)
        {
            return this.visit(node.left) !== this.visit(node.right);
        }
    }

    visitBool(node)
    {
        return node.value;
    }

    visitIf(node, rest)
    {
        if(this.visit(node.condition))
        {
            if(this.smallStep)
            {
                this.steps.push({
                    statement: `${node.positiveList.toString()}; ${rest.toString()}`,
                    rule: "if-tt",
                    scope: Object.assign({}, this.scope)
                });
                this.stepCount += 1;
            }
            this.visit(node.positiveList);
        } else
        {
            if(this.smallStep)
            {
                let statement = (rest.children.length === 0) ? `${node.negativeList.toString()}` :
                    `${node.negativeList.toString()}; ${rest.toString()}`;

                this.steps.push({
                    statement: statement,
                    rule: "if-ff",
                    scope: Object.assign({}, this.scope)
                });
                this.stepCount += 1;
            }
            this.visit(node.negativeList);
        }
    }

    visitNoOp(node, rest)
    {
        if(this.smallStep)
        {
            this.steps.push({
                statement: rest.toString(),
                rule: "skip",
                scope: Object.assign({}, this.scope)
            });
            this.stepCount += 1;
        }
    }

    visitNum(node)
    {
        return node.value;
    }

    visitStatementList(node, rest)
    {
        for(let index = 0; index < node.children.length; index++)
        {
            if (index !== 0)
            {
                this.stepCount += 1;
            }

            if(this.smallStep)
            {
              let newRest = new StatementList();

              let newIndex = index + 1;
              while(newIndex < node.children.length)
              {
                  newRest.children.push(node.children[newIndex]);
                  newIndex++;
              }

              if (rest !== null)
              {
                  for(let statement of rest.children)
                  {
                      newRest.children.push(statement);
                  }
              }

              this.visit(node.children[index], newRest);
            } else
            {
                this.visit(node.children[index]);
            }
        }
    }

    visitUnary(node)
    {
        if (node.token.type === NOT)
        {
            return !this.visit(node.value);
        } else if (node.token.type === MINUS)
        {
            return -1 * this.visit(node.value);
        }


    }

    visitVariable(node)
    {
        let varName = node.value;
        if(this.scope[varName] !== undefined)
        {
            return this.scope[varName];
        } else
        {

            this.scope[varName] = 0;
            return 0;
        }
    }

    visitWhile(node, rest)
    {
        if(this.smallStep)
        {
            this.steps.push({
                statement: `if (${node.condition.toString()}) then (${node.statementList.toString()}; ${node.toString()}) else ( skip); ${rest.toString()}`,
                rule: "while",
                scope: Object.assign({}, this.scope)
            });
            this.stepCount += 1;
        }
        while(this.visit(node.condition))
        {
            if(this.smallStep)
            {
                this.steps.push({
                    statement: `${node.statementList.toString()}; ${node.toString()}; ${rest.toString()}`,
                    rule: "if-tt",
                    scope: Object.assign({}, this.scope)
                });
                this.stepCount += 1;
                rest.children.unshift(node);
                this.visit(node.statementList, rest);
                rest.children.shift();
                if(this.smallStep)
                {
                    this.steps.push({
                        statement: `if (${node.condition.toString()}) then (${node.statementList.toString()}; ${node.toString()}) else ( skip); ${rest.toString()}`,
                        rule: "while",
                        scope: Object.assign({}, this.scope)
                    });
                    this.stepCount += 1;
                }
            } else
            {
                this.visit(node.statementList);
            }
        }

        if(this.smallStep)
        {
            this.steps.push({
                statement: `skip; ${rest.toString()}`,
                rule: "if-ff",
                scope: Object.assign({}, this.scope)
            });
            this.steps.push({
                statement: `${rest.toString()}`,
                rule: "skip",
                scope: Object.assign({}, this.scope)
            });
            this.stepCount += 2;
        }
    }

    interpret()
    {
        let tree = this.parser.parse();
        this.visit(tree);
        if (this.smallStep)
        {
            return this.steps;
        } else
        {
            return this.scope;
        }
    }
}