import React from "react";
import { X, ArrowLeft } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    description: string;
    content: string;
    image_url: string;
    author_first_name: string;
    author_last_name: string;
    category?: string;
    content_type?: string;
    custom_html?: string;
  };
}

const ArticlePreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const isCustomHtml = article.content_type === "custom_html";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 font-mono overflow-y-auto">
      <div className="bg-background w-full max-w-4xl min-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative my-auto">

        {/* Header / Actions */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-light-body hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Editor
            </button>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">PREVIEW MODE</span>
            {isCustomHtml && (
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">CUSTOM HTML</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-light-body hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto w-full p-6 sm:p-12">
          <article className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="mb-12 relative">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="body text-light-body">{formatDate(new Date())}</span>
                {article.category && (
                  <span className="text-[10px] text-light-label border border-border rounded-full px-2 py-0.5 whitespace-nowrap uppercase">
                    {article.category}
                  </span>
                )}
              </div>

              <h1 className="heading-display text-light-heading mb-8">
                {article.title || "Untitled Article"}
              </h1>

              {article.description && (
                <p className="body-large text-light-body mb-8 border-l-2 border-primary pl-4">
                  {article.description}
                </p>
              )}

              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center heading-4 text-light-heading">
                  {article.author_first_name?.charAt(0) || "U"}
                </div>
                <div className="body text-light-body">
                  <div className="text-light-heading">{article.author_first_name} {article.author_last_name}</div>
                  <div className="text-sm">Writer</div>
                </div>
              </div>
            </div>

            {/* Image (standard mode only) */}
            {!isCustomHtml && article.image_url && (
              <div className="w-full mb-12 rounded-xl overflow-hidden bg-secondary">
                {article.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={article.image_url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={article.image_url} alt="Preview Hero" className="w-full h-full object-cover" />
                )}
              </div>
            )}

            {/* Content */}
            {isCustomHtml ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: article.custom_html || "<p><em>HTML content will appear here...</em></p>" }}
              />
            ) : (
              <div className="body-large text-light-body">
                {article.content ? (
                  article.content.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-8 whitespace-pre-wrap leading-relaxed">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-light-body/50 italic">Article content will appear here...</p>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreviewModal;
