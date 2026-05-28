import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Printer, AlertCircle, X, Code, RefreshCw, Sliders } from "lucide-react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import PhotoPackagePreview from "./components/PhotoPackagePreview";

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
  signature: "",
  showPhotoOnResume: true // Added toggle controller flag into core schema
};

export default function App() {
  // Initialize state from localStorage if available, fallback to INITIAL_BASELINE_DATA
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resume_builder_draft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure standard object merges match up smoothly for existing local storage caches
        return { ...INITIAL_BASELINE_DATA, ...parsed };
      } catch (error) {
        console.error("Error parsing saved resume data:", error);
        return { ...INITIAL_BASELINE_DATA };
      }
    }
    return { ...INITIAL_BASELINE_DATA };
  });

  // Dynamic Photo Quantities State Control
  const [photoQuantities, setPhotoQuantities] = useState({
    twoByTwo: 4,
    oneByOne: 4,
    passport: 2
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
    document.title = `${formattedName}_Application_Package`;

    // Initialize OS interface layer dialog context box 
    window.print();

    // Revert global document variables seamlessly to clean environment state
    document.title = originalTitle;
  };

  // Clear data and reset back to initial default values with safety validation prompt
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form? All unsaved progress will be cleared.")) {
      setResumeData({ ...INITIAL_BASELINE_DATA });
      setPhotoQuantities({ twoByTwo: 4, oneByOne: 4, passport: 2 });
    }
  };

  const handleQuantityChange = (size, val) => {
    const count = Math.max(0, parseInt(val) || 0);
    setPhotoQuantities(prev => ({ ...prev, [size]: count }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans relative antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* FORCE PRINT DISPLAY VISIBILITY OVERRIDES */}
      <style>{`
        @media print {
          /* Force hide ALL structural layout blocks except our explicitly declared printable area */
          html, body, #root, .min-h-screen {
            background: #ffffff !important;
            color: #000000 !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          /* Enforce both targets stay fully rendered block structures */
          .printable-target-resume, 
          .printable-target-photos {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .print-package-container {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 15mm !important;
          }
          
          .page-break-before {
            page-break-before: always !important;
            break-before: page !important;
          }
        }
      `}</style>

      {/* Dynamic Navigation Header Banner */}
      <header className="no-print border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50 px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-xl shadow-md shadow-indigo-500/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent sm:text-xl">
            Resume Builder
          </h1>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden lg:inline text-xs font-medium text-neutral-400 max-w-xs text-right truncate">
            {!isDirty 
              ? "⚠️ Modify template information to activate features." 
              : !isFormValid 
                ? "❌ Clear placeholder entries or fix validation rules." 
                : "✅ System verification ready."}
          </span>

          {isDirty && (
            <button
              onClick={handleReset}
              className="flex items-center justify-center p-2 rounded-xl text-neutral-400 hover:text-rose-400 bg-neutral-900 border border-neutral-800 hover:border-rose-900/50 hover:bg-rose-950/20 transition-all active:scale-95 cursor-pointer"
              title="Reset configuration template"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handlePrintRequest}
            disabled={!canPrint}
            className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-xl transition-all text-sm select-none shadow-sm ${
              canPrint
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95 cursor-pointer opacity-100 transform"
                : "bg-neutral-900 text-neutral-600 border border-neutral-800 opacity-50 cursor-not-allowed"
            }`}
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / Save PDF</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Canvas Splitter Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-24">
        
        {/* Left Control Column: Form Fields & Photo Package Controller */}
        <div className="no-print lg:col-span-5 w-full order-2 lg:order-1 flex flex-col gap-6">
          
          {/* Dynamic Photo Package Layout Controller Block */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Sliders className="w-4 h-4" />
              <h2 className="text-sm font-bold tracking-tight text-neutral-200">Photo Package Customization</h2>
            </div>

            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              <div className="space-y-1.5">
    <label className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider">1x1 Size</label>
    <input 
      type="number" 
      min="0"
      max="20"
      value={photoQuantities.oneByOne} 
      onChange={(e) => handleQuantityChange("oneByOne", e.target.value)}
      className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-2 text-sm text-center font-semibold text-neutral-100 outline-none transition-all"
    />
  </div>
  
  <div className="space-y-1.5">
    <label className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider">2x2 Size</label>
    <input 
      type="number" 
      min="0"
      max="20"
      value={photoQuantities.twoByTwo} 
      onChange={(e) => handleQuantityChange("twoByTwo", e.target.value)}
      className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-2 text-sm text-center font-semibold text-neutral-100 outline-none transition-all"
    />
  </div>

  <div className="space-y-1.5">
    <label className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider">3x3 Size</label>
    <input 
      type="number" 
      min="0"
      max="20"
      value={photoQuantities.threeByThree || 1} 
      onChange={(e) => handleQuantityChange("threeByThree", e.target.value)}
      className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-2 text-sm text-center font-semibold text-neutral-100 outline-none transition-all"
    />
  </div>

  <div className="space-y-1.5">
    <label className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Passport</label>
    <input 
      type="number" 
      min="0"
      max="20"
      value={photoQuantities.passport} 
      onChange={(e) => handleQuantityChange("passport", e.target.value)}
      className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-2 text-sm text-center font-semibold text-neutral-100 outline-none transition-all"
    />
  </div>
</div>
          </div>

          {/* Main Content Fields */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-0.5 backdrop-blur-sm">
            <ResumeForm 
              resumeData={resumeData} 
              setResumeData={setResumeData} 
              isDirty={isDirty}
              isFormValid={isFormValid}
            />
          </div>
        </div>

        {/* Right Preview Column: Compilation Previews */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6 items-center order-1 lg:order-2">
          <div className="no-print w-full lg:hidden bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-center text-neutral-400 font-medium">
            {!isDirty 
              ? "⚠️ Modify template fields below to start compilation." 
              : !isFormValid 
                ? "❌ Complete placeholders below to enable export routines." 
                : "✅ Document profile valid. Ready to print."}
          </div>
          
          {/* Unified Printable Output Sheet System */}
          <div className="print-package-container w-full flex flex-col items-center gap-8 sticky top-20 transition-all">
            
            {/* Core Resume Element */}
            <div className="printable-target-resume w-full flex justify-center">
              <ResumePreview resumeData={resumeData} />
            </div>
            
            {/* Dynamic Photo Matrix Container with hard injected break flag */}
            <div className="printable-target-photos w-full flex justify-center page-break-before">
              <PhotoPackagePreview 
                resumeData={resumeData} 
                quantities={photoQuantities} 
              />
            </div>

          </div>
        </div>

      </main>

      {/* Floating Interactive Creator Badge Anchor */}
      <footer className="no-print fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowCreditModal(true)}
          className="flex items-center gap-2 text-xs font-semibold bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-indigo-400 px-3.5 py-2.5 rounded-xl border border-neutral-800/80 backdrop-blur-md transition-all shadow-xl active:scale-95 cursor-pointer group"
        >
          <Code className="w-3.5 h-3.5 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
          <span>Built by <strong className="text-neutral-200 group-hover:text-indigo-300 font-bold transition-colors">Aldrich Naag</strong></span>
        </button>
      </footer>

      {/* Confirmation Print Tip Prompt Modal */}
      {showModal && (
        <div className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => setShowModal(false)}
          />
          
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl z-10 transition-all transform scale-100 duration-300 animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-900 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5">
              <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 flex-shrink-0 border border-indigo-500/10">
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
            <div className="mt-4 bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold bg-indigo-950/40 px-1.5 py-0.5 rounded-md border border-indigo-900/30">1</span>
                <p className="text-neutral-300 pt-0.5">Set <b>Margins</b> option setting explicitly to <b>Default</b> or <b>None</b>.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold bg-indigo-950/40 px-1.5 py-0.5 rounded-md border border-indigo-900/30">2</span>
                <p className="text-neutral-300 pt-0.5">Uncheck/Disable <b>Headers and Footers</b> option metrics.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-mono font-bold bg-indigo-950/40 px-1.5 py-0.5 rounded-md border border-indigo-900/30">3</span>
                <p className="text-neutral-300 pt-0.5">Check/Enable <b>Background Graphics</b> to display photo layouts cleanly.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executePrint}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-95 cursor-pointer"
              >
                Proceed to Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Credits Modal */}
      {showCreditModal && (
        <div className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => setShowCreditModal(false)}
          />
          
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-sm rounded-2xl p-6 relative shadow-2xl z-10 transition-all text-center animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowCreditModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-900 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3 border border-indigo-400/20 animate-pulse">
              <Code className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-base font-bold text-neutral-100 tracking-tight">
              aldrich27dev
            </h3>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
              Crafted with passion and precision
            </p>

            <hr className="border-neutral-900 my-4" />

            <p className="text-xs text-neutral-400 leading-relaxed text-center px-1">
              This application was designed and engineered by <strong className="text-indigo-400 font-semibold">Aldrich Naag</strong> utilizing a modern stack comprising <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Lucide Icons</strong>.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-left">
              <div className="bg-neutral-900/60 border border-neutral-800/60 rounded-xl p-2.5">
                <span className="text-neutral-500 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Architecture</span>
                <span className="text-neutral-200 font-semibold">React + Vite</span>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800/60 rounded-xl p-2.5">
                <span className="text-neutral-500 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Styling Engine</span>
                <span className="text-neutral-200 font-semibold">Tailwind CSS</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowCreditModal(false)}
                className="w-full py-2 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all active:scale-95 cursor-pointer"
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