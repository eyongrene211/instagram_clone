'use client';

import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import PageContent                     from './PageContent'; // Your main app component

export default function HomePage() {
  return (
    <>
      {/* If NOT signed in → show Clerk login */}
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900">
          <SignIn
            routing="hash"           // Use hash-based routing
            signUpUrl="/sign-up"     // Link to your sign-up page
            redirectUrl="/"          // Redirect here after sign-in
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
              },
            }}
          />
        </div>
      </SignedOut>

      {/* If signed in → show your main app */}
      <SignedIn>
        <PageContent />
      </SignedIn>
    </>
  );
}
