import Lexer from "../../Lexer";
import Interpreter from "../../Intepreter";
import Parser from "../../Parser";

describe("bExp expressions", () => {
    describe("true", () => {
        test("runs true expression", () => {
            let lexer = new Lexer("if (true) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });
    });

    describe("false", () => {
        test("runs false expression", () => {
            let lexer = new Lexer("if (false) then (x := 1) then (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(0);
        });
    });

    describe("equal", () => {
        test("runs truthy equal expression", () => {
            let lexer = new Lexer("if (1 = 1) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(1);
        });

        test("runs falsey equal expression", () => {
            let lexer = new Lexer("if (1 = 0) then (skip) else (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(1);
        });

        test("runs equal expression consisting of variables", () => {
            let lexer = new Lexer("if (first = second) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(1);
        });

        test("runs equal expression with no whitespace", () => {
            let lexer = new Lexer("if (1=1) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(1);
        });

        test("runs equal expression consisting of negative numbers", () => {
            let lexer = new Lexer("if (-1 = -1) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });
    });

    describe("not equal", () => {
       test("runs truthy not equal expression", () => {
          let lexer = new Lexer("if (1 != 0) then (x := 1) else (x := 0)");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(1);
       });

       test("runs falsey not equal expression", () => {
           let lexer = new Lexer("if (1 != 1) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(0);
       });

       test("runs not equal expression consisting of variables", () => {
           let lexer = new Lexer("if (first != second) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {first: 1, second: 0});
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });

       test("runs not equal expression without whitespace", () => {
           let lexer = new Lexer("if (1!=0) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });

       test("runs not equal expression consisting of negative numbers", () => {
           let lexer = new Lexer("if (-1 != -2) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });
    });

    describe("greater than", () => {
        test("runs truthy greater than expression", () => {
            let lexer = new Lexer("if (1 > 0) then (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            let output = interpreter.interpret();
            expect(output.x).toBe(1);
        });

        test("runs falsey greater than expression for equal numbers", () => {
           let lexer = new Lexer("if (1 > 1) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(0);
        });

        test("runs falsey greater than expression for lesser numbers", () => {
            let lexer = new Lexer("if (1 > 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs greater than expression consisting of variables", () => {
            let lexer = new Lexer("if (first > second) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {first: 1 , second: 0});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs greater than expression without whitespace", () => {
            let lexer = new Lexer("if (1>0) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs greater than expression consisting of negative numbers", () => {
            let lexer = new Lexer('if (-1 > -2) then (x := 1) else (x := 0)');
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        })
    });

    describe("greater than or equal", () => {
       test("runs truthy greater then or equal expression for greater numbers", () => {
           let lexer = new Lexer("if (1 >= 0) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });

       test("runs truthy greater than or equal expression for equal numbers", () => {
           let lexer = new Lexer("if (1 >= 1) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });

       test("runs falsey greater than or equal expression", () => {
           let lexer = new Lexer("if (0 >= 1) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(0);
       });

       test("runs greater than or equal expression consisting of variables", () => {
           let lexer = new Lexer("if (first >= second) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {first: 1, second: 0});
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
        });

       test("runs greater than or equal expression with no whitespace", () => {
           let lexer = new Lexer("if (1>=0) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });

       test("runs greater than or equal expression consisting of negative number", () => {
           let lexer = new Lexer("if (-1 >= -2) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(1);
       });
    });

    describe("less than", () => {
        test("runs truthy less than expression", () => {
            let lexer = new Lexer("if (1 < 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey less than expression for equal numbers", () => {
            let lexer = new Lexer("if (1 < 1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs falsey less than expression for greater numbers", () => {
           let lexer = new Lexer("if (2 < 1) then (x := 1) else (x := 0)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser);
           let output = interpreter.interpret();

           expect(output.x).toBe(0);
        });

        test("runs less than expression consisting of variables", () => {
            let lexer = new Lexer("if (first < second) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {first: 1, second: 2});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs less than expression without whitespace", () => {
            let lexer = new Lexer("if (1<2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs less than expression consisting of negative numbers", () => {
            let lexer = new Lexer("if (-2 < -1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });
    });

    describe("less than or equal", () => {
        test("runs truthy less than or equal expression for lesser numbers", () => {
            let lexer = new Lexer("if (1 <= 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs truthy less than or equal expression for equal numbers", () => {
            let lexer = new Lexer("if (1 <= 1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey less than or equal expression", () => {
            let lexer = new Lexer("if (3 <= 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs less than or equal expression consisting of variables", () => {
            let lexer = new Lexer("if (first <= second) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {first: 1, second: 2});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs less than or equal expression without whitespace", () => {
            let lexer = new Lexer("if (1<=1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs less than or equal consisting of negative numbers", () => {
            let lexer = new Lexer("if (-1 <= -1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });
    });

    describe("not", () => {
        test("runs truthy not expression for false expression", () => {
            let lexer = new Lexer("if (!false) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey not expression for true expression", () => {
            let lexer = new Lexer("if (!true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs truthy not expression for binary boolean expression", () => {
            let lexer = new Lexer("if (!1 = 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey not expression for binary boolean expression", () => {
            let lexer = new Lexer("if (!1 = 1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });
    });

    describe("and", () => {
        test("runs truthy and expression for unary boolean expressions", () => {
            let lexer = new Lexer("if (true & true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsesy and expression for unary boolean expression", () => {
            let lexer = new Lexer("if (true & false) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs truthy and expression for binary boolean expression", () => {
            let lexer = new Lexer("if (1 = 1 & 2 > 1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey and expression for binary boolean expression", () => {
            let lexer = new Lexer("if (1 = 1 & 0 = 1) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs and expression without whitespace", () => {
            let lexer = new Lexer("if (true&true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });
    });
});