'use client'

import React, { useState, useEffect } from 'react'
import { Code2, ExternalLink, Youtube, BookOpen, ChevronRight, Play, Pause, RotateCcw, Timer, Coffee, BrainCircuit, Lightbulb, Eye } from 'lucide-react'

const SolveOne = () => {
  // --- Language State ---
  const [lang, setLang] = useState('en') // 'en' or 'mr'

  // --- Pomodoro State ---
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isWorkMode, setIsWorkMode] = useState(true) // true for work, false for break

  // --- Hint State ---
  const [isHintRevealed, setIsHintRevealed] = useState(false)

  // --- Pomodoro Logic ---
  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Auto-switch modes when time runs out
      setIsActive(false)
      const nextModeIsWork = !isWorkMode
      setIsWorkMode(nextModeIsWork)
      setTimeLeft(nextModeIsWork ? 25 * 60 : 5 * 60)
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, isWorkMode])

  const toggleTimer = () => setIsActive(!isActive)
  
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(isWorkMode ? 25 * 60 : 5 * 60)
  }

  const switchMode = (mode) => {
    setIsActive(false)
    setIsWorkMode(mode === 'work')
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // --- Translations Dictionary ---
  const t = {
    en: {
      brand: "OneProblem",
      tagline: "One coding problem every day. Consistency is the key to mastery.",
      problemTitle: "Today's Challenge: Number of Provinces",
      difficulty: "Medium",
      problemDesc: "You are given an n x n adjacency matrix indicating which cities are directly connected to each other, with interconnected cities forming isolated groups known as provinces. Your objective is to analyze these connections and return the total number of distinct provinces.",
      solveExternally: "Solve on LeetCode",
      resourcesTitle: "Learning Resources",
      videoLink: "Watch Video Explanation",
      articleLink: "Read Solution Article",
      pomoTitle: "Getting distracted?",
      pomoDesc: "Use the Pomodoro timer to stay focused and crush this problem.",
      pomoFocus: "Focus",
      pomoBreak: "Break",
      pomoStart: "Start",
      pomoPause: "Pause",
      hintTitle: "Need a hint?",
      hintText: "Treat the cities as nodes in a graph. Every time you find a city you haven't visited yet, you've discovered a new province; now just find all its neighbors before moving on.",
      showHint: "Reveal Hint"
    },
    mr: {
      brand: "OneProblem",
      tagline: "दररोज एक कोडिंग समस्या. सातत्य ही यशाची गुरुकिल्ली आहे.",
      problemTitle: "आजचे आव्हान: Number of Provinces",
      difficulty: "मध्यम",
      problemDesc: "तुम्हाला n x n चा एक अ‍ॅडजसेन्सी मॅट्रिक्स (adjacency matrix) दिला आहे, जो दर्शवतो की कोणती शहरे एकमेकांशी थेट जोडलेली आहेत. यामध्ये एकमेकांशी (थेट किंवा अप्रत्यक्षपणे) जोडलेल्या शहरांच्या स्वतंत्र गटांना 'प्रांत' (provinces) असे म्हटले जाते.तुमचे उद्दिष्ट या जोडणीचे विश्लेषण करणे आणि एकूण किती स्वतंत्र प्रांत आहेत, त्याची संख्या शोधणे हे आहे.",
      solveExternally: "LeetCode वर सोडवा",
      resourcesTitle: "शिक्षणासाठी साधने",
      videoLink: "व्हिडिओ स्पष्टीकरण पहा",
      articleLink: "उत्तरे आणि लेख वाचा",
      pomoTitle: "लक्ष विचलित होत आहे?",
      pomoDesc: "लक्ष केंद्रित करण्यासाठी पोमोडोरो टायमर वापरा.",
      pomoFocus: "काम",
      pomoBreak: "विश्रांती",
      pomoStart: "सुरू करा",
      pomoPause: "थांबवा",
      hintTitle: "अडकलात? हिंट पहा",
      hintText: "शहरांकडे एका ग्राफमधील नोड्स म्हणून पहा. प्रत्येक वेळी जेव्हा तुम्हाला असे शहर सापडेल ज्याला तुम्ही अद्याप भेट दिली नाही, तेव्हा समजा की तुम्हाला एक नवीन प्रांत (new province) सापडला आहे; आता फक्त पुढे जाण्यापूर्वी त्या शहराच्या सर्व शेजाऱ्यांना शोधून त्यांना व्हिजिटेड म्हणून चिन्हांकित करा.",
      showHint: "हिंट दाखवा"
    }
  }

  // Dummy URLs for the daily problem
  const problemUrl = "https://leetcode.com/problems/number-of-provinces"
  const videoUrl = "https://youtu.be/ACzkVtewUYA?si=9ncQ4NA4H2Rx3ME6" 
  const articleUrl = "https://algo.monster/liteproblems/547"

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div className="min-h-screen bg-[#F8F9FA] text-[#0A0A0A] font-sans selection:bg-black selection:text-white relative overflow-hidden flex flex-col items-center">
        
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-100/40 to-transparent -z-10 pointer-events-none" />

        {/* --- Language Toggle Slider --- */}
        <div className="absolute top-6 left-6 flex items-center bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-gray-200/50 z-20 shadow-sm">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
              lang === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('mr')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
              lang === 'mr' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'
            }`}
          >
            मराठी
          </button>
        </div>

        <main className="w-full max-w-3xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center z-10">
          
          {/* Header Section */}
          <div className="text-center mb-10 w-full animate-in slide-in-from-top-4 duration-700">
            <div className="flex justify-center mb-4">
              <div className="bg-black text-white p-3 rounded-2xl shadow-lg">
                <Code2 size={40} />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black mb-4 drop-shadow-sm">
              {t[lang].brand}
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-md mx-auto leading-relaxed">
              {t[lang].tagline}
            </p>
          </div>

          {/* Problem Card */}
          <div className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-2 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col mb-8">
            
            {/* Problem Description Area */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-black tracking-tight">
                    {t[lang].problemTitle}
                  </h2>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {t[lang].difficulty}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium text-lg">
                {t[lang].problemDesc}
              </p>
            </div>

            {/* External Platform Link Area */}
            <div className="p-6 md:p-8 bg-gray-50 rounded-b-[1.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Code2 size={20} className="text-black" />
                </span>
                Platform: LeetCode
              </div>
              
              <a
                href={problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>{t[lang].solveExternally}</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* TWO-COLUMN GRID: Pomodoro & Hints */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            
            {/* Pomodoro Timer Section */}
            <div className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-black mb-2 flex items-center gap-2 tracking-tight">
                <BrainCircuit size={22} className="text-gray-400" />
                {t[lang].pomoTitle}
              </h3>
              <p className="text-gray-500 font-medium text-sm mb-6">
                {t[lang].pomoDesc}
              </p>

              <div className="bg-gray-50 w-full p-6 rounded-[1.5rem] border border-gray-100 flex flex-col items-center flex-1 justify-center">
                <div className="text-5xl font-extrabold text-black tracking-tight mb-6 tabular-nums">
                  {formatTime(timeLeft)}
                </div>
                
                <div className="flex items-center gap-3 w-full justify-center">
                  <button
                    onClick={toggleTimer}
                    className="flex items-center justify-center flex-1 gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-md"
                  >
                    {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    {isActive ? t[lang].pomoPause : t[lang].pomoStart}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-3 bg-white text-gray-500 border border-gray-200 rounded-full hover:text-black hover:border-black transition-all active:scale-95 shadow-sm shrink-0"
                    aria-label="Reset Timer"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center justify-center gap-2 mt-4 w-full">
                  <button 
                    onClick={() => switchMode('work')}
                    className={`flex items-center justify-center flex-1 gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${isWorkMode ? 'bg-black text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-200'}`}
                  >
                    <Timer size={14} />
                    {t[lang].pomoFocus}
                  </button>
                  <button 
                    onClick={() => switchMode('break')}
                    className={`flex items-center justify-center flex-1 gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${!isWorkMode ? 'bg-black text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-200'}`}
                  >
                    <Coffee size={14} />
                    {t[lang].pomoBreak}
                  </button>
                </div>
              </div>
            </div>

            {/* Hint Section */}
            <div className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black flex items-center gap-2 tracking-tight">
                  <Lightbulb size={20} className="text-gray-400" />
                  {t[lang].hintTitle}
                </h3>
              </div>
              
              {/* Hint Content Area */}
              <div className="relative flex-1 bg-gray-50 border border-gray-100 rounded-[1.5rem] p-6 overflow-hidden flex flex-col justify-center min-h-[180px]">
                
                {/* The blurred text */}
                <p 
                  className={`text-gray-700 font-medium text-base leading-relaxed text-center transition-all duration-500 ${
                    !isHintRevealed ? 'blur-md select-none opacity-40' : 'blur-0 opacity-100'
                  }`}
                >
                  {t[lang].hintText}
                </p>

                {/* Overlay Button */}
                {!isHintRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/30">
                    <button
                      onClick={() => setIsHintRevealed(true)}
                      className="flex items-center gap-2 bg-white border border-gray-200 text-black px-6 py-3 rounded-full font-bold hover:border-black hover:bg-gray-50 transition-all active:scale-95 shadow-md"
                    >
                      <Eye size={18} />
                      {t[lang].showHint}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3 tracking-tight">
                <BookOpen size={24} className="text-gray-400" />
                {t[lang].resourcesTitle}
              </h3>
              
              <div className="flex flex-col gap-4">
                {/* Video Resource */}
                <a 
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 md:p-6 bg-gray-50 border border-gray-100 rounded-[1.5rem] hover:bg-white hover:border-gray-200 hover:shadow-sm hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm group-hover:border-black transition-colors">
                      <Youtube size={22} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-black">
                        {t[lang].videoLink}
                      </h4>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">YouTube</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded-full shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                     <ChevronRight size={18} />
                  </div>
                </a>

                {/* Article Resource */}
                <a 
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 md:p-6 bg-gray-50 border border-gray-100 rounded-[1.5rem] hover:bg-white hover:border-gray-200 hover:shadow-sm hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm group-hover:border-black transition-colors">
                      <BookOpen size={22} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-black">
                        {t[lang].articleLink}
                      </h4>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">Written Guide</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded-full shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                     <ChevronRight size={18} />
                  </div>
                </a>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

export default SolveOne