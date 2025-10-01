import './IdiomaTema.css';
import { useEffect, useMemo, useState } from 'react';

const LANGS = ['es', 'en', 'pt'] as const;
type Lang = typeof LANGS[number];

const DICT: Record<Lang, { title: string; sample: string; }> = {
  es: { title: 'Idioma y Tema', sample: 'Ejemplo de interfaz en Español.' },
  en: { title: 'Language & Theme', sample: 'Sample interface in English.' },
  pt: { title: 'Idioma e Tema', sample: 'Exemplo de interface em Português.' },
};

const THEME_KEY = 'mevaltec:theme';
const LANG_KEY  = 'mevaltec:lang';

export default function IdiomaTema() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem(THEME_KEY) as 'light'|'dark') || 'light');
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem(LANG_KEY) as Lang) || 'es');

  const t = useMemo(() => DICT[lang], [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return (
    <section className="idioma-tema">
      <div className="panel">
        <h2>{t.title}</h2>
        <div className="controls">
          <div className="group">
            <span>Tema</span>
            <div className="segmented">
              <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => setTheme('light')}
              >
                Claro
              </button>
              <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => setTheme('dark')}
              >
                Oscuro
              </button>
            </div>
          </div>

          <div className="group">
            <span>Idioma</span>
            <div className="segmented">
              {LANGS.map(code => (
                <button
                  key={code}
                  className={lang === code ? 'active' : ''}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="preview">
          <h3>Preview</h3>
          <p>{t.sample}</p>
          <div className="chip">role: estudiante</div>
          <div className="chip">scope: respiratorio</div>
        </div>
      </div>
    </section>
  );
}
