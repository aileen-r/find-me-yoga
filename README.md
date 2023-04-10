# Find Me Yoga

**Super WIP**. I'm working and learning in public on this one, so feel free to poke around and judge my incomplete work. 😅

I like doing yoga, but I haven't been doing enough lately. Trying to find a video across several platforms is hard. Choice paralysis is harder than normal early in the morning (which is when I like to practise).

This is going to be a helper app that picks my yoga video for me. It will ask a couple of questions about how much time I have and what my energy level is, then it will take me straight to a video. No need to scroll through video libraries.

## Planned stack

- Svelte frontend
- TailwindCSS (I don't like it, but I've never given it a proper go before)
- Google Sheets for a "database" (I've never tried this before, and you know what, it seems ideal for a wee project like this where the end user is myself)
- Netlify for hosting
- Netlify edge functions for interacting with the DB.

## Planned features

Here are my planned "big ticket" items for this app, if I don't lose interest in developing it over time. The "versions" are pretty meaningless, but they group features by an app area or function.

### Version 1
- [*] The "find me yoga" flow which asks about duration and energy.
- [ ] Subscription (i.e. to a yoga platform) preferences which can be checked and unchecked, which filters what videos can be chosen. Preference can live in local storage for now.
- [*] The "find me yoga" flow prioritises videos with incomplete meta data.

### Version 2
- [ ] Yoga library: a readonly view for visitors with metadata, searching, and filters.
- [ ] Yoga library: a CRUD interface for me to manage my library (videos and subscriptions).

### Version 3
- [ ] A "done" button on the chosen video screen for tracking practices. This will introduce a "practice" entity with a timestamp. I'm yet to decide if I want to add users or keep this just for myself.

### Version 4
- [ ] Post-yoga screen: some "fill in the blanks" questions, which will be used to populate any empty columns for the video entity.
- [ ] Find me yoga flow: more questions on things like yoga style, teacher, etc.

### Version 5
- [ ] Props or warm-up interstitial. For the case if a video is chosen that requires fetching props, or doing a warm-up before hand.

### Version 6
- [ ] Yoga journal: a feature for capturing some notes which are attached to a single "practice" entity.

## Local development

### Frontend only

```bash
npm install
npm run dev
```

When running the frontend only, pages that hit the API hosted with Netlify functions will error.

### With Netlify functions

I don't have dev credentials or secrets at this time, so this guide is for my use only. This assumes you have the Netlify CLI installed and configured.

1. Copy the `googleapi-keys.json` file and name the new file `googleapi-keys.dev.json`.
2. Create a .env file at the root of the project. Add a GOOGLE_APPLICATION_CREDENTIALS variable with the path to the dev keys file.
3. Add the following environment variables: GOOGLE_SPREADSHEET_ID, GOOGLE_PROJECT_ID, GOOGLE_PRIVATE_KEY_ID, GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_CERT_URL. The values for these can be found in my password manager.
4. Update the file path in `populateGoogleKeys.js` to be the dev key file.
5. Run

```bash
npm install
netlify dev
```