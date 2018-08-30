import Variable from "./Operators/Variable";
import {
    AND,
    ASSIGN,
    EQUAL, GREATERTHAN,
    GREATERTHANEQUAL,
    ID,
    INTEGER, LESSTHAN, LESSTHANEQUAL,
    LPAREN,
    MINUS,
    MUL,
    NOT, NOTEQUAL,
    PLUS,
    RPAREN,
    SEMI
} from "./TokenTypes";
import Num from "./Operators/Num";
import BinaryOp from "./Operators/BinaryOp";
import Bool from "./Operators/Bool";
import UnaryOp from "./Operators/UnaryOp";
import AssignOp from "./Operators/AssignOp";
import NoOp from "./Operators/NoOp";
import IfOp from "./Operators/IfOp";
import WhileOp from "./Operators/WhileOp";
import StatementList from "./Operators/StatementList";

export default class Parser
{
    constructor(lexer)
    {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(expectedType)
    {

        if(this.currentToken.type === expectedType)
        {
            this.currentToken = this.lexer.getNextToken();
        } else
        {
            throw new Error("Invalid syntax - Unexpected Token");
        }
    }

    variable()
    {
        // variable: ID
        let node = new Variable(this.currentToken);
        this.eat(ID);

        return node;
    }

    aExp()
    {
        // aExp: variable | INTEGER | aExp PLUS aExp | aExp MINUS aExp | aExp MUL aExp
        let node;
        if (this.currentToken.type === ID)
        {
            node = this.variable();
        } else if (this.currentToken.type === MINUS)
        {
            let token = this.currentToken;
            this.eat(MINUS);

            if(this.currentToken.type === INTEGER)
            {
                node = new UnaryOp(token, this.aExp());
            } else if (this.currentToken.type === ID)
            {
                node = new UnaryOp(token, this.variable());
            }
        }
        else
        {
            node = new Num(this.currentToken);
            this.eat(INTEGER);
        }

        if(this.currentToken.type === PLUS || this.currentToken.type === MINUS ||
            this.currentToken.type === MUL)
        {
            let token = this.currentToken;

            if(this.currentToken.type === PLUS)
            {
                this.eat(PLUS);
            } else if (this.currentToken.type === MINUS)
            {
                this.eat(MINUS);
            } else if (this.currentToken.type === MUL)
            {
                this.eat(MUL);
            }

            node = new BinaryOp(node, token, this.aExp());
        }

        return node;
    }

    bExp()
    {
        // bExp: TRUE | FALSE | aExp EQUAL aExp | aExp GREATER THAN EQUAL aExp | NOT bExp | bEXP AND bExp
        let node;
        if (this.currentToken.type === ID &&
            (this.currentToken.value === true || this.currentToken.value === false))
        {
            node = new Bool(this.currentToken);
            this.eat(ID);

            if(this.currentToken.type === AND)
            {
                let token = this.currentToken;
                this.eat(AND);

                node = new BinaryOp(node, token, this.bExp());
            }
        } else if (this.currentToken.type === INTEGER || this.currentToken.type === ID)
        {
            node = this.aExp();
            let token = this.currentToken;

            if(this.currentToken.type === EQUAL)
            {
                this.eat(EQUAL);
            } else if (this.currentToken.type === GREATERTHANEQUAL)
            {
                this.eat(GREATERTHANEQUAL);
            } else if (this.currentToken.type === GREATERTHAN)
            {
                this.eat(GREATERTHAN);
            } else if (this.currentToken.type === LESSTHANEQUAL)
            {
                this.eat(LESSTHANEQUAL);
            } else if (this.currentToken.type === LESSTHAN)
            {
                this.eat(LESSTHAN);
            } else if (this.currentToken.type === NOTEQUAL)
            {
                this.eat(NOTEQUAL);
            }

            node = new BinaryOp(node, token, this.aExp());
        } else if (this.currentToken.type === NOT)
        {
            let token = this.currentToken;
            this.eat(NOT);
            node = new UnaryOp(token, this.bExp());
        }

        return node;
    }

    statement()
    {
        // statement: variable ASSIGN aExp | SKIP | IF bExp THEN statement_list ELSE statement_list |
        //              WHILE bExp DO statement_list

        let node;

        if(this.currentToken.value === "skip")
        {
            node = new NoOp();
            this.eat(ID);
        } else if (this.currentToken.value === "if")
        {
            this.eat(ID);

            this.eat(LPAREN);
            let condition = this.bExp();
            this.eat(RPAREN);

            this.eat(ID);

            this.eat(LPAREN);
            let positiveList = this.statementList();
            this.eat(RPAREN);

            let negativeList;
            if (this.currentToken.type === ID)
            {
                this.eat(ID);

                this.eat(LPAREN);
                negativeList = this.statementList();
                this.eat(RPAREN);
            } else
            {
                negativeList = new StatementList();
                negativeList.children.push(new NoOp());
            }


            node = new IfOp(condition, positiveList, negativeList);

        } else if (this.currentToken.value === "while")
        {
            this.eat(ID);

            this.eat(LPAREN);
            let condition = this.bExp();
            this.eat(RPAREN);

            this.eat(ID);

            this.eat(LPAREN);
            let statementList = this.statementList();
            this.eat(RPAREN);

            node = new WhileOp(condition, statementList);
        } else
        {
            node = this.variable();

            let token = this.currentToken;
            this.eat(ASSIGN);

            node = new AssignOp(node, token, this.aExp());

        }

        return node;
    }

    statementList()
    {
        let node = new StatementList();
        node.children.push(this.statement());

        while(this.currentToken.type === SEMI)
        {
            this.eat(SEMI);
            node.children.push(this.statement());
        }

        return node;
    }

    parse()
    {
        return this.statementList();
    }
}