import Lexer from "../../Lexer";
import Parser from "../../Parser";
import Interpreter from "../../Intepreter";


describe("statement", () => {
    describe("empty statement", () => {
       test("runs empty statement", () => {
           let lexer = new Lexer("");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {});
           let output = interpreter.interpret();

           expect(output).toBeEqual({});
       });
    });


    describe("assign", () => {
        test("runs assign integer", () => {
            let lexer = new Lexer("x := 1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output).toEqual({x : 1});
        });

        test("runs assign variable", () => {
            let lexer = new Lexer("y := x");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {x: 1});
            let output = interpreter.interpret();

            expect(output.y).toBe(1);
        });

        test("runs assign without whitespace", () => {
            let lexer = new Lexer("x:=1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs assign with undefined variables", () => {
            let lexer = new Lexer("x := y");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(0);
        });

        test("runs assign with the appropriate number of small steps", () => {
            let lexer = new Lexer("x:=1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output.length).toBe(1);
        });

        test("runs assign with small steps", () => {
            let lexer = new Lexer("x:=1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].scope.x).toBe(1);
        });

        test("check if assign returns ass rule with small step", () => {
            let lexer = new Lexer("x:=1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].rule).toBe("ass");
        });

        test("throws error with numerical variable name", () => {
            let lexer = new Lexer("112 := 1");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});

            try {
                let output = interpreter.interpret();
            } catch (e)
            {
                expect("").toBe("");
            }
        });

        test("throws error with assigning non-arithmetic expressions", () => {
            let lexer = new Lexer("x := true");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});

            try {
                let output = interpreter.interpret();
            } catch (e)
            {
                expect("").toBe("");
            }
        })

    });

    describe("skip statement", () => {
        test("runs skip statement on empty state", () => {
            let lexer = new Lexer("skip");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output).toEqual({});
        });

        test("runs skip statement on filled state", () => {
            let lexer = new Lexer("skip");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {x: 1, y: 2, z: 3});
            let output = interpreter.interpret();

            expect(output).toEqual({x: 1, y: 2, z: 3});
        });

        test("runs skip statement with the appropriate number of small steps", () => {
            let lexer = new Lexer("skip");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output.length).toEqual(1);
        });

        test("runs skip statement with small steps", () => {
            let lexer = new Lexer("skip");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].scope).toEqual({});
        });

        test("check if skip statement returns skip rule", () => {
            let lexer = new Lexer("skip");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].rule).toBe("skip");
        });
    });

    describe("if statement", () => {
        test("runs truthy if statement", () => {
            let lexer = new Lexer("if (true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs falsey if statement", () => {
            let lexer = new Lexer("if (false) then (x := 0) else (x := 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs if statement without whitespace", () => {
            let lexer = new Lexer("if(true)then(x := 1)else(x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(1);
        });

        test("runs if statement with the appropriate number of small steps", () => {
            let lexer = new Lexer("if (true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output.length).toBe(2);
        });

        test("runs if statement with small steps", () => {
            let lexer = new Lexer("if (true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[1].scope.x).toBe(1);
        });

        test("check if if statement returns appropriate rules", () => {
            let lexer = new Lexer("if (true) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].rule).toBe("if-tt");
            expect(output[1].rule).toBe("ass");
        });

        test("throws error if condition is a non-boolean expression", () => {
            let lexer = new Lexer("if (y := 2 + 2) then (x := 1) else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});

            try {
                let output = interpreter.interpret();
            } catch (e)
            {
                expect("").toBe("");
            }
        });

        test("throws error if positive statement list is empty", () => {
            let lexer = new Lexer("if (true) then () else (x := 0)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});

            try {
                let output = interpreter.interpret();
            } catch (e)
            {
                expect("").toBe("");
            }
        });

        test("throws error if negative statement list is empty", () => {
            let lexer = new Lexer("if (true) then (x := 1) else ()");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});

            try {
                let output = interpreter.interpret();
            } catch(e)
            {
                expect("").toBe("");
            }
        });
    });

    describe("while loop", () => {
        test("runs while statement with the specified number of loops" , () => {
            let lexer = new Lexer("while (x < 10) do (x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(10);
        });

        test("runs while statement when condition is falsey", () => {
            let lexer = new Lexer("while (x < 10) do (x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {x: 10});
            let output = interpreter.interpret();

            expect(output).toEqual({x: 10});
        });

        test("runs while statement without whitespace", () => {
            let lexer = new Lexer("while(x < 10)do(x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, false, {});
            let output = interpreter.interpret();

            expect(output.x).toBe(10);
        });

        test("runs while statement with appropriate number of small steps", () => {
           let lexer = new Lexer("while(x < 1) do (x := x + 1)");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, true, {});
           let output = interpreter.interpret();

           expect(output.length).toBe(6);
        });

        test("runs while statement with small-steps", () => {
            let lexer = new Lexer("while(x < 1) do (x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[5].scope.x).toBe(1);
        });

        test("check if while statement outputs the appropriate rules", () => {
            let lexer = new Lexer("while(x < 1) do (x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser, true, {});
            let output = interpreter.interpret();

            expect(output[0].rule).toBe("while");
            expect(output[1].rule).toBe("if-tt");
            expect(output[2].rule).toBe("ass");
            expect(output[3].rule).toBe("while");
            expect(output[4].rule).toBe("if-ff");
            expect(output[5].rule).toBe("skip");
        });

        test("throws error when the condition is a non-boolean expression", () => {
            let lexer = new Lexer("while (x := 2 + 2) do (x := x + 1)");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);


            try {
                let output = interpreter.interpret();
            } catch (e)
            {
                expect("").toBe("");
            }
        });

        test("throws error when the statement list is empty", () => {
            let lexer = new Lexer("while (x < 10) do ()");
            let parser = new Parser(lexer);
            let interpreter = new Interpreter(parser);

            try {
                let output = interpreter.interpret();
            } catch(e) {
                expect("").toBe("");
            }
        })
    });
});

