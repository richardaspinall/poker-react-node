# frontend notes

The frontend was set up with `npm create vite@latest` (react, typescript)

- https://vitejs.dev/guide/

### Seeing console logs twice?

`<React.StrictMode>` wrapped around the app in `main.tsx` is causing this. If it's really getting in the way, you can simply remove the wrapper while you debug. It's useful for debugging though.

-https://legacy.reactjs.org/docs/strict-mode.html
