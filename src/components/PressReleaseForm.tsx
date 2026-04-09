import React, { useRef, useState } from "react";
import { Plus, X, Upload, Loader2, Image as ImageIcon, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { PressReleaseData, PressReleaseSection } from "./PressReleaseRenderer";

interface PressReleaseFormProps {
  data: PressReleaseData;
  onChange: (data: PressReleaseData) => void;
  articleId: string;
  formLang?: "ja" | "en";
}

const inputCls = "w-full bg-secondary/30 rounded-xl px-4 py-3 text-light-heading focus:outline-none focus:bg-secondary/60 transition-colors font-medium placeholder-light-body/40 border border-transparent focus:border-border/30";
const textareaCls = `${inputCls} resize-y leading-relaxed`;
const labelCls = "block text-sm font-semibold text-light-heading mb-1.5";
const sectionLabelCls = "block text-xs font-bold text-light-label uppercase tracking-wider mb-1";

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ data, onChange, articleId, formLang = "ja" }) => {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const set = <K extends keyof PressReleaseData>(key: K, value: PressReleaseData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateSection = (idx: number, partial: Partial<PressReleaseSection>) => {
    const sections = data.sections.map((s, i) => (i === idx ? { ...s, ...partial } : s));
    onChange({ ...data, sections });
  };

  const addSection = () => {
    onChange({ ...data, sections: [...data.sections, { heading: "", body: "", imageUrl: "" }] });
  };

  const removeSection = (idx: number) => {
    if (data.sections.length <= 1) return;
    onChange({ ...data, sections: data.sections.filter((_, i) => i !== idx) });
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const sections = [...data.sections];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sections.length) return;
    [sections[idx], sections[swapIdx]] = [sections[swapIdx], sections[idx]];
    onChange({ ...data, sections });
  };

  const handleSectionImagesUpload = async (idx: number, files: File[]) => {
    if (!articleId || files.length === 0) return;
    setUploadingIdx(idx);
    try {
      const currentSection = data.sections[idx];
      const existingUrls = currentSection.imageUrls || (currentSection.imageUrl ? [currentSection.imageUrl] : []);
      const newUrls = [...existingUrls];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const filePath = `${articleId}/${fileName}`;
        const { error } = await supabase.storage.from("article-media").upload(filePath, file);
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("article-media").getPublicUrl(filePath);
        newUrls.push(urlData.publicUrl);
      }
      updateSection(idx, { imageUrls: newUrls, imageUrl: newUrls.length > 0 ? newUrls[0] : "" });
    } catch {
      toast.error("Failed to upload section images.");
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="space-y-8">


      {/* ── Subtitle ── */}
      <div className="space-y-3">
        <div>
          <label className={labelCls}>
            {formLang === "ja" ? "サブタイトル" : "Subtitle"} <span className="text-light-body font-normal text-xs ml-1">(Subtitle)</span>
          </label>
          <input
            type="text"
            placeholder={formLang === "ja" ? "例: Web3時代の新しい価値を創造する..." : "e.g. Creating new value in the Web3 era..."}
            value={data.subtitle}
            onChange={e => set("subtitle", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* ── Body sections ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className={`${labelCls} mb-0`}>
            {formLang === "ja" ? "本文セクション" : "Body Sections"} <span className="text-light-body font-normal text-xs ml-1">({formLang === "ja" ? "複数追加可" : "Add multiple"})</span>
          </label>
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> {formLang === "ja" ? "セクション追加" : "Add Section"}
          </button>
        </div>

        {data.sections.map((section, idx) => (
          <div key={idx} className="border border-border/50 rounded-xl p-5 bg-white/50 space-y-4 relative">
            {/* Section controls */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-light-label uppercase tracking-wider">
                Section {idx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => moveSection(idx, -1)} className="p-1 hover:bg-secondary rounded-lg transition-colors text-light-body hover:text-foreground disabled:opacity-30" disabled={idx === 0}>
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => moveSection(idx, 1)} className="p-1 hover:bg-secondary rounded-lg transition-colors text-light-body hover:text-foreground disabled:opacity-30" disabled={idx === data.sections.length - 1}>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {data.sections.length > 1 && (
                  <button type="button" onClick={() => removeSection(idx)} className="p-1 hover:bg-red-50 rounded-lg transition-colors text-light-body hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className={sectionLabelCls}>{formLang === "ja" ? "見出し" : "Heading"}</label>
              <input
                type="text"
                placeholder={formLang === "ja" ? "セクションの見出し..." : "Section Heading..."}
                value={section.heading}
                onChange={e => updateSection(idx, { heading: e.target.value })}
                className={inputCls}
              />
            </div>

            {/* Section images */}
            <div>
              <label className={sectionLabelCls}>{formLang === "ja" ? "画像" : "Images"} <span className="font-normal text-light-body lowercase ml-1">({formLang === "ja" ? "任意・複数可" : "optional, supports multiple"})</span></label>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {((section.imageUrls || (section.imageUrl ? [section.imageUrl] : []))).map((img, imgIdx) => (
                  <div key={imgIdx} className="relative flex-shrink-0">
                    <img src={img} alt="" className="w-24 h-16 object-cover rounded-lg border border-border/50" />
                    <button
                      type="button"
                      onClick={() => {
                        const existingUrls = section.imageUrls || (section.imageUrl ? [section.imageUrl] : []);
                        const newUrls = existingUrls.filter((_, i) => i !== imgIdx);
                        updateSection(idx, { imageUrls: newUrls, imageUrl: newUrls.length > 0 ? newUrls[0] : "" });
                      }}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow-sm z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {uploadingIdx === idx && (
                  <div className="w-24 h-16 rounded-lg border-2 border-dashed border-border/60 flex items-center justify-center bg-secondary/20">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                )}
                
                <label className="flex flex-col items-center justify-center w-24 h-16 rounded-lg border-2 border-dashed border-border/60 text-light-body hover:bg-secondary/40 transition-colors cursor-pointer gap-1">
                  <Plus className="w-4 h-4" />
                  <span className="text-[10px] font-medium">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={el => { fileRefs.current[idx] = el; }}
                    onChange={e => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        handleSectionImagesUpload(idx, files);
                      }
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className={sectionLabelCls}>{formLang === "ja" ? "本文" : "Body Text"}</label>
              <textarea
                placeholder={formLang === "ja" ? "セクションの本文..." : "Section body text..."}
                value={section.body}
                onChange={e => updateSection(idx, { body: e.target.value })}
                rows={5}
                className={textareaCls}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Overview Text ── */}
      <div>
        <label className={labelCls}>
          {formLang === "ja" ? "概要・背景" : "Overview & Background"} <span className="text-light-body font-normal text-xs ml-1">(Optional overview at the bottom)</span>
        </label>
        <textarea
          placeholder={formLang === "ja" ? "プロジェクトの背景や概要..." : "Background or overview of the project..."}
          value={data.overviewText}
          onChange={e => set("overviewText", e.target.value)}
          rows={6}
          className={textareaCls}
        />
      </div>

      {/* ── Note / Disclaimer ── */}
      <div>
        <label className={labelCls}>
          {formLang === "ja" ? "会社・組織情報" : "Company / Organization Info"} <span className="text-light-body font-normal text-xs ml-1">(Format: Name, Location, Website etc.)</span>
        </label>
        <textarea
          placeholder={formLang === "ja" ? "【株式会社UNCHAIN】\n所在地: ...\n代表者: ...\nURL: ..." : "[UNCHAIN Inc.]\nLocation: ...\nURL: ..."}
          value={data.companiesInfo}
          onChange={e => set("companiesInfo", e.target.value)}
          rows={5}
          className={textareaCls}
        />
      </div>
    </div>
  );
};

export default PressReleaseForm;
