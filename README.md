A simple textile transformer for gridsome with a bit of magic to make things simpler.

# Installation & configuration

In your gridsome repo:

```npm install gridsome-transformer-textile```

I imagine it's quite likely you'll use the transformer in combination with the `source-filesystem` plugin, so
here's config for that

```
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
```


# The .textile files

Your textile files should have `.textile` extension. Use frontmatter syntax to specify metadata in YAML format.

Here's what it looks like:

```
---
title: Title of the page etc
tags:
  - one tag
  - two tag
---

Textile content goes in the [body] section.
"linkage":https://github.com/tstriker/gridsome-transformer-textile/ and so on.

- list
- and
- so
- on

```

# Gridsome template

The transformer will return an object that will have all the properties you have defined in the frontmatter section,
plus the content will added as `.body` property.
Here's how you query for it in the gridsome template:

```
<template>
    <div class="page">
        I'm a post, short and stout.

        <div v-html="$page.blogPost.body" />
    </div>
</template>


<page-query>
query ($id: ID!) {
  blogPost(id: $id) {
    slug
    body
  }
}
</page-query>
```
