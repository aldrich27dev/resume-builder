# Resume Builder (React + Vite)

A resume template builder that lets you fill in your details and generate a **print-ready / save-as-PDF** resume.

## Features

- **Live resume preview** that updates as you type
- **Personal details + portrait upload**
  - Upload a photo that appears in the header of the resume
- **Electronic signature upload**
  - Upload an image/Png of your signature and it overlays in the signature area for the final print layout
- **Section visibility toggles**
  - Hide/show: Objective, Education, Work Experience, Awards, Skills, Seminars & Trainings, References
- **Strict validation gating for printing**
  - The **Print / Save PDF** button is enabled only when:
    - Full name is not the default placeholder (`JOHN DOE`)
    - Address is not left as the placeholder (`123 Example St., ...`)
    - Phone is not left as the default placeholder (`+63 900 000 0000`)
    - Email matches a basic email regex and is not left as the default (`johndoe@example.com`)
- **Auto file naming on print**
  - When printing, the browser document title is set to:
    - `"<FullNameWithUnderscores>_Resume"`

## How to run

```bash
npm install
npm run dev
```

Open the local URL (Vite will print it in the terminal).

## Build for production

```bash
npm run build
```

## How printing works

- Elements marked with `no-print` are hidden during printing.
- The preview document is wrapped in a `.print-area`.
- Print styling ensures:
  - white background
  - black text
  - proper margins via `@page`
  - reduced visual artifacts in print

## Stack

- React 19
- Vite
- Tailwind CSS
- lucide-react (icons)

## Files of interest

- `src/App.jsx`
  - Validation rules + enables/disables **Print / Save PDF**
- `src/components/ResumeForm.jsx`
  - Form inputs, section toggles, photo/signature uploads
- `src/components/ResumePreview.jsx`
  - Print-ready resume layout + conditional section rendering

