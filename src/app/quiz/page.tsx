"use client";

import React, { useState, useMemo, useEffect } from "react";
import { allCourses, getAllQuestions } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { Question } from "@/types/course";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  Check,
  Shuffle,
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import Link from "next/link";

interface QuestionUserAnswer {
  selectedOptionId: string | null;
  clozeAnswers: { [key: string]: string };
  isSubmitted: boolean;
  isCorrect: boolean;
}

export default function QuizPage() {
  const { language, t, selectedWeekId } = useLanguage();
  const [selectedQuizWeek, setSelectedQuizWeek] = useState<string>(
    selectedWeekId || "week-01"
  );

  const rawQuestions: Question[] = useMemo(() => {
    if (selectedQuizWeek === "all") return getAllQuestions();
    const course = allCourses.find((c) => c.id === selectedQuizWeek);
    return course ? course.questions : getAllQuestions();
  }, [selectedQuizWeek]);

  // Session seed to trigger re-shuffling of options on mount or on replay
  const [sessionKey, setSessionKey] = useState<number>(0);

  useEffect(() => {
    // Generate initial randomized option permutation on mount
    setSessionKey(Date.now());
  }, []);

  // Dynamically shuffle options and word bank for each quiz session
  const questions: Question[] = useMemo(() => {
    if (sessionKey === 0) return rawQuestions;

    return rawQuestions.map((q) => {
      // Don't shuffle True/False questions (keep standard Vrai/True first, Faux/False second)
      if (q.type === "true_false" || !q.options || q.options.length <= 2) {
        return q;
      }

      // Perform a random Fisher-Yates shuffle on options copy
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledOptions[i];
        shuffledOptions[i] = shuffledOptions[j];
        shuffledOptions[j] = temp;
      }

      // Also shuffle word bank if fill_in_the_blank
      if (q.type === "fill_in_the_blank" && q.fillInData) {
        const frWords = [...q.fillInData.wordBank.fr];
        const enWords = [...q.fillInData.wordBank.en];
        for (let i = frWords.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [frWords[i], frWords[j]] = [frWords[j], frWords[i]];
        }
        for (let i = enWords.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [enWords[i], enWords[j]] = [enWords[j], enWords[i]];
        }
        return {
          ...q,
          options: shuffledOptions,
          fillInData: {
            ...q.fillInData,
            wordBank: {
              fr: frWords,
              en: enWords,
            },
          },
        };
      }

      return {
        ...q,
        options: shuffledOptions,
      };
    });
  }, [rawQuestions, sessionKey]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [index: number]: QuestionUserAnswer }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Switch quiz week handler
  const handleSelectQuizWeek = (newWeek: "week-01" | "week-10" | "all") => {
    if (newWeek === selectedQuizWeek) return;
    if (Object.keys(answers).length > 0) {
      const confirmed = window.confirm(
        language === "fr"
          ? "Changer de session réinitialisera votre progression actuelle. Continuer ?"
          : "Changing sessions will reset your current progress. Continue?"
      );
      if (!confirmed) return;
    }
    setSelectedQuizWeek(newWeek);
    setSessionKey(Date.now());
    setAnswers({});
    setCurrentIndex(0);
    setQuizFinished(false);
  };


  const currentQ = questions[currentIndex] || questions[0];
  const currentAns: QuestionUserAnswer = useMemo(() => {
    return (
      answers[currentIndex] || {
        selectedOptionId: null,
        clozeAnswers: {},
        isSubmitted: false,
        isCorrect: false,
      }
    );
  }, [answers, currentIndex]);

  // Compute live score and progress metrics
  const score = useMemo(() => {
    return Object.values(answers).filter((a) => a.isSubmitted && a.isCorrect).length;
  }, [answers]);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((a) => a.isSubmitted).length;
  }, [answers]);

  const scorePercentage = questions.length > 0
    ? Math.round((score / questions.length) * 100)
    : 0;

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (currentAns.isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...currentAns,
        selectedOptionId: optionId,
      },
    }));
  };

  // Fill in the blank word bank
  const handleWordBankClick = (word: string) => {
    if (currentAns.isSubmitted || !currentQ.fillInData) return;

    const cloze = { ...currentAns.clozeAnswers };
    if (!cloze.blank1) {
      cloze.blank1 = word;
    } else if (!cloze.blank2 && currentQ.fillInData.answers.blank2) {
      cloze.blank2 = word;
    } else if (!cloze.blank3 && currentQ.fillInData.answers.blank3) {
      cloze.blank3 = word;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...currentAns,
        clozeAnswers: cloze,
      },
    }));
  };

  const handleClearCloze = () => {
    if (currentAns.isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...currentAns,
        clozeAnswers: {},
      },
    }));
  };

  // Validate answer for current question
  const handleSubmitAnswer = () => {
    if (currentAns.isSubmitted) return;

    let isCorrect = false;

    if (currentQ.type === "fill_in_the_blank" && currentQ.fillInData) {
      const b1Expected = currentQ.fillInData.answers.blank1[language].toLowerCase().trim();
      const b1Actual = (currentAns.clozeAnswers.blank1 || "").toLowerCase().trim();

      let b2Correct = true;
      if (currentQ.fillInData.answers.blank2) {
        const b2Expected = currentQ.fillInData.answers.blank2[language].toLowerCase().trim();
        const b2Actual = (currentAns.clozeAnswers.blank2 || "").toLowerCase().trim();
        b2Correct = b2Actual === b2Expected;
      }

      let b3Correct = true;
      if (currentQ.fillInData.answers.blank3) {
        const b3Expected = currentQ.fillInData.answers.blank3[language].toLowerCase().trim();
        const b3Actual = (currentAns.clozeAnswers.blank3 || "").toLowerCase().trim();
        b3Correct = b3Actual === b3Expected;
      }

      isCorrect = b1Actual === b1Expected && b2Correct && b3Correct;
    } else if (currentQ.options) {
      const selected = currentQ.options.find((opt) => opt.id === currentAns.selectedOptionId);
      isCorrect = selected ? selected.isCorrect : false;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...currentAns,
        isSubmitted: true,
        isCorrect,
      },
    }));

    if (isCorrect) {
      triggerConfetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.7 },
        colors: ["#10b981", "#34d399", "#f59e0b"],
      });
    }
  };

  // Navigation handlers
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      if (score >= questions.length * 0.7) {
        triggerConfetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
        });
      }
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    if (answeredCount > 0) {
      const confirmed = window.confirm(t("confirmRestart"));
      if (!confirmed) return;
    }
    setSessionKey(Date.now());
    setAnswers({});
    setCurrentIndex(0);
    setQuizFinished(false);
  };

  // Shuffle options
  const handleShuffleOptions = () => {
    setSessionKey(Date.now());
    setAnswers({});
    setCurrentIndex(0);
  };

  // Render template with filled or empty blanks
  const renderClozeTemplate = () => {
    if (!currentQ.fillInData) return null;
    const template = currentQ.fillInData.template[language];
    const parts = template.split(/(\[blank1\]|\[blank2\]|\[blank3\])/g);

    return (
      <div className="text-base sm:text-lg font-serif leading-relaxed text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        {parts.map((part, idx) => {
          if (part === "[blank1]") {
            return (
              <span
                key={idx}
                className="inline-block mx-1 px-3 py-1 font-sans font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 border-b-2 border-amber-500 rounded"
              >
                {currentAns.clozeAnswers.blank1 || "_______"}
              </span>
            );
          }
          if (part === "[blank2]") {
            return (
              <span
                key={idx}
                className="inline-block mx-1 px-3 py-1 font-sans font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 border-b-2 border-amber-500 rounded"
              >
                {currentAns.clozeAnswers.blank2 || "_______"}
              </span>
            );
          }
          if (part === "[blank3]") {
            return (
              <span
                key={idx}
                className="inline-block mx-1 px-3 py-1 font-sans font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 border-b-2 border-amber-500 rounded"
              >
                {currentAns.clozeAnswers.blank3 || "_______"}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  const isClozeReady = () => {
    if (!currentQ.fillInData) return false;
    const hasB1 = Boolean(currentAns.clozeAnswers.blank1);
    const needsB2 = Boolean(currentQ.fillInData.answers.blank2);
    const hasB2 = Boolean(currentAns.clozeAnswers.blank2);
    const needsB3 = Boolean(currentQ.fillInData.answers.blank3);
    const hasB3 = Boolean(currentAns.clozeAnswers.blank3);

    return hasB1 && (!needsB2 || hasB2) && (!needsB3 || hasB3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Session / Week Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pl-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {t("quizWeekSelector")}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {allCourses.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectQuizWeek(c.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedQuizWeek === c.id
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {language === "fr"
                ? `Sem. ${c.weekNumber} (${c.questions.length})`
                : `Wk. ${c.weekNumber} (${c.questions.length})`}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleSelectQuizWeek("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedQuizWeek === "all"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {language === "fr" ? `Toutes (${getAllQuestions().length} Q)` : `All (${getAllQuestions().length} Q)`}
          </button>
        </div>
      </div>

      {/* Top Header Bar (matches user mock) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
          <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            {answeredCount} {t("answeredCount")}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Shuffle Options button */}
          <button
            type="button"
            onClick={handleShuffleOptions}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all shadow-sm active:scale-95"
            title={language === "fr" ? "Mélanger l'ordre des choix" : "Shuffle choices order"}
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-500" />
            <span>{t("shuffleOptions")}</span>
          </button>

          {/* Recommencer button */}
          <button
            type="button"
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{t("navRestart")}</span>
          </button>

          {/* Live Score Pill */}
          <div className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 shadow-sm">
            {t("quizScore")} : {score} / {questions.length} ({scorePercentage}%)
          </div>
        </div>
      </div>


      {!quizFinished ? (
        <div className="space-y-6">
          {/* Main Question Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-xl space-y-6 animate-slide-up">
            {/* Question Top Header: Number, Title, and Badges */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {currentQ.category[language]}
                  </span>

                  {currentQ.associatedVerseRef && (
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      {currentQ.associatedVerseRef}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug pt-1">
                  <span className="text-blue-700 dark:text-amber-400 mr-2">
                    {currentIndex + 1}.
                  </span>
                  {currentQ.question[language]}
                </h2>
              </div>

              {/* Status Badge: Validated Pill */}
              {currentAns.isSubmitted && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-sm flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{t("quizValidated")}</span>
                </div>
              )}
            </div>

            {/* ================= CLOZE / FILL IN THE BLANK ================= */}
            {currentQ.type === "fill_in_the_blank" && currentQ.fillInData && (
              <div className="space-y-5">
                {renderClozeTemplate()}

                {/* Word Bank */}
                {!currentAns.isSubmitted && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{t("wordBankTitle")}</span>
                      {(currentAns.clozeAnswers.blank1 ||
                        currentAns.clozeAnswers.blank2 ||
                        currentAns.clozeAnswers.blank3) && (
                        <button
                          type="button"
                          onClick={handleClearCloze}
                          className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                        >
                          {t("resetAnswer")}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentQ.fillInData.wordBank[language].map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() => handleWordBankClick(word)}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300 text-slate-800 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-800 transition-all active:scale-95 shadow-sm"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cloze Feedback */}
                {currentAns.isSubmitted && (
                  <div
                    className={`p-4 rounded-2xl flex items-start gap-3 border ${
                      currentAns.isCorrect
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200"
                        : "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200"
                    }`}
                  >
                    {currentAns.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-sm">
                        {currentAns.isCorrect
                          ? t("goodAnswerBadge")
                          : `${t("wrongAnswerBadge")} : ${currentQ.correctAnswerSummary[language]}`}
                      </p>
                      <p className="text-xs opacity-90 leading-relaxed">
                        {currentQ.explanation[language]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= OPTIONS (MCQ, TRUE/FALSE, ETYMOLOGY) ================= */}
            {currentQ.options && (
              <div className="space-y-3 pt-1">
                {currentQ.options.map((option, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = currentAns.selectedOptionId === option.id;
                  const isSubmitted = currentAns.isSubmitted;

                  // Dynamic card styling based on state
                  let containerStyle =
                    "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm";
                  let letterBadgeStyle =
                    "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

                  if (isSelected && !isSubmitted) {
                    containerStyle =
                      "bg-blue-50/70 dark:bg-amber-500/10 border-blue-500 dark:border-amber-500 text-blue-950 dark:text-amber-200 shadow-md";
                    letterBadgeStyle =
                      "bg-blue-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold";
                  }

                  if (isSubmitted) {
                    if (option.isCorrect) {
                      containerStyle =
                        "border-2 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-sm";
                      letterBadgeStyle = "bg-emerald-600 text-white font-black";
                    } else if (isSelected && !option.isCorrect) {
                      containerStyle =
                        "border-2 border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100 shadow-sm";
                      letterBadgeStyle = "bg-rose-600 text-white font-black";
                    } else {
                      containerStyle =
                        "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 opacity-60";
                      letterBadgeStyle =
                        "bg-slate-200 dark:bg-slate-800/60 text-slate-500 dark:text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      data-option-id={option.id}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col gap-2 ${containerStyle}`}
                    >
                      <div className="flex items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-3">
                          {/* Letter Badge: A, B, C, D */}
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0 ${letterBadgeStyle}`}
                          >
                            {letter}
                          </span>
                          <span className="text-sm sm:text-base font-semibold leading-relaxed">
                            {option.text[language]}
                          </span>
                        </div>

                        {/* Top-Right Status Tag */}
                        {isSubmitted && option.isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{t("goodAnswerBadge")}</span>
                          </span>
                        )}
                        {isSubmitted && isSelected && !option.isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 flex-shrink-0">
                            <XCircle className="w-4 h-4" />
                            <span>{t("wrongAnswerBadge")}</span>
                          </span>
                        )}
                      </div>

                      {/* Explanation displayed inside the correct option or selected wrong option */}
                      {isSubmitted && option.isCorrect && (
                        <p className="text-xs text-emerald-800 dark:text-emerald-200/90 leading-relaxed pt-1.5 border-t border-emerald-200 dark:border-emerald-800/60 ml-11">
                          {currentQ.explanation[language]}
                        </p>
                      )}
                      {isSubmitted && isSelected && !option.isCorrect && (
                        <p className="text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed pt-1.5 border-t border-rose-200 dark:border-rose-800/60 ml-11">
                          {language === "fr"
                            ? `La bonne réponse était : ${currentQ.correctAnswerSummary.fr}`
                            : `The correct answer was: ${currentQ.correctAnswerSummary.en}`}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bottom Actions Bar (Matches User Screenshot: Précédente / X sur N / Suivante) */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              {/* Previous Button */}
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={handlePreviousQuestion}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("navPrevious")}</span>
              </button>

              {/* Center Page Indicator: 1 sur N */}
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
                {currentIndex + 1} {t("ofQuestion")} {questions.length}
              </span>

              {/* Right Action Button: Valider ou Suivante */}
              {!currentAns.isSubmitted ? (
                <button
                  type="button"
                  disabled={
                    currentQ.type === "fill_in_the_blank"
                      ? !isClozeReady()
                      : !currentAns.selectedOptionId
                  }
                  onClick={handleSubmitAnswer}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 shadow-md shadow-blue-500/20 dark:shadow-amber-500/20 disabled:opacity-35 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <span>{t("validateAnswer")}</span>
                </button>
              ) : currentIndex + 1 < questions.length ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 shadow-md shadow-blue-500/20 dark:shadow-amber-500/20 transition-all active:scale-95"
                >
                  <span>{t("navNextShort")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setQuizFinished(true)}
                  className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  <span>{t("seeFinalResults")}</span>
                </button>
              )}
            </div>
          </div>

          {/* Numbered Navigation Grid (Matches User Screenshot: "NAVIGATION DANS CE CHAPITRE :") */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              <span>{t("questionNavTitle")}</span>
              <span className="text-[11px] font-medium lowercase">
                {answeredCount} / {questions.length} {t("answeredCount")}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-2">
              {questions.map((q, idx) => {
                const ans = answers[idx];
                const isCurrent = idx === currentIndex;
                const isAnswered = ans && ans.isSubmitted;
                const isCorrect = isAnswered && ans.isCorrect;
                const isIncorrect = isAnswered && !ans.isCorrect;

                let btnStyle =
                  "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm";

                if (isCurrent) {
                  btnStyle =
                    "bg-blue-700 text-white dark:bg-amber-500 dark:text-slate-950 font-black ring-2 ring-blue-500 dark:ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 shadow-md scale-105";
                } else if (isCorrect) {
                  btnStyle =
                    "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold";
                } else if (isIncorrect) {
                  btnStyle =
                    "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-11 rounded-xl border text-sm font-semibold flex items-center justify-center transition-all active:scale-95 ${btnStyle}`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Final Score & Celebration Screen */
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700/60 shadow-2xl text-center space-y-6 animate-slide-up">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-500 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {t("congratulations")}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {selectedQuizWeek === "all"
                ? language === "fr"
                  ? "Impressionnant ! Tu as complété le Grand Quiz combiné de toutes les semaines !"
                  : "Impressive! You completed the Combined Grand Quiz across all weeks!"
                : (() => {
                    const c = allCourses.find((course) => course.id === selectedQuizWeek);
                    return language === "fr"
                      ? `Tu as validé les acquis de la Semaine ${c?.weekNumber || 1} (${c?.title.fr}) !`
                      : `You have completed the milestones of Week ${c?.weekNumber || 1} (${c?.title.en})!`;
                  })()}
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 max-w-xs mx-auto shadow-md">
            <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase font-bold tracking-widest">
              {t("quizScore")}
            </span>
            <span className="text-4xl font-black text-blue-700 dark:text-amber-400 font-mono">
              {score} / {questions.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
              ({scorePercentage}% de réussite)
            </span>
          </div>

          {/* Review Grid on Final Screen */}
          <div className="space-y-3 max-w-md mx-auto pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Détail de vos réponses :
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const ans = answers[idx];
                const isCorrect = ans && ans.isSubmitted && ans.isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setQuizFinished(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all ${
                      isCorrect
                        ? "bg-emerald-500 text-white border-emerald-600"
                        : ans && ans.isSubmitted
                        ? "bg-rose-500 text-white border-rose-600"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("quizRestart")}</span>
            </button>

            <Link
              href="/cards"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <Layers className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>{t("navCards")}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
