import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Printer, AlertCircle, X, Code } from "lucide-react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";


// Baseline snapshot definition used to compare and block unchanged prints
const INITIAL_BASELINE_DATA = {
  fullName: "JOHN DOE",
  fontFamily: "'Times New Roman', Times, serif",
  address: "123 Example St., Brgy. Sample, Manila City",
  phone: "+63 900 000 0000",
  email: "johndoe@example.com",
  objective: "Highly motivated and results-driven professional seeking an entry-level position to utilize my skills, contribute to team success, and foster a productive work environment.",
  education: [
    { level: "Senior Highschool", detail: "Example University - Main Campus (2022-2024)\nAccountancy, Business, and Management" },
    { level: "Junior Highschool", detail: "Sample High School (2013-2022)" },
    { level: "Elementary", detail: "Generic Elementary School (2009-2013)" }
  ],
  experience: [
    {
      date: "Month Year - Month Year",
      role: "Role / Position",
      company: "Company Name / Establishments",
      location: "Street Name, City, Metro Manila"
    },
    {
      date: "Month Year - Month Year",
      role: "Role / Position",
      company: "Company Name / Establishments",
      location: "Street Name, City, Metro Manila"
    }
  ],
  awards: [
    "Certificate of ___________, __________,___________",
    "Certificate of ___________, __________,___________",
    "Certificate of  ___________, __________,___________",
  ],
  skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  seminars: [
    "Seminar Title - Month Year",
    "Workshop Title - Month Year",
    "Training Title - Month Year"
  ],
  references: [
    { name: "Reference Name 1", role: "Academic Instructor / Adviser", contact: "+63 900 000 0000" },
    { name: "Reference Name 2", role: "Industry Supervisor", contact: "+63 900 000 0000" },
    { name: "Reference Name 3", role: "Professional Mentor", contact: "+63 900 000 0000" }
  ],
  avatar: "",
  signature: ""
};



