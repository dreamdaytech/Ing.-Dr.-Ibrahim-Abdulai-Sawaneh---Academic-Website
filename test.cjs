const text = "<p>Some text</p>";
console.log(text.replace(/<[^>]*>?/gm, ''));
