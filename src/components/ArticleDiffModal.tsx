import React, { useMemo } from "react";
import { X, ArrowLeft, GitCompare } from "lucide-react";

interface ArticleVersion {
  id: string;
  article_id: string;
  saved_at: string;
  saved_by: string;
  snapshot: Record<string, any>;
}

interface ArticleDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  versionA: ArticleVersion; // newer version (shown on right)
  versionB: ArticleVersion; // older version (shown on left)
}

type DiffLine =
  | { type: "unchanged"; text: string }
  | { type: "removed"; text: string }
  | { type: "added"; text: string };

const computeDiff = (oldText: string, newText: string): DiffLine[] => {
  const oldLines = (oldText || "").split("\n");
  const newLines = (newText || "").split("\n");

  const result: DiffLine[] = [];

  // Simple LCS-based diff
  const m = oldLines.length;
  const n = newLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (oldLines[i] === newLines[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  let i = 0,
    j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && oldLines[i] === newLines[j]) {
      result.push({ type: "unchanged", text: oldLines[i] });
      i++;
      j++;
    } else if (j < n && (i >= m || dp[i][j + 1] >= dp[i + 1][j])) {
      result.push({ type: "added", text: newLines[j] });
      j++;
    } else {
      result.push({ type: "removed", text: oldLines[i] });
      i++;
    }
  }

  return result;
};

const DiffSection: React.FC<{ label: string; older: string; newer: string }> = ({
  label,
  older,
  newer,
}) => {
  const diff = useMemo(() => computeDiff(older, newer), [older, newer]);
  const hasChanges = diff.some((l) => l.type !== "unchanged");

  if (!hasChanges && !older && !newer) return null;

  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase text-light-label mb-2 tracking-wider">{label}</p>
      {!hasChanges ? (
        <div className="rounded-lg bg-secondary/30 px-4 py-3 text-sm text-light-body italic">
          No changes
        </div>
      ) : (
        <div className="border border-border/50 rounded-xl overflow-hidden font-mono text-sm">
          {diff.map((line, idx) => (
            <div
              key={idx}
              className={`px-4 py-0.5 leading-relaxed whitespace-pre-wrap ${
                line.type === "added"
                  ? "bg-green-50 text-green-800"
                  : line.type === "removed"
                  ? "bg-red-50 text-red-800 line-through"
                  : "text-light-body"
              }`}
            >
              <span className="select-none mr-3 opacity-40">
                {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
              </span>
              {line.text || "\u00A0"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ArticleDiffModal: React.FC<ArticleDiffModalProps> = ({
  isOpen,
  onClose,
  versionA,
  versionB,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  // versionA = selected first (could be newer or older based on selection order)
  // We'll show "FROM A → TO B" comparing the two snapshots
  const snapA = versionA.snapshot;
  const snapB = versionB.snapshot;

  // Determine which is older/newer by timestamp
  const aIsOlder = new Date(versionA.saved_at) < new Date(versionB.saved_at);
  const older = aIsOlder ? snapA : snapB;
  const newer = aIsOlder ? snapB : snapA;
  const olderDate = aIsOlder ? versionA.saved_at : versionB.saved_at;
  const newerDate = aIsOlder ? versionB.saved_at : versionA.saved_at;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 font-mono overflow-y-auto">
      <div className="bg-background w-full max-w-3xl min-h-[70vh] max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative my-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-light-body hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to History
            </button>
            <span className="bg-violet-100 text-violet-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <GitCompare className="w-3 h-3" /> DIFF VIEW
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-light-body hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-6 pt-5 pb-3 border-b border-border/30 bg-secondary/10">
          <div className="flex items-center gap-6 flex-wrap text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-200" />
              <span className="text-light-body">Older — {formatDate(olderDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-200" />
              <span className="text-light-body">Newer — {formatDate(newerDate)}</span>
            </div>
          </div>
        </div>

        {/* Diff content */}
        <div className="overflow-y-auto flex-1 p-6">
          <DiffSection label="Category" older={older.category || ""} newer={newer.category || ""} />
          <DiffSection label="Title (Japanese)" older={older.title || ""} newer={newer.title || ""} />
          <DiffSection label="Title (English)" older={older.title_en || ""} newer={newer.title_en || ""} />
          <DiffSection label="Description (Japanese)" older={older.description || ""} newer={newer.description || ""} />
          <DiffSection label="Description (English)" older={older.description_en || ""} newer={newer.description_en || ""} />
          <DiffSection label="Content (Japanese)" older={older.content || ""} newer={newer.content || ""} />
          <DiffSection label="Content (English)" older={older.content_en || ""} newer={newer.content_en || ""} />
          {(older.custom_html || newer.custom_html) && (
            <DiffSection label="Custom HTML (Japanese)" older={older.custom_html || ""} newer={newer.custom_html || ""} />
          )}
          {(older.custom_html_en || newer.custom_html_en) && (
            <DiffSection label="Custom HTML (English)" older={older.custom_html_en || ""} newer={newer.custom_html_en || ""} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDiffModal;
