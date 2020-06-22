const assert = require("assert");
const TextileTransformer = require("../index");

describe("props and body", function () {
    it("get props", function () {
        let source = `---
            a: some
            b: props
            c:
                - in yaml
                - format
            ---

            Hello _textile_ content.
        `;
        let transformer = new TextileTransformer();
        assert.deepEqual(transformer.parse(source), {
            a: "some",
            b: "props",
            c: ["in yaml", "format"],
            body: "<p>Hello <em>textile</em> content.</p>",
        });
    });
});
