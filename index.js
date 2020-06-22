const jsYaml = require("js-yaml");
const textile = require("textile-js");

class TextileTransformer {
    static mimeTypes() {
        return ["application/x-textile"];
    }

    parse(source) {
        /*
            We expect frontmatter specifying metas in YAML, followed by the actual page content.
            So it should look something like this:

            ---
            a: some
            b: props
            c:
                - in yaml
                - format
            ---

            h1. Hello world

            Anything after the second set of triple-dashes is _textile_.
        */

        let re = /^(---)(?<props>(.|\n)*?)(---)(?<body>(.|\n)*)/gm;
        let res = re.exec(source);
        let props = {};
        let body = source;
        if (res) {
            props = (res.groups.props || "")
            props = props.trim() ? jsYaml.load(props) : {};
            body = textile.parse((res.groups.body || "").trim());
        }

        props.body = body;
        return props;
    }
}

module.exports = TextileTransformer;
