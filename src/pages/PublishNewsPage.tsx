import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, FileImage, X, FileText, ArrowLeft, Eye, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ArticlePreviewModal from "@/components/ArticlePreviewModal";
import { getCategoryColor } from "./NewsPage"; // Reusing the color generator

const PublishNewsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"ja" | "en">("ja");
  const [showPreview, setShowPreview] = useState(false);
  
  const [draftId, setDraftId] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    const checkUserAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setFirstName(profile.first_name);
          setLastName(profile.last_name);
        } else {
          const emailPrefix = session.user.email?.split("@")[0] || "Admin";
          setFirstName(emailPrefix);
          setLastName("");
        }
        
        // Fetch existing categories
        const { data: articles } = await supabase.from("articles").select("category");
        if (articles) {
           const cats = new Set<string>();
           articles.forEach(a => {
             if (a.category) {
               a.category.split(",").forEach((c: string) => cats.add(c.trim()));
             }
           });
           setAvailableCategories(Array.from(cats).sort());
        }

        setLoading(false);
      }
    };
    checkUserAndProfile();
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((title || titleEn || description || content || mediaFile) && !submitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [title, titleEn, description, content, mediaFile, submitting]);

  // Auto-save debounce effect
  useEffect(() => {
    if (!title && !titleEn) return; // Only start auto-saving once there's at least a title
    const delayDebounceFn = setTimeout(() => {
      if (!submitting) {
        performSave(false);
      }
    }, 2500);
    return () => clearTimeout(delayDebounceFn);
  }, [title, description, content, selectedCategories, titleEn, descriptionEn, contentEn, mediaFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMediaFile(e.target.files[0]);
      setUploadedImageUrl(null); // Reset uploaded URL when new file is chosen
    }
  };

  const clearFile = () => {
    setMediaFile(null);
    setUploadedImageUrl(null);
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (trimmed && !selectedCategories.includes(trimmed)) {
       setSelectedCategories([...selectedCategories, trimmed]);
       
       if (!availableCategories.includes(trimmed)) {
          setAvailableCategories([...availableCategories, trimmed].sort());
       }
    }
    setNewCategoryInput("");
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const removeCategory = (cat: string) => {
     setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };


  const performSave = async (isExplicitPublish: boolean) => {
    if (!user) return false;

    if (isExplicitPublish && !title && !titleEn) {
      toast.error(activeTab === "ja" ? "タイトルを入力してください。" : "Please provide at least a title to publish.");
      return false;
    }

    if (isExplicitPublish) setSubmitting(true);
    else setIsAutoSaving(true);

    let mediaUrl = uploadedImageUrl;

    try {
      if (mediaFile && !uploadedImageUrl) {
        const fileExt = mediaFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-media")
          .upload(filePath, mediaFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("article-media")
          .getPublicUrl(filePath);

        mediaUrl = urlData.publicUrl;
        setUploadedImageUrl(mediaUrl);
      }

      const payload = {
        category: selectedCategories.join(", "),
        title,
        description,
        content,
        title_en: titleEn,
        description_en: descriptionEn,
        content_en: contentEn,
        image_url: mediaUrl,
        author_first_name: firstName,
        author_last_name: lastName,
        author_id: user.id,
        is_draft: !isExplicitPublish,
      };

      if (draftId) {
        const { error: updateError } = await supabase
          .from("articles")
          .update(payload)
          .eq("id", draftId);
        if (updateError) throw updateError;
      } else {
        const { data, error: insertError } = await supabase
          .from("articles")
          .insert([payload])
          .select("id")
          .single();
        if (insertError) throw insertError;
        if (data) setDraftId(data.id);
      }

      setLastSavedAt(new Date());

      if (isExplicitPublish) {
        toast.success(activeTab === "ja" ? "記事を公開しました！" : "Article published successfully!");
        navigate("/news");
      }
      return true;
    } catch (error: any) {
      if (isExplicitPublish) toast.error(error.message || "Failed to save article.");
      return false;
    } finally {
      if (isExplicitPublish) setSubmitting(false);
      else setIsAutoSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSave(true);
  };

  const getPreviewArticle = () => {
    let previewUrl = mediaFile ? URL.createObjectURL(mediaFile) : "";
    if (!mediaFile && uploadedImageUrl) previewUrl = uploadedImageUrl;

    return {
      title: activeTab === "ja" ? title : (titleEn || title),
      description: activeTab === "ja" ? description : (descriptionEn || description),
      content: activeTab === "ja" ? content : (contentEn || content),
      category: selectedCategories.join(", "),
      image_url: previewUrl,
      author_first_name: firstName,
      author_last_name: lastName,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Localized Labels Mapping
  const labels = {
    ja: {
      back: "リストに戻る",
      pubHeaderLabel: "ニュースを作成",
      pubHeaderTitle: "記事を公開する",
      pubHeaderDesc: "アップデート、ニュース、インサイトを共有しましょう。",
      saving: "保存中...",
      savedAt: "保存完了",
      previewBtn: "プレビュー",
      publishBtn: "公開する",
      categoryHead: "カテゴリ（複数選択可）",
      categoryPlaceholder: "新しいカテゴリを入力...",
      addBtn: "追加",
      suggestedCats: "既存のカテゴリから選択:",
      titleLabel: "タイトル (必須)",
      titlePlaceholder: "記事のタイトル",
      descLabel: "概要 / 簡単な説明 (必須)",
      descPlaceholder: "概要や短い説明...",
      contentLabel: "本文 (必須)",
      contentPlaceholder: "記事の本文をここに書きます...",
      mediaLabel: "ヘッダーメディア（画像・動画）",
      dragDrop: "ファイルをドロップするか",
      clickBrowse: "クリックして選択",
      mediaDesc: "JPEG、PNG、または50MB以下の動画"
    },
    en: {
      back: "Back to List",
      pubHeaderLabel: "Write News",
      pubHeaderTitle: "Publish Article",
      pubHeaderDesc: "Share updates, product news, and thought leadership.",
      saving: "Saving...",
      savedAt: "Draft saved at",
      previewBtn: "Preview",
      publishBtn: "Publish",
      categoryHead: "Categories (Select multiple)",
      categoryPlaceholder: "Type new category...",
      addBtn: "Add",
      suggestedCats: "Suggested:",
      titleLabel: "Headline / Title (Optional)",
      titlePlaceholder: "Article Title",
      descLabel: "Description / Summary (Optional)",
      descPlaceholder: "Short description or summary...",
      contentLabel: "Full Story / Content (Optional)",
      contentPlaceholder: "Write the full story here...",
      mediaLabel: "Header Media (Image/Video)",
      dragDrop: "Drop a file here or",
      clickBrowse: "click to browse",
      mediaDesc: "Images (JPG, PNG) or Videos up to 50MB"
    }
  };

  const l = labels[activeTab];


  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />

      <section data-nav-theme="light" className="bg-secondary pt-32 pb-24 px-6 md:px-12 flex-grow relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <button
              onClick={() => navigate("/edit")}
              className="flex items-center gap-2 text-light-body hover:text-primary mb-8 text-sm font-medium transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {l.back}
            </button>

            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
              <div>
                <span className="label text-light-label mb-3 block">
                  {l.pubHeaderLabel}
                </span>
                <h1 className="heading-1 text-light-heading mb-4">
                  {l.pubHeaderTitle}
                </h1>
                <div className="flex items-center gap-3">
                  <p className="body text-light-body max-w-lg">
                    {l.pubHeaderDesc}
                  </p>
                  {isAutoSaving && (
                    <span className="flex items-center gap-1 text-xs text-light-body/60 bg-white/50 px-2 py-1 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin" /> {l.saving}
                    </span>
                  )}
                  {lastSavedAt && !isAutoSaving && (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 whitespace-nowrap">
                      <CheckCircle2 className="w-3 h-3" /> 
                      {l.savedAt} {lastSavedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="btn-outline border-border/50 hover:bg-secondary py-3 px-6 h-auto whitespace-nowrap"
                >
                  <Eye size={18} /> {l.previewBtn}
                </button>
                <button
                  type="submit"
                  form="publish-form"
                  disabled={submitting || (!title && !titleEn)}
                  className="btn-primary py-3 px-6 h-auto disabled:opacity-50 whitespace-nowrap"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText size={18} />} {l.publishBtn}
                </button>
              </div>
            </div>

            <form id="publish-form" onSubmit={handleSubmit} className="space-y-10 bg-white rounded-2xl p-8 sm:p-12 relative shadow-sm">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-light-heading ml-1">{l.categoryHead}</label>
                
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategories.map(cat => (
                      <span key={cat} className={`flex items-center gap-1 text-xs font-bold border rounded-full px-3 py-1.5 uppercase ${getCategoryColor(cat)}`}>
                        {cat}
                        <button type="button" onClick={() => removeCategory(cat)} className="hover:bg-black/10 rounded-full p-0.5 ml-1 transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={l.categoryPlaceholder}
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                    className="flex-grow bg-secondary/30 rounded-xl px-4 py-3 text-light-heading focus:outline-none focus:bg-secondary/60 transition-colors font-medium border border-transparent focus:border-border/30 placeholder-light-body/40"
                  />
                  <button type="button" onClick={handleAddCategory} className="btn-outline px-4 py-3 h-auto"><Plus size={18}/></button>
                </div>

                {availableCategories.length > 0 && (
                   <div className="mt-3">
                     <p className="text-xs text-light-body mb-2 ml-1">{l.suggestedCats}</p>
                     <div className="flex flex-wrap gap-2">
                       {availableCategories.map(cat => {
                         const isSelected = selectedCategories.includes(cat);
                         return (
                           <button
                             key={cat}
                             type="button"
                             onClick={() => toggleCategory(cat)}
                             className={`text-xs font-bold border rounded-full px-3 py-1.5 uppercase transition-all ${
                               isSelected ? `${getCategoryColor(cat)} ring-2 ring-primary/20` : "bg-transparent text-light-body hover:bg-secondary"
                             }`}
                           >
                             {cat}
                           </button>
                         )
                       })}
                     </div>
                   </div>
                )}
              </div>

              <div className="border border-border/50 rounded-xl overflow-hidden p-1">
                <div className="flex gap-2 p-1 bg-secondary/20 rounded-lg mb-4 mx-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ja")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "ja" ? "bg-white text-primary shadow-sm" : "text-light-body hover:text-light-heading hover:bg-white/50"}`}
                  >
                    Japanese (日本語)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("en")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "en" ? "bg-white text-primary shadow-sm" : "text-light-body hover:text-light-heading hover:bg-white/50"}`}
                  >
                    English (Optional)
                  </button>
                </div>

                <div className="px-5 pb-5 space-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-light-heading ml-1">
                      {l.titleLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={l.titlePlaceholder}
                      required={activeTab === "ja"}
                      value={activeTab === "ja" ? title : titleEn}
                      onChange={(e) => activeTab === "ja" ? setTitle(e.target.value) : setTitleEn(e.target.value)}
                      className="w-full bg-secondary/30 rounded-xl px-5 py-4 text-light-heading focus:outline-none focus:bg-secondary/60 transition-colors font-medium text-lg placeholder-light-body/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-light-heading ml-1">
                      {l.descLabel}
                    </label>
                    <textarea
                      placeholder={l.descPlaceholder}
                      required={activeTab === "ja"}
                      value={activeTab === "ja" ? description : descriptionEn}
                      onChange={(e) => activeTab === "ja" ? setDescription(e.target.value) : setDescriptionEn(e.target.value)}
                      rows={3}
                      className="w-full bg-secondary/30 rounded-xl px-5 py-4 text-light-heading focus:outline-none focus:bg-secondary/60 transition-colors font-medium resize-none placeholder-light-body/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-light-heading ml-1">
                      {l.contentLabel}
                    </label>
                    <textarea
                      placeholder={l.contentPlaceholder}
                      required={activeTab === "ja"}
                      value={activeTab === "ja" ? content : contentEn}
                      onChange={(e) => activeTab === "ja" ? setContent(e.target.value) : setContentEn(e.target.value)}
                      rows={12}
                      className="w-full bg-secondary/30 rounded-xl px-5 py-4 text-light-heading focus:outline-none focus:bg-secondary/60 transition-colors font-medium resize-y leading-relaxed placeholder-light-body/40"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-light-heading ml-1">{l.mediaLabel}</label>
                <div className="border-2 border-dashed border-border/80 rounded-xl p-10 flex flex-col items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors relative overflow-hidden min-h-[240px]">
                  {mediaFile ? (
                    <div className="flex flex-col items-center w-full z-10">
                      {mediaFile.type.startsWith("video/") ? (
                        <video src={URL.createObjectURL(mediaFile)} className="max-h-56 object-contain rounded-lg mb-4 shadow-sm" controls />
                      ) : (
                        <img src={URL.createObjectURL(mediaFile)} alt="Preview" className="max-h-56 object-contain rounded-lg mb-4 shadow-sm" />
                       )}
                      <p className="font-medium text-sm text-light-body bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50 truncate max-w-xs">{mediaFile.name}</p>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="absolute top-4 right-4 p-2 bg-white/90 border border-border/50 text-red-500 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FileImage className="w-12 h-12 text-light-label mb-4" />
                      <p className="font-medium text-light-heading text-center mb-1">
                        {l.dragDrop} <span className="text-primary hover:underline cursor-pointer">{l.clickBrowse}</span>
                      </p>
                      <p className="text-xs text-light-body text-center">{l.mediaDesc}</p>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      
      <ArticlePreviewModal 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)} 
        article={getPreviewArticle()} 
      />
    </div>
  );
};

export default PublishNewsPage;
