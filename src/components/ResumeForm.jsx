import React from "react";
import { User, Plus, Trash2, Briefcase, GraduationCap, Award, Code, BookOpen, Users, Eye, EyeOff } from "lucide-react";

export default function ResumeForm({ resumeData, setResumeData, isDirty, isFormValid }) {
  // Initialize visibility state if not present in parent state
  const visibleSections = resumeData.visibleSections || {
    objective: true,
    education: true,
    experience: true,
    awards: true,
    skills: true,
    seminars: true,
    references: true,
  };

  const toggleSectionVisibility = (section) => {
    setResumeData((prev) => ({
      ...prev,
      visibleSections: {
        ...visibleSections,
        [section]: !visibleSections[section],
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (category, index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev[category]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [category]: updated };
    });
  };

  const handleArrayItemChange = (category, index, value) => {
    setResumeData((prev) => {
      const updated = [...prev[category]];
      updated[index] = value;
      return { ...prev, [category]: updated };
    });
  };

  const addItem = (category, template) => {
    setResumeData((prev) => ({
      ...prev,
      [category]: [...prev[category], template]
    }));
  };

  const removeItem = (category, index) => {
    setResumeData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setResumeData((prev) => ({ 
        ...prev, 
        avatar: imageUrl,
        rawFile: file 
      }));
    }
  };

  // Field validation helpers to mark raw placeholders as invalid styling anchors
  const isInvalidName = !resumeData.fullName?.trim() || resumeData.fullName === "JOHN DOE";
  const isInvalidAddress = !resumeData.address?.trim() || resumeData.address.includes("123 Example St.");
  const isInvalidPhone = !resumeData.phone?.trim() || resumeData.phone === "+63 900 000 0000";
  const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.email || "") || resumeData.email === "johndoe@example.com";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-xl">
      
      {/* 1. Header & Image Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-lg font-bold flex items-center gap-2 text-neutral-100">
            <User className="w-5 h-5 text-indigo-400" />
            Personal Details <span className="text-xs text-red-400 font-normal">* Strict Validation</span>
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800/60">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#ebedf0] flex-shrink-0 ring-2 ring-neutral-800">
            {resumeData.avatar ? (
              <img src={resumeData.avatar} alt="Portrait" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-end justify-center bg-[#ebedf0]">
                <svg 
                  className="w-full h-5/6 text-[#1877f2] fill-current" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="xMidYMax meet"
                >
                  <circle cx="50" cy="38" r="18" fill="#bcbece" />
                  <path d="M50 62 c-18 0 -32 10 -35 24 c5 10 18 14 35 14 s30 -4 35 -14 c-3 -14 -17 -24 -35 -24 z" fill="#bcbece" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="space-y-2 w-full text-center sm:text-left flex-1">
            <p className="text-xs text-neutral-400">Upload your raw selfie or landscape portrait photo to show directly on your resume layout.</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <label className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition">
                Choose Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input 
              type="text" 
              name="fullName" 
              required
              value={resumeData.fullName} 
              onChange={handleChange} 
              className={`w-full bg-neutral-950 border rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-indigo-500 transition-all ${
                isInvalidName ? "border-red-500/50 bg-red-950/10 focus:border-red-500" : "border-neutral-800"
              }`} 
            />
            {isInvalidName && <p className="text-[10px] text-red-400 mt-1">Please change the default name placeholder.</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Address Location <span className="text-red-400">*</span>
            </label>
            <input 
              type="text" 
              name="address" 
              required
              value={resumeData.address} 
              onChange={handleChange} 
              className={`w-full bg-neutral-950 border rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-indigo-500 transition-all ${
                isInvalidAddress ? "border-red-500/50 bg-red-950/10 focus:border-red-500" : "border-neutral-800"
              }`} 
            />
            {isInvalidAddress && <p className="text-[10px] text-red-400 mt-1">Please provide your real residential location address.</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                name="phone" 
                required
                value={resumeData.phone} 
                onChange={handleChange} 
                className={`w-full bg-neutral-950 border rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-indigo-500 transition-all ${
                  isInvalidPhone ? "border-red-500/50 bg-red-950/10 focus:border-red-500" : "border-neutral-800"
                }`} 
              />
              {isInvalidPhone && <p className="text-[10px] text-red-400 mt-1">Provide a genuine contact string pattern.</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input 
                type="email" 
                name="email" 
                required
                value={resumeData.email} 
                onChange={handleChange} 
                className={`w-full bg-neutral-950 border rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-indigo-500 transition-all ${
                  isInvalidEmail ? "border-red-500/50 bg-red-950/10 focus:border-red-500" : "border-neutral-800"
                }`} 
              />
              {isInvalidEmail && <p className="text-[10px] text-red-400 mt-1">Enter a valid and updated email address.</p>}
            </div>
          </div>

          {/* Electronic Signature Upload Sub-Section */}
          <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-950/40 space-y-3">
            <label className="block text-xs font-semibold text-neutral-400">Electronic Signature</label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-32 h-12 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden relative p-1">
                {resumeData.signature ? (
                  <img src={resumeData.signature} alt="E-Signature Preview" className="w-full h-full object-contain filter invert dark:invert-0" />
                ) : (
                  <span className="text-[10px] text-neutral-600 italic">No Signature</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <label className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium px-3 py-1.5 rounded-lg cursor-pointer transition">
                  Upload Signature
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setResumeData(prev => ({ ...prev, signature: URL.createObjectURL(file) }));
                      }
                    }} 
                  />
                </label>
                
                {resumeData.signature && (
                  <button 
                    type="button"
                    onClick={() => setResumeData(prev => ({ ...prev, signature: "" }))}
                    className="text-xs bg-neutral-950 hover:bg-neutral-900 text-red-400 font-medium px-3 py-1.5 rounded-lg border border-neutral-800/80 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="text-[10px] text-neutral-500">Upload a clear cropped photo or transparent PNG of your written signature.</p>
          </div>
          
          <div className="border border-neutral-800 rounded-xl p-3 bg-neutral-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-400">Professional Objective</label>
              <button type="button" onClick={() => toggleSectionVisibility("objective")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.objective ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
                {visibleSections.objective ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {visibleSections.objective ? "Visible" : "Hidden"}
              </button>
            </div>
            {visibleSections.objective && (
              <textarea name="objective" rows={3} value={resumeData.objective} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-indigo-500 resize-none text-justify" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Educational Background Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            Educational History
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("education")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.education ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.education ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.education ? "Visible" : "Hidden"}
            </button>
            {visibleSections.education && (
              <button type="button" onClick={() => addItem("education", { level: "", detail: "" })} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.education && resumeData.education.map((edu, idx) => (
          <div key={idx} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 space-y-2 relative group">
            <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block">Level Tier {idx + 1}</span>
            {resumeData.education.length > 1 && (
              <button type="button" onClick={() => removeItem("education", idx)} className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 transition p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <input type="text" value={edu.level} onChange={(e) => handleNestedChange("education", idx, "level", e.target.value)} className="w-11/12 bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-indigo-500" placeholder="e.g. Senior Highschool" />
            <textarea rows={2} value={edu.detail} onChange={(e) => handleNestedChange("education", idx, "detail", e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200 resize-none focus:outline-none focus:border-indigo-500" placeholder="School Name, Campus, Year, Strand / Course" />
          </div>
        ))}
      </div>

      {/* 3. Work Experience Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <Briefcase className="w-4 h-4" />
            Work History Record
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("experience")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.experience ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.experience ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.experience ? "Visible" : "Hidden"}
            </button>
            {visibleSections.experience && (
              <button type="button" onClick={() => addItem("experience", { date: "", role: "", company: "", location: "" })} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.experience && resumeData.experience.map((exp, idx) => (
          <div key={idx} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 space-y-2 relative group">
            <button type="button" onClick={() => removeItem("experience", idx)} className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 transition p-1">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <input type="text" value={exp.date} onChange={(e) => handleNestedChange("experience", idx, "date", e.target.value)} className="w-5/6 bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2 py-1 text-neutral-200" placeholder="Duration (e.g. Dec 2024 - June 2025)" />
            <input type="text" value={exp.role} onChange={(e) => handleNestedChange("experience", idx, "role", e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2 py-1 text-neutral-200" placeholder="Job Title / Role Assignment" />
            <input type="text" value={exp.company} onChange={(e) => handleNestedChange("experience", idx, "company", e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2 py-1 text-neutral-200" placeholder="Company Name" />
            <input type="text" value={exp.location} onChange={(e) => handleNestedChange("experience", idx, "location", e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2 py-1 text-neutral-200" placeholder="Full Location Details" />
          </div>
        ))}
      </div>

      {/* 4. Awards Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <Award className="w-4 h-4" />
            Honors & Achievements
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("awards")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.awards ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.awards ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.awards ? "Visible" : "Hidden"}
            </button>
            {visibleSections.awards && (
              <button type="button" onClick={() => addItem("awards", "")} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.awards && resumeData.awards.map((award, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input type="text" value={award} onChange={(e) => handleArrayItemChange("awards", idx, e.target.value)} className="flex-1 bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-neutral-200 focus:outline-none focus:border-indigo-500" placeholder="Certificate description details" />
            <button type="button" onClick={() => removeItem("awards", idx)} className="text-neutral-500 hover:text-red-400 p-1 transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 5. Core Skills Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <Code className="w-4 h-4" />
            Professional Skills
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("skills")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.skills ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.skills ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.skills ? "Visible" : "Hidden"}
            </button>
            {visibleSections.skills && (
              <button type="button" onClick={() => addItem("skills", "")} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.skills && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resumeData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input type="text" value={skill} onChange={(e) => handleArrayItemChange("skills", idx, e.target.value)} className="flex-1 bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-2.5 py-1.5 text-neutral-200" placeholder="Skill name" />
                <button type="button" onClick={() => removeItem("skills", idx)} className="text-neutral-500 hover:text-red-400 p-1 transition">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Seminars and Trainings Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <BookOpen className="w-4 h-4" />
            Seminars & Trainings
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("seminars")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.seminars ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.seminars ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.seminars ? "Visible" : "Hidden"}
            </button>
            {visibleSections.seminars && (
              <button type="button" onClick={() => addItem("seminars", "")} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.seminars && resumeData.seminars.map((seminar, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <textarea rows={2} value={seminar} onChange={(e) => handleArrayItemChange("seminars", idx, e.target.value)} className="flex-1 bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-1.5 text-neutral-200 resize-none" placeholder="Seminar info details, date, venue" />
            <button type="button" onClick={() => removeItem("seminars", idx)} className="text-neutral-500 hover:text-red-400 p-1 transition flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 7. Character References Section */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide text-indigo-400">
            <Users className="w-4 h-4" />
            Character References
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => toggleSectionVisibility("references")} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition font-medium ${visibleSections.references ? "text-indigo-400 bg-indigo-500/10" : "text-neutral-500 bg-neutral-800"}`}>
              {visibleSections.references ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {visibleSections.references ? "Visible" : "Hidden"}
            </button>
            {visibleSections.references && (
              <button type="button" onClick={() => addItem("references", { name: "", role: "", contact: "" })} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-indigo-300 p-1 rounded-md transition flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
        {visibleSections.references && (
          <div className="grid grid-cols-1 gap-3">
            {resumeData.references.map((ref, idx) => (
              <div key={idx} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
                <button type="button" onClick={() => removeItem("references", idx)} className="absolute top-1.5 right-1.5 text-neutral-500 hover:text-red-400 transition p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <input type="text" value={ref.name} onChange={(e) => handleNestedChange("references", idx, "name", e.target.value)} className="bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200" placeholder="Full Name" />
                <input type="text" value={ref.role} onChange={(e) => handleNestedChange("references", idx, "role", e.target.value)} className="bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200" placeholder="Title/Affiliation" />
                <input type="text" value={ref.contact} onChange={(e) => handleNestedChange("references", idx, "contact", e.target.value)} className="bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200 sm:col-span-1 col-span-2" placeholder="Contact number" />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}