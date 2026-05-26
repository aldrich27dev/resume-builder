import React from "react";

export default function ResumePreview({ resumeData }) {
  const targetVisibility = resumeData.visibleSections || {
    objective: true,
    education: true,
    experience: true,
    awards: true,
    skills: true,
    seminars: true,
    references: true,
  };

  return (
    <>
      <style>{`
        @media print {
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            size: auto;
            margin: 12mm 15mm 12mm 15mm;
          }
          .print-area {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important; 
          }
          .avoid-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-mix-multiply {
            mix-blend-multiply: multiply !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="print-area w-full max-w-[216mm] bg-white text-neutral-900 shadow-2xl rounded-sm p-8 sm:p-12 flex flex-col h-auto border border-neutral-200 transition-all">
        
        <div className="space-y-5">
          {/* Document Header Panel */}
          <div className="flex flex-row items-start justify-between border-b-2 border-neutral-900 pb-4 gap-4">
            <div className="space-y-1 flex-1">
              <h2 className="text-2xl font-black tracking-tight text-neutral-900">{resumeData.fullName || "NAME"}</h2>
              <div className="text-xs space-y-0.5 text-neutral-700 font-medium">
                <p>{resumeData.address}</p>
                <p>Phone: {resumeData.phone}</p>
                <p>Email: {resumeData.email}</p>
              </div>
            </div>
            {resumeData.avatar && (
              <div className="w-24 h-24 rounded-none border border-neutral-400 bg-neutral-100 overflow-hidden flex-shrink-0">
                <img src={resumeData.avatar} alt="Formal Headshot Portrait" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Objective Section */}
          {targetVisibility.objective && resumeData.objective && (
            <div className="space-y-1 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">OBJECTIVE</h3>
              <p className="text-xs text-neutral-700 leading-relaxed text-justify">{resumeData.objective}</p>
            </div>
          )}

          {/* Educational Background Section */}
          {targetVisibility.education && resumeData.education && resumeData.education.length > 0 && (
            <div className="space-y-1.5 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">EDUCATIONAL BACKGROUND</h3>
              <div className="space-y-2">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-xs gap-2 avoid-break">
                    <span className="font-bold text-neutral-900">{edu.level}</span>
                    <span className="col-span-2 text-neutral-700 whitespace-pre-line text-left">{edu.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {targetVisibility.experience && resumeData.experience && resumeData.experience.length > 0 && (
            <div className="space-y-1.5 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">WORK EXPERIENCE</h3>
              <div className="space-y-2.5">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-xs gap-2 avoid-break">
                    <span className="font-bold text-neutral-600">{exp.date}</span>
                    <div className="col-span-2 space-y-0.5 text-neutral-800">
                      <p className="font-bold text-neutral-900">{exp.role}, <span className="font-medium italic">{exp.company}</span></p>
                      <p className="text-neutral-600 text-[11px]">{exp.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards and Achievements Section */}
          {targetVisibility.awards && resumeData.awards && resumeData.awards.length > 0 && (
            <div className="space-y-1 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">AWARDS AND ACHIEVEMENTS</h3>
              <ul className="list-disc pl-4 text-xs text-neutral-700 space-y-0.5">
                {resumeData.awards.map((award, idx) => (
                  <li key={idx} className="leading-tight">{award}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Section */}
          {targetVisibility.skills && resumeData.skills && resumeData.skills.length > 0 && (
            <div className="space-y-1 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">SKILLS</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-800 font-bold">
                {resumeData.skills.map((skill, idx) => (
                  <span key={idx} className="after:content-['•'] last:after:content-none after:ml-4">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Seminars and Training Section */}
          {targetVisibility.seminars && resumeData.seminars && resumeData.seminars.length > 0 && (
            <div className="space-y-1 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">SEMINAR/S AND TRAINING ATTENDED</h3>
              <ul className="list-disc pl-4 text-xs text-neutral-700 space-y-0.5">
                {resumeData.seminars.map((seminar, idx) => (
                  <li key={idx} className="leading-tight">{seminar}</li>
                ))}
              </ul>
            </div>
          )}

          {/* References Section */}
          {targetVisibility.references && resumeData.references && resumeData.references.length > 0 && (
            <div className="space-y-1.5 avoid-break">
              <h3 className="text-xs font-black uppercase tracking-wide border-b border-neutral-300 pb-0.5 text-neutral-900">REFERENCES</h3>
              <div className="grid grid-cols-3 gap-4 pt-0.5">
                {resumeData.references.map((ref, idx) => (
                  <div key={idx} className="text-[11px] space-y-0.5 leading-tight">
                    <p className="font-bold text-neutral-900">{ref.name}</p>
                    <p className="text-neutral-600">{ref.role}</p>
                    <p className="text-neutral-700 font-mono text-[10px]">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Certifications & Signature Line Layout */}
        <div className="pt-12 space-y-4 avoid-break mt-auto">
          <p className="text-[10px] text-neutral-600 italic text-justify leading-tight">
            I hereby certify that all the information above is true and correct based on my best knowledge and honesty.
          </p>
          <div className="w-full flex flex-col items-end pr-2">
            <div className="w-44 border-t border-neutral-900 mt-10 pt-1 text-center relative flex flex-col items-center justify-end min-h-[44px]">
              
              {/* Electronic Signature Box Layer */}
              {resumeData.signature && (
                <div className="absolute bottom-5 w-36 h-16 pointer-events-none flex items-center justify-center">
                  <img 
                    src={resumeData.signature} 
                    alt="Applicant Electronic Signature Baseline Overlay" 
                    className="w-full h-full object-contain mix-blend-multiply print-mix-multiply" 
                  />
                </div>
              )}

              <p className="text-xs font-bold uppercase text-neutral-900 tracking-wide">{resumeData.fullName || "APPLICANT NAME"}</p>
              <p className="text-[10px] text-neutral-500 uppercase font-medium">Applicant</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}