module.exports = function (context) {
    var exports = [];

    return {
        "AssignmentExpression": function (node) {

            if (node.left.object && node.left.object.name === "exports") {
                exports.push(node);
            }
        },
        "Program:exit": function (node) {

            if (exports.length === 1) {
                context.report(node, { line: exports[0].loc.start.line, column: exports[0].loc.start.column }, "If only using one export, assign to 'module.exports'");
            }
        }
    };
};
