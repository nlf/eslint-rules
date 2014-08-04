module.exports = function (context) {
    var matcher = /\t+/;

    return {
        "Program": function (node) {

            var lines = context.getSourceLines();
            for (var i = 0, il = lines.length; i < il; ++i) {
                var match = matcher.exec(lines[i]);

                if (match) {
                    context.report(node, { line: i + 1, column: match.index + 1 }, "Hard tabs not allowed.");
                }
            }
        }
    }
};
