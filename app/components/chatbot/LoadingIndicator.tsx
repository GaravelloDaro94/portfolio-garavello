export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full animate-bounce bg-blue-500 dark:bg-blue-400" />
          <span className="w-2 h-2 rounded-full animate-bounce delay-100 bg-blue-500 dark:bg-blue-400" />
          <span className="w-2 h-2 rounded-full animate-bounce delay-200 bg-blue-500 dark:bg-blue-400" />
        </div>
      </div>
    </div>
  );
}