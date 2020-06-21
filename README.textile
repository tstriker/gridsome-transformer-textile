A simple textile transformer for gridsome with a bit of magic to make things simpler.

h1. Installation & configuration

In your gridsome repo: 

bc. npm install gridsome-transformer-textile

I imagine it's quite likely you'll use the transformer in combination with the @source-filesystem@ plugin, so 
here's config for that

<pre>
    plugins: [
        {
            use: "@gridsome/source-filesystem",
            options: {
                baseDir: "./content/read",
                path: "*.textile",
                typeName: "BlogPost",
            },
        },
    ],
    templates: {
        BlogPost: "/blog/:slug",  // the slug in this case is a property defined in the textile file
    },
</pre>


h1. The .textile files

Your textile files should have @.textile@ extension. To be able to have metadata and the textile content in the same file, 
the transformer expects the file to consist of two parts. 

# @[props]@ part is authored in "YAML":https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html
# The @[body]@ section should contain your actual content in "textile":https://textile-lang.com/

Here's what it looks like:

<pre>
[props]

title: Title of the page etc
tags:
  - one tag
  - two tag

[body]

Textile content goes in the [body] section. "linkage":https://github.com/tstriker/gridsome-transformer-textile/ and so on.

- list
- and
- so
- on

</pre>
