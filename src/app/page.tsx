"use client";

import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user, login } = useUser();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {user ? `Welcome back, ${user.name}` : "Welcome to AI Note"}
        </h1>
        <p className="text-muted-foreground text-lg">
          {user ? "Ready to continue your learning journey?" : "Please log in to access your notes."}
        </p>
        {!user && (
          <button
            onClick={login}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Log In to Start
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for Quick Actions or Recent Notes */}
        <div className="p-6 rounded-lg border border-border bg-white hover:border-gray-300 transition-colors cursor-pointer group">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Create New Note</h3>
          <p className="text-sm text-muted-foreground">
            Start a new study session from scratch.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-border bg-white hover:border-gray-300 transition-colors cursor-pointer group">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Recent Library</h3>
          <p className="text-sm text-muted-foreground">
            Access your recently modified notes and PDFs.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-border bg-white hover:border-gray-300 transition-colors cursor-pointer group">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Study Mode</h3>
          <p className="text-sm text-muted-foreground">
            Review flashcards and take quizzes.
          </p>
        </div>

      </div>
      <div className="mt-12 rounded-xl border border-border bg-gray-50/50 p-8 text-center">
        <p className="text-muted-foreground text-sm">Select an action above to get started with your AI-powered study assistant.</p>
      </div>
    </div>
  );
}
