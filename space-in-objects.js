module.exports = function (context) {
    
    var isSpaced = function (left, right) {

        return left.range[1] < right.range[0];
    };

    var isSameLine = function (left, right) {

        return left.loc.start.line === right.loc.start.line;
    };

    var verifySpacing = function (node, tokens) {

        var hasElements = node.type === "ObjectExpression" && node.properties.length > 0;

        if (hasElements && !isSpaced(tokens[0], tokens[1])) {
            context.report(node, tokens[0].loc.end,
                    "A space is required after '" + tokens[0].value + "'");
        }

        if (hasElements && !isSpaced(tokens[tokens.length - 2], tokens[tokens.length - 1])) {
            context.report(node, tokens[tokens.length - 1].loc.start,
                    "A space is required before '" + tokens[tokens.length - 1].value + "'");
        }
    };

    return {
        "MemberExpression": function (node) {

            if (node.computed) {
                var tokens = context.getTokens(node.property, 1, 1);
                verifySpacing(node, tokens);
            }
        },
        "ObjectExpression": function (node) {

            var tokens = context.getTokens(node);
            verifySpacing(node, tokens);
        }
    };
};
