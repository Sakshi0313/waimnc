import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const tenders = [
  { id: "T-2026-001", title: "वाई शहर मुख्य रस्ता दुरुस्ती", titleEn: "Wai City Main Road Repair", dept: "बांधकाम", deptEn: "Construction", amount: "₹ 45,00,000", startDate: "01 मार्च 2026", startDateEn: "01 March 2026", endDate: "31 मार्च 2026", endDateEn: "31 March 2026", status: "चालू", statusEn: "Active" },
  { id: "T-2026-002", title: "LED पथदिवे खरेदी - टप्पा ३", titleEn: "LED Street Light Purchase - Phase 3", dept: "दिवाबत्ती", deptEn: "Street Lights", amount: "₹ 12,50,000", startDate: "10 मार्च 2026", startDateEn: "10 March 2026", endDate: "10 एप्रिल 2026", endDateEn: "10 April 2026", status: "चालू", statusEn: "Active" },
  { id: "T-2026-003", title: "कचरा वाहन खरेदी", titleEn: "Garbage Vehicle Purchase", dept: "आरोग्य", deptEn: "Health", amount: "₹ 28,00,000", startDate: "15 मार्च 2026", startDateEn: "15 March 2026", endDate: "15 एप्रिल 2026", endDateEn: "15 April 2026", status: "चालू", statusEn: "Active" },
  { id: "T-2025-045", title: "पाणी शुद्धीकरण प्रकल्प", titleEn: "Water Purification Project", dept: "पाणी पुरवठा", deptEn: "Water Supply", amount: "₹ 1,20,00,000", startDate: "01 डिसेंबर 2025", startDateEn: "01 December 2025", endDate: "31 जानेवारी 2026", endDateEn: "31 January 2026", status: "बंद", statusEn: "Closed" },
  { id: "T-2025-044", title: "नगरपालिका कार्यालय नूतनीकरण", titleEn: "Municipal Office Renovation", dept: "बांधकाम", deptEn: "Construction", amount: "₹ 35,00,000", startDate: "15 नोव्हेंबर 2025", startDateEn: "15 November 2025", endDate: "15 डिसेंबर 2025", endDateEn: "15 December 2025", status: "बंद", statusEn: "Closed" },
  { id: "T-2025-043", title: "उद्यान विकास प्रकल्प", titleEn: "Park Development Project", dept: "नगररचना", deptEn: "Town Planning", amount: "₹ 18,00,000", startDate: "01 ऑक्टोबर 2025", startDateEn: "01 October 2025", endDate: "31 ऑक्टोबर 2025", endDateEn: "31 October 2025", status: "बंद", statusEn: "Closed" },
];

const Tenders = () => {
  const { t } = useLanguage();
  const active = tenders.filter((td) => td.status === "चालू");
  const closed = tenders.filter((td) => td.status === "बंद");

  const TenderCard = ({ tender }: { tender: typeof tenders[0] }) => (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{tender.id}</span>
              <Badge variant={tender.status === "चालू" ? "default" : "secondary"}>{t(tender.status, tender.statusEn)}</Badge>
            </div>
            <h3 className="font-bold">{t(tender.title, tender.titleEn)}</h3>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>{t("विभाग", "Department")}: <strong>{t(tender.dept, tender.deptEn)}</strong></span>
              <span>{t("रक्कम", "Amount")}: <strong>{tender.amount}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{t(tender.startDate, tender.startDateEn)} {t("ते", "to")} {t(tender.endDate, tender.endDateEn)}</span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-1" /> {t("डाउनलोड", "Download")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-primary">{t("निविदा / टेंडर", "Tenders")}</h1>
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">{t(`चालू निविदा (${active.length})`, `Active Tenders (${active.length})`)}</TabsTrigger>
            <TabsTrigger value="closed">{t(`बंद निविदा (${closed.length})`, `Closed Tenders (${closed.length})`)}</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 mt-4">
            {active.map((td) => <TenderCard key={td.id} tender={td} />)}
          </TabsContent>
          <TabsContent value="closed" className="space-y-4 mt-4">
            {closed.map((td) => <TenderCard key={td.id} tender={td} />)}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Tenders;
