import React, { useState, useMemo } from "react";
import { Sparkles, Printer } from "lucide-react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

// Baseline snapshot definition used to compare and block unchanged prints
const INITIAL_BASELINE_DATA = {
  fullName: "JOHN DOE",
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
  const [resumeData, setResumeData] = useState({ ...INITIAL_BASELINE_DATA });

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

  // Intercepts the window printing subsystem to match user dynamic naming patterns
  const handlePrint = () => {
    if (!canPrint) return;

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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
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
            onClick={handlePrint}
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

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
    </div>
  );
}