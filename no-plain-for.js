module.exports = function (context) {
    var warn = function (node) {

        context.report(node, "Use forEach whenever possible");
    };

    return {
        "ForStatement": warn,
        "ForInStatement": warn,
        "ForOfStatement": warn
    };
};
