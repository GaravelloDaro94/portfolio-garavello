export default function Footer() {
  return (
    <footer className="mobile-footer fixed left-0 top-0 h-screen z-40 flex items-center justify-center">
      <div 
        className="bg-blue-pastel/30 dark:bg-dark-blue-gray/40 backdrop-blur-sm border-r-2 border-light-border dark:border-dark-medium py-4 px-3"
      >
        <p className="text-xs sm:text-sm text-light-text dark:text-gray-400 whitespace-nowrap">
          <span className="mobile-only">© 2026 Darío Garavello</span>
          <span className="desktop-only" style={{ writingMode: 'vertical-rl' }}>© 2026 Darío Garavello</span>
        </p>
      </div>
    </footer>
  );
}
