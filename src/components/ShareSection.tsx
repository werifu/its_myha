"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function ShareSection() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-center gap-2 z-50">
      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
        <Image
          src="/qr.png"
          alt="Game Website QR Code"
          width={100}
          height={100}
          className="border-4 border-white rounded-lg"
        />
      </div>
      <p className="text-m text-white text-shadow max-w-[200px] text-center">
        its-myha.werifu.xyz
      </p>
      <button
        onClick={async () => {
          const text = `${t('results.share_text')}\n${t('results.play_link')}: https://its-myha.werifu.xyz`;

          let toastTimeout: number = 0;
          const showToast = () => {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-32 inset-x-0 mx-auto w-fit bg-black/80 text-white px-4 py-2 rounded-lg text-sm animate-fade z-[9999]';
            toast.textContent = t('results.link_copied');

            document.body.appendChild(toast);
            toastTimeout = window.setTimeout(() => {
              toast.remove();
            }, 2000);
          };

          try {
            await navigator.clipboard.writeText(text);
            showToast();
          } catch {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast();
          } finally {
            clearTimeout(toastTimeout);
          }
        }}
        className="text-l px-2 py-2 text-white hover:scale-105 transition-transform text-shadow font-bold outline outline-white rounded shadow"
      >
        {t('results.copy_link')}
      </button>
    </div>
  );
} 