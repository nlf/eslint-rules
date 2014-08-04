module.exports = function (context) {
    var warn = function (node) {
        context.report(node, "'require' statements must be at module top");
    };

    var isRequire = function (node) {
        if (node.init && node.init.type === "CallExpression" && node.init.callee.name === "require") {
            return true;
        }

        return false;
    };

    var checkPosition = function (first, second) {
        if (!first && firstLine(second) > 1) {
            return warn(second);
        }

        if (first && firstLine(second) - lastLine(first) > 1) {
            return warn(second);
        }
    };

    var firstLine = function (node) {
        if (!node.leadingComments) {
            return node.loc.start.line;
        }

        if (node.leadingComments[0].loc.start.line < node.loc.start.line) {
            return node.leadingComments[0].loc.start.line;
        }

        return node.loc.start.line;
    };

    var lastLine = function (node) {
        if (!node.leadingComments) {
            return node.loc.end.line;
        }

        if (node.leadingComments[node.leadingComments.length - 1].loc.end.line > node.loc.end.line) {
            return node.leadingComments[node.leadingComments.length - 1].loc.end.line;
        }

        return node.loc.end.line;
    };

    return {
        "Program": function (node) {

            var body = node.body;
            var lastRequire;

            for (var i = 0, il = body.length; i < il; ++i) {
                var statement = body[i];

                if (statement.type === 'VariableDeclaration') {
                    for (var s = 0, sl = statement.declarations.length; s < sl; ++s) {
                        var declaration = statement.declarations[s];

                        if (isRequire(declaration)) {
                            checkPosition(lastRequire, statement);
                            lastRequire = statement;
                        }
                    }
                }
            }
        },
        "VariableDeclarator": function (node) {

            if (isRequire(node)) {
                if (node.parent && node.parent.parent && node.parent.parent.type !== "Program") {
                    warn(node);
                }
            }
        }
    };
};
