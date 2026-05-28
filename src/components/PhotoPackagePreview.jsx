import React from "react";
import { Image } from "lucide-react";

export default function PhotoPackagePreview({ resumeData, quantities }) {
  // Use the live state passed down from App.jsx, fallback gracefully to initial defaults if omitted
  const activeQuantities = quantities || {
    twoByTwo: 4,
    oneByOne: 4,
    threeByThree: 1, // Added fallback default for the new configuration
    passport: 2
  };

  // Explicit metric dimensions mapped out specifically for physical printing cuts
  const sizeConfig = {
    oneByOne: { label: "1x1 ID", width: "25.4mm", height: "25.4mm" },
    twoByTwo: { label: "2x2 ID", width: "50.8mm", height: "50.8mm" },
    threeByThree: { label: "3x3 ID", width: "76.2mm", height: "76.2mm" }, // Added explicit metric conversion for 3x3 inches
    passport: { label: "Passport", width: "35mm", height: "45mm" },
  };

  // Generate an array containing separate individual items based on active quantity configurations
  const renderList = [];
  Object.keys(sizeConfig).forEach((sizeKey) => {
    const count = activeQuantities[sizeKey] || 0;
    for (let i = 0; i < count; i++) {
      renderList.push({
        id: `${sizeKey}-${i}`,
        sizeKey,
        ...sizeConfig[sizeKey]
      });
    }
  });

  if (!resumeData.avatar) {
    return (
      <div className="w-full max-w-[216mm] bg-neutral-950 text-neutral-500 rounded-xl p-8 border border-neutral-800 flex flex-col items-center justify-center gap-3 text-center min-h-[300px]">
        <Image className="w-10 h-10 text-neutral-700 animate-pulse" />
        <p className="text-sm">No portrait photo uploaded yet.</p>
        <p className="text-xs text-neutral-600">Please upload a picture in the personal details form to generate your print package grid.</p>
      </div>
    );
  }

  if (renderList.length === 0) {
    return (
      <div className="w-full max-w-[216mm] bg-neutral-950 text-neutral-500 rounded-xl p-8 border border-neutral-800 flex flex-col items-center justify-center gap-2 text-center min-h-[300px]">
        <p className="text-sm font-medium text-neutral-400">Your Photo Print Package is Empty</p>
        <p className="text-xs text-neutral-600">Increase quantities in the form controls to populate your layout grid sheet.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          /* Cleaned up destructive global visibility wipes to let the resume render on page 1 */
          .photo-print-sheet {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            page-break-before: always; /* Force the photo sheet onto its own clean page when printing */
            break-before: page;
          }
          .photo-cut-outline {
            border: 1px dashed #b5b5b5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="w-full max-w-[216mm] space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-neutral-400 font-medium">
            Photo Print Layout Preview ({renderList.length} total pcs)
          </span>
          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700 uppercase tracking-wider">
            Fits 4 × 6 / Letter Photo Paper
          </span>
        </div>

        <div className="photo-print-sheet w-full bg-white text-neutral-900 shadow-2xl rounded-sm p-6 sm:p-8 border border-neutral-200 transition-all">
          {/* Flex wrapping container with exact gap alignments to support flawless mechanical trimming options */}
          <div className="flex flex-wrap items-end justify-start gap-4">
            {renderList.map((photo) => (
              <div
                key={photo.id}
                className="photo-cut-outline relative border border-dashed border-neutral-300 bg-neutral-50 flex-shrink-0 group overflow-hidden transition-all select-none"
                style={{ width: photo.width, height: photo.height }}
              >
                <img 
                  src={resumeData.avatar} 
                  alt={photo.label} 
                  className="w-full h-full object-cover pointer-events-none" 
                />
                
                {/* Discrete overlay label for layout clarity on digital display */}
                <span className="absolute bottom-1 right-1 text-[8px] font-bold bg-white/80 backdrop-blur-[1px] text-neutral-700 px-1 py-0.5 rounded border border-neutral-200 pointer-events-none uppercase tracking-wide print:hidden">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}