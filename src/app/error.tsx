// app/error.tsx (ba app/dashboard/error.tsx)
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Console-e error log korbe (ba ekhane Sentry/LogRocket add korte paren)
    console.error("Unhandled Error caught:", error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Something went wrong!</h2>
        <p style={styles.message}>
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div style={styles.buttonGroup}>
          <button
            onClick={
              // Page-er state reset kore abar component render korar chesta korbe
              () => reset()
            }
            style={styles.primaryButton}
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.secondaryButton}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline styles (apni Tailwind CSS o use korte paren)
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "1rem",
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "0.75rem",
  },
  message: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
  secondaryButton: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
};
