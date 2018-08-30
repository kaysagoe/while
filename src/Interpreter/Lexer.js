import {keywords} from "./Keywords";
import Token from "./Models/Token";
import {
    AND,
    ASSIGN,
    EOF, EQUAL, GREATERTHAN,
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

export default class Lexer
{
    constructor(text)
    {
        this.text = text;
        this.position = 0;
        this.currentChar = this.text[this.position];
    }

    getNextToken()
    {
        while (this.currentChar != null)
        {
            if (Lexer.isWhitespace(this.currentChar))
            {
                this.skipWhitespace()
            } else if (Lexer.isDigit(this.currentChar))
            {
                return this.integer();
            } else if (Lexer.isAlphaNum(this.currentChar))
            {
                return this.id();
            } else if (this.currentChar === ";")
            {
                this.advance();
                return new Token(SEMI, ";");
            } else if (this.currentChar === ":" && this.peek() === "=")
            {
                this.advance();
                this.advance();
                return new Token(ASSIGN, ":=");
            } else if (this.currentChar === ">" && this.peek() === "=")
            {
                this.advance();
                this.advance();
                return new Token(GREATERTHANEQUAL, ">=");
            } else if (this.currentChar === "<" && this.peek() === "=")
            {
                this.advance();
                this.advance();
                return new Token(LESSTHANEQUAL, "<=");
            } else if (this.currentChar === "!" && this.peek() === "=")
            {
                this.advance();
                this.advance();
                return new Token(NOTEQUAL, "!=");
            }
            else if (this.currentChar === "=")
            {
                this.advance();
                return new Token(EQUAL, "=");
            } else if (this.currentChar === "!")
            {
                this.advance();
                return new Token(NOT, "!");
            } else if (this.currentChar === "&")
            {
                this.advance();
                return new Token(AND, "&");
            } else if (this.currentChar === "<")
            {
                this.advance();
                return new Token(LESSTHAN, "<");
            } else if (this.currentChar === ">")
            {
                this.advance();
                return new Token(GREATERTHAN, ">");
            } else if (this.currentChar === "+")
            {
                this.advance();
                return new Token(PLUS, "+");
            } else if (this.currentChar === "-")
            {
                this.advance();
                return new Token(MINUS, "-");
            } else if (this.currentChar === "*")
            {
                this.advance();
                return new Token(MUL, "*");
            } else if (this.currentChar === "(")
            {
                this.advance();
                return new Token(LPAREN, "(");
            } else if (this.currentChar === ")")
            {
                this.advance();
                return new Token(RPAREN, ")");
            } else
            {
                throw new Error(`Invalid Character - Symbol "${this.currentChar}" is not recognised`)
            }
        }

        return new Token(EOF, null);
    }

    static isWhitespace(text)
    {
        return text.trim().length === 0;
    }

    static isAlphaNum(text)
    {
        return text.match(/^[a-z0-9]+$/i) !== null;
    }

    static isDigit(text)
    {
        return !isNaN(text);
    }

    peek()
    {
        let peekPosition = this.position + 1;

        return this.text[peekPosition];
    }

    skipWhitespace()
    {
        while(this.currentChar != null && Lexer.isWhitespace(this.currentChar))
        {
            this.advance();
        }
    }

    advance()
    {
        this.position += 1;
        if(this.position > this.text.length)
        {
            this.currentChar = null;
        }
        else
        {
            this.currentChar = this.text[this.position];
        }
    }

    id()
    {
        let result = "";
        while(this.currentChar != null && Lexer.isAlphaNum(this.currentChar))
        {
            result += this.currentChar;
            this.advance();
        }

        if(keywords.has(result))
        {
            return new Token(ID, keywords.get(result));
        } else
        {
            return new Token(ID, result);
        }
    }

    integer()
    {
        let result = "";
        while(this.currentChar != null && Lexer.isDigit(this.currentChar))
        {
            result += this.currentChar;
            this.advance();
        }

        return new Token(INTEGER, Number(result));
    }

}