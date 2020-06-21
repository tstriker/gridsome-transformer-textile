const jsYaml = require("js-yaml");
const textile = require("textile-js");

class TextileTransformer {
    static mimeTypes() {
        return ["application/x-textile"];
    }

    parse(source) {
        /*
            The basic structure we expect is

            [props]
            a: some
            b: props
            c:
                - in yaml
                - format

            [body]
            Anything after the first [body] we meet is textile in *all* its beauty, freeform, anything after
        */

        let re = /\[props\](?<props>(.|\n)*?)\[body\](?<body>(.|\n)*)/gm;
        let res = re.exec(source);

        let props = (res.groups.props || "")
        props = props.trim() ? jsYaml.load(props) : {};

        let body = textile.parse((res.groups.body || "").trim());

        props.body = body;

        return props;
    }
}

module.exports = TextileTransformer;
