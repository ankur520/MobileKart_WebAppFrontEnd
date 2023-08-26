import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ------------------ CSS
import "./CSS/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// slide show css file
import "react-slideshow-image/dist/styles.css";

import * as Sentry from "@sentry/react";
import ErrorBoundary from "./ErrorBoundary";

Sentry.init({
  dsn: "https://2ff7e1328a107b8287b82a9358793906@o4505718919004160.ingest.sentry.io/4505718936436736",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "http://localhost:3000",
        "https:yourserver.io/api/",
      ],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

function FallbackComponent() {
  return <div>An error has occurred</div>;
}

const myFallback = <FallbackComponent />;
// Alternatively:
// const myFallback = () => <FallbackComponent />;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={myFallback} showDialog>
        <App />
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
