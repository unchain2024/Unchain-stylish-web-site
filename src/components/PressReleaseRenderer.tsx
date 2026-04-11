import React from "react";

export interface PressReleaseSection {
  heading: string;
  body: string;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface PressReleaseData {
  pressDate: string;
  title: string;
  subtitle: string;
  leadParagraph: string;
  sections: PressReleaseSection[];
  overviewText: string;
  companiesInfo: string;

  // Deprecated fields from previous layouts
  addressee?: string;
  senders?: string;
  overviewTitle?: string;
  inquiriesText?: string;
}

export const EMPTY_PRESS_RELEASE: PressReleaseData = {
  pressDate: "",
  title: "",
  subtitle: "",
  leadParagraph: "",
  sections: [{ heading: "", body: "", imageUrls: [] }],
  overviewText: "",
  companiesInfo: "",
};

export const parsePressRelease = (raw: string): PressReleaseData | null => {
  try {
    const parsed = JSON.parse(raw);
    return parsed as PressReleaseData;
  } catch {
    return null;
  }
};

interface PressReleaseRendererProps {
  data: PressReleaseData;
  className?: string;
}

const renderImages = (images: string[]) => {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} className="w-full h-auto object-cover mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />;
  }
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3 mb-10">
        {images.map((img, i) => <img key={i} src={img} className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />)}
      </div>
    );
  }
  if (images.length === 3) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-10">
        {images.map((img, i) => <img key={i} src={img} className="w-full h-auto aspect-[4/5] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />)}
      </div>
    );
  }
  if (images.length === 4) {
    return (
      <div className="flex flex-col gap-3 mb-10">
         <img src={images[0]} className="w-full h-auto object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
         <div className="grid grid-cols-2 gap-3">
            <img src={images[1]} className="w-full h-auto aspect-square object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
            <img src={images[2]} className="w-full h-auto aspect-square object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
         </div>
         <img src={images[3]} className="w-full h-auto object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
      </div>
    );
  }
  if (images.length === 5) {
     return (
      <div className="flex flex-col gap-3 mb-10">
         <img src={images[0]} className="w-full h-auto object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
         <img src={images[1]} className="w-full h-auto object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
         <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <img src={images[2]} className="w-full h-full aspect-[4/5] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
            <img src={images[3]} className="w-full h-full aspect-[4/5] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
            <img src={images[4]} className="w-full h-full aspect-[4/5] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />
         </div>
      </div>
     );
  }
  // Default fallback for >5 images
  return (
    <div className="flex flex-col gap-3 mb-10">
      {images.map((img, i) => <img key={i} src={img} className="w-full h-auto object-cover shadow-[0_4px_12px_rgba(0,0,0,0.05)]" alt="" />)}
    </div>
  );
};

const PressReleaseRenderer: React.FC<PressReleaseRendererProps> = ({ data, className = "" }) => {
  return (
    <div className={`font-sans text-light-heading max-w-3xl mx-auto ${className}`}>


      {/* ── Main title + subtitle ── */}
      <div className="mb-8">
        {data.subtitle && (
          <p className="text-base sm:text-lg text-light-body font-medium">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* ── Body sections ── */}
      {data.sections && data.sections.map((section, idx) => {
        const images = section.imageUrls?.length ? section.imageUrls : (section.imageUrl ? [section.imageUrl] : []);
        return (
          <div key={idx} className="mb-14">
            {/* If it's the first section, the image usually comes before the lead paragraph in this layout */}
            {idx === 0 && images.length > 0 && renderImages(images)}

            {section.heading && (
              <h2 className="text-xs sm:text-sm font-bold text-light-heading mb-6 tracking-[0.2em] uppercase">
                {section.heading}
              </h2>
            )}

            {/* Images for sections other than the first (or if they are placed here) */}
            {idx !== 0 && images.length > 0 && renderImages(images)}

            {section.body && (
              <p className="text-[13px] sm:text-[15px] leading-[2] text-light-heading/80 whitespace-pre-wrap font-medium">
                {section.body}
              </p>
            )}
          </div>
        );
      })}

      {/* ── Additional textual info ── */}
      {data.overviewText && (
        <div className="mt-16 text-[13px] sm:text-[14px] leading-[2] text-light-heading/80 whitespace-pre-wrap border-t border-border/60 pt-10">
           {data.overviewText}
        </div>
      )}

    </div>
  );
};

export default PressReleaseRenderer;
