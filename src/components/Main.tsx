export default function Main({ onStart }: { onStart: () => void }) {
  return (
    <>
      <h1 className="text-4xl mb-0">问答游戏</h1>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        开始游戏
      </button>
    </>
  );
} 