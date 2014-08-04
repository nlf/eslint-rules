module.exports = function (context) {
    return {
        "BlockStatement": function (node) {

            var body = node.body;
            var lastVar;

            for (var i = 0, il = body.length; i < il; ++i) {
                var statement = body[i];

                if (statement.type === 'VariableDeclaration') {
                    if ((lastVar === undefined && i > 0) ||
                        (lastVar !== undefined && i - lastVar > 1)) {

                        return context.report(node, { line: statement.loc.start.line, column: statement.loc.start.column }, "Variable declarations must be at top of scope");
                    }

                    lastVar = i;
                }
            }
        }
    };
};
