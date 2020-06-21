const assert = require("assert");
const TextileTransformer = require("../index");

describe("props and body", function () {
    it("get props", function () {
        let source = `
            The basic structure we expect is

            [props]
            a: some
            b: props
            c:
                - in yaml
                - format

            [body]

            Here's a [body] to add some confusion
        `;
        let transformer = new TextileTransformer();
        assert.deepEqual(transformer.parse(source), {
            props: {a: "some", b: "props", c: ["in yaml", "format"]},
            body: "Here's a [body] to add some confusion",
        });
    });
});
