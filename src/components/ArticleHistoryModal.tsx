import React, { useState, useEffect } from "react";
import { X, Clock, ArrowLeft, GitCompare, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ArticleVersion {
  id: string;
  article_id: string;
  saved_at: string;
  saved_by: string;
  snapshot: Record<string, any>;
}

interface ArticleHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  onCompare: (versionA: ArticleVersion, versionB: ArticleVersion) => void;
  versionTable?: string;
}

const ArticleHistoryModal: React.FC<ArticleHistoryModalProps> = ({
  isOpen,
  onClose,
  articleId,
  onCompare,
  versionTable = "article_versions",
}) => {
  const [versions, setVersions] = useState<ArticleVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen || !articleId) return;
    setLoading(true);
    setSelectedVersions([]);
    const fetchVersions = async () => {
      const { data, error } = await supabase
        .from(versionTable)
        .select("*")
        .eq("article_id", articleId)
        .order("saved_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setVersions(data);
      }
      setLoading(false);
    };
    fetchVersions();
  }, [isOpen, articleId]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedVersions((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const handleCompare = () => {
    if (selectedVersions.length !== 2) return;
    const vA = versions.find((v) => v.id === selectedVersions[0]);
    const vB = versions.find((v) => v.id === selectedVersions[1]);
    if (vA && vB) onCompare(vA, vB);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 font-mono overflow-y-auto">
      <div className="bg-background w-full max-w-2xl min-h-[60vh] max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative my-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-light-body hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Editor
            </button>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> VERSION HISTORY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-light-body hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-24">
              <Clock className="w-12 h-12 text-light-body/20 mx-auto mb-4" />
              <p className="text-light-heading font-semibold mb-2">No versions saved yet</p>
              <p className="text-light-body text-sm">Versions are saved each time you publish an update.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-light-body mb-4">
                Select <strong>2 versions</strong> to compare them side-by-side. ({versions.length} saved)
              </p>
              <div className="space-y-2">
                {versions.map((version, i) => {
                  const isSelected = selectedVersions.includes(version.id);
                  const selIdx = selectedVersions.indexOf(version.id);
                  return (
                    <button
                      key={version.id}
                      onClick={() => toggleSelect(version.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border/50 bg-white hover:border-border hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ${
                            isSelected
                              ? "bg-primary text-white border-primary"
                              : "border-border/50 text-light-body"
                          }`}
                        >
                          {isSelected ? selIdx + 1 : ""}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-light-heading">
                            {version.snapshot?.title || version.snapshot?.title_en || "Untitled"}
                          </p>
                          <p className="text-xs text-light-body mt-0.5">
                            {formatDate(version.saved_at)}
                          </p>
                        </div>
                      </div>
                      {i === 0 && (
                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">
                          Latest
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {selectedVersions.length === 2 && (
          <div className="border-t border-border/50 px-6 py-4 bg-background/80 backdrop-blur">
            <button
              onClick={handleCompare}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <GitCompare className="w-4 h-4" />
              Compare Selected Versions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleHistoryModal;