export default function App() {
  // Initialize state from localStorage if available, fallback to INITIAL_BASELINE_DATA
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resume_builder_draft");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing saved resume data:", error);
        return { ...INITIAL_BASELINE_DATA };
      }
    }
    return { ...INITIAL_BASELINE_DATA };
  });

  const [showModal, setShowModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);

  // Automatically save state updates to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem("resume_builder_draft", JSON.stringify(resumeData));
  }, [resumeData]);

  // 1. Strict State Dirtiness Guard: Compares present configuration state with original data properties
  const isDirty = useMemo(() => {
    return JSON.stringify(resumeData) !== JSON.stringify(INITIAL_BASELINE_DATA);
  }, [resumeData]);

  // 2. Strict Input Content Verification: Validates required tracking fields are structurally populated
  const isFormValid = useMemo(() => {
    const hasValidName = !!resumeData.fullName?.trim() && resumeData.fullName !== "JOHN DOE";
    const hasValidAddress = !!resumeData.address?.trim() && !resumeData.address.includes("Example St.");
    const hasValidPhone = !!resumeData.phone?.trim() && resumeData.phone !== "+63 900 000 0000";
    
    // Strict pattern verify checklist rule logic for standard format criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(resumeData.email || "") && resumeData.email !== "johndoe@example.com";

    return hasValidName && hasValidAddress && hasValidPhone && hasValidEmail;
  }, [resumeData]);

  // Combined operational switch flag rule block configuration
  const canPrint = isDirty && isFormValid;

  // Triggers the instruction modal gate instead of instantly spawning print spooler
  const handlePrintRequest = () => {
    if (!canPrint) return;
    setShowModal(true);
  };

  // Final validation checkpoint running inner browser print sequence with dynamic naming
  const executePrint = () => {
    setShowModal(false);

    // Cache the original active browser tab document string metadata
    const originalTitle = document.title;

    // Normalize full name into character-safe snake case parameters 
    const formattedName = resumeData.fullName.trim().replace(/\s+/g, "_");

    // Force browser print spool engine to map layout with custom target titles
    document.title = `${formattedName}_Resume`;

    // Initialize OS interface layer dialog context box 
    window.print();

    // Revert global document variables seamlessly to clean environment state
    document.title = originalTitle;
  };

  // Clear data and reset back to initial default values with safety validation prompt
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form? All unsaved progress will be cleared.")) {
      setResumeData({ ...INITIAL_BASELINE_DATA });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans relative">
      <header className="no-print border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50 px-4 py-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Resume Builder
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Status Tooltip Message Tracker Context Row */}
          <span className="hidden md:inline text-xs text-neutral-400 font-medium">
            {!isDirty 
              ? "⚠️ Modify template information to activate save features." 
              : !isFormValid 
                ? "❌ Clear placeholder entries or fix validation rules." 
                : "✅ System verification ready."}
          </span>

          <button
            onClick={handlePrintRequest}
            disabled={!canPrint}
            className={`flex items-center gap-2 font-medium px-4 py-2 rounded-xl transition-all text-sm select-none ${
              canPrint
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer opacity-100"
                : "bg-neutral-800 text-neutral-500 border border-neutral-700 opacity-40 cursor-not-allowed"
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
        <div className="no-print lg:col-span-5 w-full">
          {/* Added validation flags as custom props down to let forms render custom error frames */}
          <ResumeForm 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            isDirty={isDirty}
            isFormValid={isFormValid}
          />
        </div>

        <div className="lg:col-span-7 w-full flex justify-center">
          <ResumePreview resumeData={resumeData} />
        </div>
      </main>

      {/* Floating Interactive Creator Badge Anchor */}
      <footer className="no-print fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowCreditModal(true)}
          className="flex items-center gap-2 text-xs font-semibold bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-indigo-400 px-3.5 py-2 rounded-xl border border-neutral-800/80 backdrop-blur-md transition-all shadow-xl active:scale-95 cursor-pointer"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Built by <strong className="text-neutral-200 hover:text-indigo-400 font-bold transition">Aldrich Naag</strong></span>
        </button>
      </footer>

      {/* Confirmation Print Tip Prompt Modal */}
      {showModal && (
        <div className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)}
          />
          
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl z-10 transition-all transform scale-100">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5">
              <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-neutral-100 tracking-tight">
                  Confirm Document Generation
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  To ensure your formatting renders flawlessly on paper or as an exported asset, please adjust the following options in your system print pop-up:
                </p>
              </div>
            </div>

            {/* Print Instruction Checklist Panel */}
            <div className="mt-4 bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold">1.</span>
                <p className="text-neutral-300">Set <b>Margins</b> option setting explicitly to <b>Default</b> or <b>None</b>.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold">2.</span>
                <p className="text-neutral-300">Uncheck/Disable <b>Headers and Footers</b> option metrics.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold">3.</span>
                <p className="text-neutral-300">Check/Enable <b>Background Graphics</b> to display highshot avatar assets correctly.</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-xl transition active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executePrint}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/10 transition active:scale-95 cursor-pointer"
              >
                Proceed to Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Credits Bento-Style Profile Modal */}
      {showCreditModal && (
        <div className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowCreditModal(false)}
          />
          
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-sm rounded-2xl p-6 relative shadow-2xl z-10 transition-all text-center">
            <button 
              onClick={() => setShowCreditModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-lg font-bold text-neutral-100 tracking-tight">
              aldrich27dev
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Crafted with passion and precision
            </p>

            <hr className="border-neutral-900 my-4" />

            <p className="text-xs text-neutral-300 leading-relaxed text-center px-2">
              This application was designed and engineered by <strong className="text-indigo-400 font-semibold">Aldrich Naag</strong> utilizing a modern stack comprising <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Lucide Icons</strong>.
            </p>

            {/* Tech Stack Bento Grid Items */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-left">
              <div className="bg-neutral-900 border border-neutral-800/60 rounded-xl p-2.5">
                <span className="text-neutral-500 block mb-0.5">Architecture</span>
                <span className="text-neutral-200 font-semibold">React + Vite</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800/60 rounded-xl p-2.5">
                <span className="text-neutral-500 block mb-0.5">Styling Engine</span>
                <span className="text-neutral-200 font-semibold">Tailwind CSS</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowCreditModal(false)}
                className="w-full py-2 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition active:scale-95 cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}