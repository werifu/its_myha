import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log('current:', localStorage.getItem('language'), 'next:', lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="mt-4 flex gap-4 justify-center">
      {[
        { code: 'en', label: 'EN' },
        { code: 'zh', label: '中' },
        { code: 'ja', label: '日' }
      ].map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`
            text-xl px-6 py-3 text-white 
            hover:scale-110 transition-transform 
            text-shadow font-bold outline 
            outline-white rounded
            shadow
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
