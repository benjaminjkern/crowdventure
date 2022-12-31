export const escape = (text, newlines = false) =>
    text
        ? newlines
            ? text
                  .replace(/"$/, ' " ')
                  .replace(/^"/, ' " ')
                  .replace(/"""/g, ` "" " `)
            : text
                  .replace(/\n/g, "")
                  .replace(/\\/g, `\\\\`)
                  .replace(/"/g, `\\"`)
        : text;
