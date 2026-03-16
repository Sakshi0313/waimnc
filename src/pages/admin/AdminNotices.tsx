import { useEffect, useState } from "react";
import { ExternalLink, LoaderCircle, Megaphone, Paperclip, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  createNotice,
  deleteNotice,
  formatNoticeDate,
  subscribeToAllNotices,
  toggleNoticeStatus,
  type NoticeRecord,
} from "@/lib/notices";

const AdminNotices = () => {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTitleEn, setNewTitleEn] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newContentEn, setNewContentEn] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTagEn, setNewTagEn] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }

    const unsubscribe = subscribeToAllNotices(setNotices);
    return () => unsubscribe();
  }, []);

  const addNotice = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      return;
    }

    try {
      setIsSaving(true);
      await createNotice({
        title: newTitle,
        titleEn: newTitleEn,
        content: newContent,
        contentEn: newContentEn,
        tag: newTag,
        tagEn: newTagEn,
        externalUrl,
        file: selectedFile,
      });

      setNewTitle("");
      setNewTitleEn("");
      setNewContent("");
      setNewContentEn("");
      setNewTag("");
      setNewTagEn("");
      setExternalUrl("");
      setSelectedFile(null);

      toast({
        title: t("यशस्वी", "Success"),
        description: t("सूचना Firestore मध्ये जतन केली गेली.", "Notice saved to Firestore."),
      });
    } catch (error) {
      toast({
        title: t("त्रुटी", "Error"),
        description: error instanceof Error ? error.message : t("सूचना जतन करता आली नाही.", "Unable to save notice."),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (notice: NoticeRecord) => {
    try {
      await toggleNoticeStatus(notice.id, notice.status === "active" ? "inactive" : "active");
    } catch (error) {
      toast({
        title: t("त्रुटी", "Error"),
        description: error instanceof Error ? error.message : t("स्थिती अद्यतनित करता आली नाही.", "Unable to update status."),
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (notice: NoticeRecord) => {
    try {
      await deleteNotice(notice);
      toast({
        title: t("यशस्वी", "Success"),
        description: t("सूचना हटवली गेली.", "Notice deleted."),
      });
    } catch (error) {
      toast({
        title: t("त्रुटी", "Error"),
        description: error instanceof Error ? error.message : t("सूचना हटवता आली नाही.", "Unable to delete notice."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("सूचना व्यवस्थापन", "Notice Management")}</h1>

      {!isFirebaseConfigured && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 text-sm text-muted-foreground">
            {t(
              "Firebase अजून configure केलेले नाही. `.env` मध्ये `VITE_FIREBASE_*` values जोडा. Service account JSON browser app मध्ये वापरू नका.",
              "Firebase is not configured yet. Add `VITE_FIREBASE_*` values in `.env`. Do not use service-account JSON in browser apps."
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("नवीन सूचना जोडा", "Add New Notice")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="सूचनेचे शीर्षक (मराठी)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} maxLength={200} />
          <Input placeholder="Notice title (English)" value={newTitleEn} onChange={(e) => setNewTitleEn(e.target.value)} maxLength={200} />
          <Textarea placeholder="सूचनेचा मजकूर (मराठी)" value={newContent} onChange={(e) => setNewContent(e.target.value)} maxLength={1000} />
          <Textarea placeholder="Notice content (English)" value={newContentEn} onChange={(e) => setNewContentEn(e.target.value)} maxLength={1000} />
          <div className="grid md:grid-cols-2 gap-3">
            <Input placeholder="टॅग" value={newTag} onChange={(e) => setNewTag(e.target.value)} maxLength={50} />
            <Input placeholder="Tag (English)" value={newTagEn} onChange={(e) => setNewTagEn(e.target.value)} maxLength={50} />
          </div>
          <Input placeholder="External link (optional)" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} maxLength={500} />
          <Input type="file" accept="application/pdf,image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} />
          <Button onClick={addNotice} className="gov-gradient text-primary-foreground" disabled={!isFirebaseConfigured || isSaving}>
            {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />} {t("सूचना जोडा", "Add Notice")}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notices.map((notice) => (
          <Card key={notice.id} className={notice.status === "active" ? "" : "opacity-60"}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{lang === "mr" ? notice.title : notice.titleEn || notice.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${notice.status === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                    {notice.status === "active" ? t("सक्रिय", "Active") : t("निष्क्रिय", "Inactive")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{lang === "mr" ? notice.content : notice.contentEn || notice.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatNoticeDate(notice.createdAt, lang)}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    {lang === "mr" ? notice.tag : notice.tagEn || notice.tag}
                  </span>
                  {notice.attachmentUrl && (
                    <a href={notice.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Paperclip className="h-3 w-3" />
                      {notice.attachmentName || t("संलग्नक", "Attachment")}
                    </a>
                  )}
                  {notice.externalUrl && (
                    <a href={notice.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <ExternalLink className="h-3 w-3" />
                      {t("लिंक उघडा", "Open link")}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" onClick={() => handleToggleStatus(notice)} disabled={!isFirebaseConfigured}>
                  {notice.status === "active" ? t("बंद करा", "Disable") : t("सक्रिय करा", "Activate")}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(notice)} disabled={!isFirebaseConfigured}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {isFirebaseConfigured && notices.length === 0 && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              {t("अजून कोणतीही सूचना जतन केलेली नाही.", "No notices have been saved yet.")}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminNotices;
