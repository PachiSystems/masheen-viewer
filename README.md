This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Prerequistes

You will need Node.js installed to run this... Open a terminal and type `node -v`. If you don't get any version number, but some kind of command unknown, then head over to [Node.js](https://nodejs.org) and follow the instructions there to install it on your system.

## Getting Started

You'll want to do a little bit of config first. At the moment, there's only two things to do:

1. Locate the `variables.ts` file and change the `PATH_TO_SAVE_DIRECTORY` value to point to wherever StepMania hides its profile data.
       1. On Windows, something like `C:\Users\USERNAME\AppData\Roaming\StepMania 5\Save`
       1. On macOS, something like `/Users/USERNAME/Library/Application Support/StepMania 5/`
       1. On Linux, something like `/home/USERNAME/.stepmania-5.0/`
1. Come to think of it, it might not work on Windows... All that backslashing...
1. You can also change the `STEPMANIA_MACHINE_NAME` if you want, too... That's not quite as important...

Then, install the dependencies (from within the root of the project):

```bash
npm install
````

And finally run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you get any errors, stop the server and try again. If you still don't get anything showing, raise a bug or something.
