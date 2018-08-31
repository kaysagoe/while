## While Language Interpreter
According to Oxford Reference, the WHILE programming language is a small imperative programming language whose programs
are made from assignments, sequential composition, conditional statements and while statements. This project is an
program to interpret a WHILE program and return the output state of the program.

This interpreter is based on the WHILE programming language grammar below which is adapted is adapted to take into account
a potential online coding environment, handle ambiguity and promote ease of use and understanding of the language.


```
statement_list: statement | statement;statement
statement:      variable := aExp | skip | if (bExp) then (statement_list) else (statement_list) then (statement_list) | 
                while (bExp) do (statement_list)
bExp:           true | false | aExp = aExp | aExp > aExp | aExp >= aExp | aExp < aExp | aExp <= aExp |
                aExp != aExp | !bExp | bExp & bExp
aExp:           variable | n | aExp + aExp | aExp - aExp | aExp * aExp
variable:       s

``` 
where _n_ is an integer number, _s_ is a string of alphanumeric characters

### Built With
- Javascript - Programming Language
- React - Web Framework

### Features
- Tokenization of characters in the provided strings using Lexical analysis.
- Parsing of tokens into an Abstract Syntax Tree(AST) data structure.
- Interpreting items in the Abstract Syntax Tree using either small step or big step structural operational semantics.

### Usage
##### Big-Step Interpretation
```javascript
let lexer = new Lexer("x := 1; y := 2; z := 3");
let parser = new Parser(lexer);
let interpreter = new Interpreter(parser, false, {});
let output = interpreter.interpret();
```
This example produces the following output, representing the state of the program when it is done executing
```json
{
  "x": 1,
  "y": 2,
  "z": 3
}
```

##### Small-Step Interpretation
```javascript
let lexer = new Lexer("x := 1; y := 2; z := 3");
let parser = new Parser(lexer);
let interpreter = new Interpreter(parser, true, {});
let output = interpreter.interpret();
```
This example produces the following output, representing all the steps from the interpretation of the program using WHILE language rewrite system for rewriting configurations into other configurations

```json
[
  {
    "rule": "ass",
    "state": {
      "x": 1
    },
    "statement": "y := 2; z:= 3"
  },
  {
    "rule": "ass",
    "state": {
      "x": 1,
      "y": 2
    },
    "statement": "z := 3"
  },
  {
    "rule": "ass",
    "state": {
      "x": 1,
      "y": 2,
      "z": 3
    },
    "statement": ""
  }
]
```


### Project Roadmap
- Online Coding enviroment which will utilise the interpreter, where users will be able to write and run WHILE programs, learn how to use the WHILE language and solve challenges using the WHILE language
- Implementation of the use of ANTLR v4 for the parsing of tokens into Abstract Syntax Trees(AST) to improve interpretation speed