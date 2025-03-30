# Markdown Guide for Data Files

This guide explains how to use Markdown formatting in the `data.json` file for text formatting.

## Supported Markdown Features

The site supports standard Markdown syntax for text formatting in descriptions and content:

- **Bold text**: Surround text with double asterisks `**like this**`
- *Italic text*: Surround text with single asterisks `*like this*`
- Links: `[link text](https://example.com)`
- Lists:
  ```
  - Item 1
  - Item 2
  ```

## Using Markdown in data.json

The `data.json` file supports Markdown in description fields. Here are some examples:

```json
"descriptions": {
  "en": {
    "dj": "When I DJ, I like to play **Jazz**, **African Funk**, and **Progressive House**. All my sets are *improvised*."
  },
  "pt": {
    "dj": "Quando toco, gosto de passar **Jazz** e **Funk Africano**. Todos os meus *sets* são improvisados."
  }
}
```

## Best Practices

1. **Use Bold for Emphasis**: Use `**bold**` for genres, important terms, or points you want to emphasize.

2. **Use Italics for Foreign Terms**: In the Portuguese descriptions, use italics for English words: `*digital*`, `*vinyl*`, `*hobby*`.

3. **Keep Formatting Consistent**: If you bold a genre name in English, also bold it in Portuguese.

4. **Don't Overuse**: Too much formatting can make text harder to read.

## Language Keys vs. Tags

The site uses language keys like `en` and `pt` in JSON objects rather than tags like `@en` or `@pt`. This is the recommended approach because:

1. It creates a clear structure for multilingual content
2. It allows fallbacks (if Portuguese isn't available, it falls back to English)
3. It follows JSON structure conventions
4. It's more maintainable and easier to read

Example of the preferred structure:

```json
"title": {
  "en": "My Projects",
  "pt": "Meus Projetos"
}
```

This is better than using tags like:

```json
"title": "My Projects @en Meus Projetos @pt"
```

## How Markdown Rendering Works

The site uses the `marked` library to process Markdown in the content. When a description is displayed, the `processMarkdown()` function converts Markdown syntax to HTML:

```javascript
const processMarkdown = (text) => {
  if (!text) return '';
  marked.setOptions({
    gfm: true,
    breaks: true
  });
  return marked.parse(text);
};
```

This function is called with the `set:html` directive in Astro templates:

```astro
<p class="description" set:html={processMarkdown(description)}></p>
``` 