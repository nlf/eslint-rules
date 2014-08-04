module.exports = function (context) {
    return {
        "VariableDeclaration": function (node) {

            if (node.kind === 'var') {
                var emptyVars = node.declarations.filter(function (declaration) {
                    return declaration.init === null;
                });

                if (node.declarations.length > 1 && node.declarations.length > emptyVars.length) {
                    context.report(node, { line: node.loc.start.line, column: node.loc.start.column }, "Cannot declare more than one variable per 'var' statement unless all are undefined");
                }
            }
        }
    };
};
