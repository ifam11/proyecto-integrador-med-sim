import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import './ResolverCuestionario.css';

type Option = { id: number; label: string; is_correct?: number | boolean };
type Question = { id: number; stem: string; type: 'MCQ' | 'MSQ' | 'TRUE_FALSE'; options: Option[] };
type Quiz = { id: number; title: string; scope: string };
type StartRes = { attemptId: number; quiz?: Quiz; questions?: Question[] };

export default function ResolverCuestionario() {
  const { id } = useParams();
  const nav = useNavigate();
  const quizId = Number(id);

  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ score?: number; correct?: number; total?: number } | null>(null);
  const [err, setErr] = useState('');

  // iniciar intento
  useEffect(() => {
    (async () => {
      setErr('');
      try {
        const { data } = await api.post<StartRes>(`/attempts/${quizId}/start`);
        setAttemptId(data.attemptId);
        if (data.quiz) setQuiz(data.quiz);
        if (data.questions?.length) setQuestions(data.questions);
        // fallback: si el backend no devuelve preguntas en start, intenta obtenerlas
        if (!data.questions?.length) {
          try {
            const full = await api.get<{ quiz: Quiz; questions: Question[] }>(`/quizzes/${quizId}`);
            setQuiz(full.data.quiz);
            setQuestions(full.data.questions || []);
          } catch {/* ignore */}
        }
      } catch (e:any) {
        setErr(e?.response?.data?.message || 'No se pudo iniciar el intento');
      }
    })();
  }, [quizId]);

  const total = questions.length;
  const answeredCount = useMemo(
    () => Object.values(answers).filter(a => a && a.length > 0).length,
    [answers]
  );

  function toggleAnswer(qid: number, oid: number, type: Question['type']) {
    setAnswers(prev => {
      const current = prev[qid] || [];
      if (type === 'MCQ' || type === 'TRUE_FALSE') {
        return { ...prev, [qid]: [oid] };
      }
      // MSQ (multiple)
      const exists = current.includes(oid);
      return { ...prev, [qid]: exists ? current.filter(x => x !== oid) : [...current, oid] };
    });
  }

  async function saveAnswer(qid: number) {
    if (!attemptId) return;
    const optionIds = answers[qid] || [];
    try {
      await api.post(`/attempts/${attemptId}/answer`, { questionId: qid, optionIds });
    } catch (e:any) {
      setErr(e?.response?.data?.message || 'No se pudo guardar la respuesta');
    }
  }

  async function finish() {
    if (!attemptId) return;
    setSending(true);
    setErr('');
    try {
      // envía cualquier pregunta sin guardar aún (opcional)
      const pending = Object.entries(answers);
      for (const [qidStr, opts] of pending) {
        await api.post(`/attempts/${attemptId}/answer`, { questionId: Number(qidStr), optionIds: opts });
      }
      const { data } = await api.post<{ score: number; correct: number; total: number }>(`/attempts/${attemptId}/finish`);
      setResult(data);
    } catch (e:any) {
      setErr(e?.response?.data?.message || 'No se pudo finalizar el intento');
    } finally {
      setSending(false);
    }
  }

  if (err) return <div className="qr-wrap"><div className="error">{err}</div></div>;
  if (!attemptId) return <div className="qr-wrap"><div className="loading">Preparando intento…</div></div>;

  return (
    <section className="qr-wrap">
      <header className="qr-head">
        <div>
          <h2>{quiz?.title ?? 'Cuestionario'}</h2>
          <p className="muted">Progreso: {answeredCount}/{total}</p>
        </div>
        <div className="head-actions">
          <button className="btn-secondary" onClick={() => nav(-1)}>Volver</button>
          <button className="btn-primary" onClick={finish} disabled={sending || total === 0}>Finalizar intento</button>
        </div>
      </header>

      <div className="qr-body">
        {questions.map((q, idx) => (
          <article key={q.id} className="q-item">
            <div className="q-number">{idx + 1}</div>
            <div className="q-content">
              <h4 className="stem">{q.stem}</h4>
              <ul className="options">
                {q.options?.map(op => {
                  const isChecked = (answers[q.id] || []).includes(op.id);
                  return (
                    <li key={op.id}>
                      <label className={`opt ${isChecked ? 'checked' : ''}`}>
                        <input
                          type={q.type === 'MSQ' ? 'checkbox' : 'radio'}
                          name={`q-${q.id}`}
                          checked={isChecked}
                          onChange={() => toggleAnswer(q.id, op.id, q.type)}
                        />
                        <span>{op.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="q-actions">
                <button className="btn-save" onClick={() => saveAnswer(q.id)}>Guardar respuesta</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {result && (
        <div className="qr-result">
          <h3>Resultado</h3>
          <p>Puntaje: <b>{result.score}</b> — Correctas: {result.correct}/{result.total}</p>
        </div>
      )}
    </section>
  );
}
