import { Phone, Mail, Bell, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveNotices, type NoticeRecord } from "@/lib/notices";

const TopHeader = () => {
  const [dark, setDark] = useState(false);
  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsub = subscribeToActiveNotices(setNotices);
    return () => unsub();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNoticeClick = (notice: NoticeRecord) => {
    setOpen(false);
    if (notice.attachmentBase64) {
      window.open(notice.attachmentBase64, "_blank", "noopener,noreferrer");
    } else if (notice.externalUrl) {
      window.open(notice.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      document.getElementById("notices")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeNotices = notices.length > 0
    ? notices.map((n) => `📢 ${lang === "mr" ? n.title : (n.titleEn || n.title)}`).join("  |  ")
    : t(
        "📢 वाई नगर परिषदेत आपले स्वागत आहे",
        "📢 Welcome to Wai Municipal Council"
      );

  return (
    <div className="gov-gradient text-primary-foreground text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-1.5 px-4 gap-2">
        {/* Contact */}
        <div className="flex items-center gap-4 flex-wrap">
          <a href="tel:18001234567" className="flex items-center gap-1 hover:underline">
            <Phone className="w-3.5 h-3.5" />
            <span>{t("हेल्पलाइन: 1800-123-4567", "Helpline: 1800-123-4567")}</span>
          </a>
          <a href="mailto:info@wainagarpalika.gov.in" className="flex items-center gap-1 hover:underline">
            <Mail className="w-3.5 h-3.5" />
            <span>info@wainagarpalika.gov.in</span>
          </a>
        </div>

        {/* Marquee */}
        <div className="flex items-center gap-3 overflow-hidden flex-1 mx-4">
          <Bell className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <span className="marquee inline-block">{marqueeNotices}</span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Notification bell with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative p-1 rounded hover:bg-primary-foreground/20"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notices.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notices.length > 9 ? "9+" : notices.length}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 top-7 z-50 w-80 bg-card text-foreground rounded-xl shadow-xl border overflow-hidden">
                <div className="gov-gradient text-primary-foreground px-4 py-2.5 text-sm font-semibold">
                  {t("सूचना / जाहिराती", "Notices / Announcements")}
                </div>
                <ul className="max-h-72 overflow-y-auto divide-y divide-border">
                  {notices.length === 0 && (
                    <li className="px-4 py-3 text-sm text-muted-foreground">
                      {t("कोणतीही सूचना नाही.", "No notices available.")}
                    </li>
                  )}
                  {notices.map((notice) => {
                    const title = lang === "mr" ? notice.title : (notice.titleEn || notice.title);
                    const hasLink = notice.attachmentBase64 || notice.externalUrl;
                    return (
                      <li key={notice.id}>
                        <button
                          onClick={() => handleNoticeClick(notice)}
                          className="w-full text-left px-4 py-3 hover:bg-muted/60 transition-colors flex items-start gap-2"
                        >
                          <span className="mt-0.5 flex-shrink-0 text-base">
                            {notice.attachmentType === "pdf" ? "📄" : notice.attachmentType === "image" ? "🖼️" : "📢"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2">{title}</p>
                            {hasLink && (
                              <p className="text-xs text-primary mt-0.5">
                                {notice.attachmentType === "pdf"
                                  ? t("PDF उघडा", "Open PDF")
                                  : notice.externalUrl
                                  ? t("लिंक उघडा", "Open Link")
                                  : t("पहा", "View")}
                              </p>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Language toggle */}
          <div className="flex gap-1 text-xs">
            <button onClick={() => setLang("mr")} className={`px-2 py-0.5 rounded ${lang === "mr" ? "bg-primary-foreground text-primary" : "hover:underline"}`}>
              मराठी
            </button>
            <button onClick={() => setLang("en")} className={`px-2 py-0.5 rounded ${lang === "en" ? "bg-primary-foreground text-primary" : "hover:underline"}`}>
              English
            </button>
          </div>

          {/* Dark mode */}
          <button onClick={toggleDark} className="p-1 rounded hover:bg-primary-foreground/20">
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
