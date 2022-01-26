---
'xstate': minor
---

author: @Andarist
author: @mattpocock

Added the ability to tighten TS declarations of machine with generated metadata. This opens several exciting doors to being able to use typegen seamlessly with XState to provide an amazing typing experience.

With the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode), you can specify a new attribute called `tsTypes: {}` in your machine definition:

```ts
const machine = createMachine({
  tsTypes: {},
})
```

The extension will automatically add a type assertion to this property, which allows for type-safe access to a lot of XState's API's.