import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ComplaintForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const departments = [
    t("बांधकाम", "Construction"), t("आरोग्य व स्वच्छता", "Health & Sanitation"),
    t("पाणी पुरवठा", "Water Supply"), t("दिवाबत्ती", "Street Lights"),
    t("अतिक्रमण", "Encroachment"), t("कर विभाग", "Tax Dept."), t("इतर", "Other"),
  ];

  const complaintTypes = [
    t("पाणी", "Water"), t("रस्ते", "Roads"), t("कचरा", "Garbage"),
    t("दिवाबत्ती", "Street Lights"), t("इतर", "Other"),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="complaint" className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">{t("तक्रार नोंदणी", "Register Complaint")}</h2>
        <p className="text-muted-foreground text-center mb-8">{t("आपली तक्रार येथे नोंदवा", "Register your complaint here")}</p>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card p-6 rounded-xl border shadow-sm space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("नाव *", "Name *")}</label>
              <input type="text" required className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("मोबाइल नंबर *", "Mobile Number *")}</label>
              <input type="tel" required className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("तक्रारीचा प्रकार *", "Complaint Type *")}</label>
              <select required className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none">
                <option value="">{t("निवडा...", "Select...")}</option>
                {complaintTypes.map((ct) => <option key={ct}>{ct}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("विभाग *", "Department *")}</label>
              <select required className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none">
                <option value="">{t("निवडा...", "Select...")}</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("तक्रारीचे वर्णन *", "Complaint Description *")}</label>
            <textarea required rows={4} className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("फोटो अपलोड", "Upload Photo")}</label>
            <input type="file" accept="image/*" className="text-sm" />
          </div>
          <button type="submit" className="gov-gradient text-primary-foreground px-8 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            {submitted ? t("✅ तक्रार नोंदवली!", "✅ Complaint Registered!") : t("तक्रार पाठवा", "Submit Complaint")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ComplaintForm;
