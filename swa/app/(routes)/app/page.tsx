import HelloApiDemo from "../../components/HelloApiDemo";

export default function AppPage() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Authenticated App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome! You are now viewing the authenticated section of the application.
          </p>
        </div>
        
        {/* Azure Functions API Demo */}
        <HelloApiDemo />
      </main>
    </div>
  );
}
