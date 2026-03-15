import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Megaphone } from "lucide-react";

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

const initialNotices: Notice[] = [
  { id: 1, title: "मालमत्ता कर भरणा अंतिम तारीख", content: "मालमत्ता कर भरण्याची अंतिम तारीख 31 मार्च 2026 आहे.", date: "10 मार्च 2026", active: true },
  { id: 2, title: "पाणी पुरवठा बंद सूचना", content: "दुरुस्तीसाठी 15 मार्चला पाणी पुरवठा बंद राहील.", date: "12 मार्च 2026", active: true },
  { id: 3, title: "स्वच्छता मोहीम", content: "रविवारी विशेष स्वच्छता मोहीम राबवली जाईल.", date: "8 मार्च 2026", active: false },
];

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addNotice = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setNotices([
      { id: Date.now(), title: newTitle, content: newContent, date: "आज", active: true },
      ...notices,
    ]);
    setNewTitle("");
    setNewContent("");
  };

  const toggleActive = (id: number) => {
    setNotices(notices.map((n) => (n.id === id ? { ...n, active: !n.active } : n)));
  };

  const deleteNotice = (id: number) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">सूचना व्यवस्थापन</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">नवीन सूचना जोडा</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="सूचनेचे शीर्षक" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} maxLength={200} />
          <Textarea placeholder="सूचनेचा मजकूर" value={newContent} onChange={(e) => setNewContent(e.target.value)} maxLength={1000} />
          <Button onClick={addNotice} className="gov-gradient text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> सूचना जोडा
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notices.map((n) => (
          <Card key={n.id} className={n.active ? "" : "opacity-60"}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{n.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${n.active ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                    {n.active ? "सक्रिय" : "निष्क्रिय"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" onClick={() => toggleActive(n.id)}>
                  {n.active ? "बंद करा" : "सक्रिय करा"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteNotice(n.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
