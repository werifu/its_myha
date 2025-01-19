export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 p-4 text-sm text-white/80 text-shadow">
      <div className="flex flex-col items-end gap-1">
        <a
          href="https://github.com/werifu/its_myha"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub Repository
        </a>
        <div>This is a fan-made work of BanG Dream Project. </div>
      </div>
    </footer>
  );
} 