module.exports = function (context) {
    return {
        "SwitchStatement": function (node) {

            context.report(node, { line: node.loc.start.line, column: node.loc.start.column }, "Avoid use of switch statements");
        }
    }
};
