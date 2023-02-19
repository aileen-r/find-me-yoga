# Find Me Yoga

**Super WIP**. I like doing yoga, but I haven't been doing enough lately. Trying to find a video across several platforms is hard. Choice paralysis is harder than normal early in the morning (which is when I like to practise).

This is going to be a helper app that picks my yoga video for me. It will ask a couple of questions about how much time I have and what my energy level is, then it will take me straight to a video. No need to scroll through video libraries.

## Planned stack

- Svelte frontend
- Supabase for storing my library of yoga video links and some metadata.
- Netlify for hosting
- Netlify edge functions for interacting with the DB.

Below here is the boilerplate README generated from create-svelte.

## TODO

- [ ] Add separate functions package.json and get it running in the build step.

----------------

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
