import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react";
import { useState } from "react";

interface Complaint {
  id: string;
  name: string;
  mobile: string;
  type: string;
  department: string;
  description: string;
  date: string;
  status: "प्रलंबित" | "कार्यवाही सुरू" | "निराकरण";
}

const initialComplaints: Complaint[] = [
  { id: "TK-284", name: "राजेश पाटील", mobile: "98765xxxxx", type: "रस्ता", department: "बांधकाम", description: "वार्ड ३ मधील रस्ता खूप खराब आहे.", date: "12 मार्च 2026", status: "प्रलंबित" },
  { id: "TK-283", name: "सुनीता जाधव", mobile: "98234xxxxx", type: "पाणी", department: "पाणी पुरवठा", description: "गेल्या 3 दिवसांपासून पाणी येत नाही.", date: "11 मार्च 2026", status: "कार्यवाही सुरू" },
  { id: "TK-282", name: "अमित शिंदे", mobile: "97654xxxxx", type: "दिवाबत्ती", department: "दिवाबत्ती", description: "गणपती पेठ स्ट्रीटलाइट बंद.", date: "11 मार्च 2026", status: "निराकरण" },
  { id: "TK-281", name: "प्रिया कुलकर्णी", mobile: "99876xxxxx", type: "कचरा", department: "आरोग्य", description: "कचरा 4 दिवसांपासून उचलला नाही.", date: "10 मार्च 2026", status: "प्रलंबित" },
];

const statusColors: Record<string, string> = {
  "प्रलंबित": "bg-yellow-100 text-yellow-800",
  "कार्यवाही सुरू": "bg-blue-100 text-blue-800",
  "निराकरण": "bg-green-100 text-green-800",
};

const statusIcons: Record<string, typeof Clock> = {
  "प्रलंबित": Clock,
  "कार्यवाही सुरू": AlertTriangle,
  "निराकरण": CheckCircle,
};

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const updateStatus = (id: string, status: Complaint["status"]) => {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status } : c)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">तक्रार व्यवस्थापन</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {(["प्रलंबित", "कार्यवाही सुरू", "निराकरण"] as const).map((status) => {
          const count = complaints.filter((c) => c.status === status).length;
          const Icon = statusIcons[status];
          return (
            <Card key={status}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${status === "प्रलंबित" ? "text-yellow-600" : status === "कार्यवाही सुरू" ? "text-blue-600" : "text-green-600"}`} />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{status}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {complaints.map((c) => (
            <Card key={c.id} className={`cursor-pointer transition-all ${selected?.id === c.id ? "ring-2 ring-primary" : "hover:shadow-md"}`} onClick={() => setSelected(c)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{c.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                </div>
                <p className="font-medium text-sm">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.name} · {c.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selected && (
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" /> तक्रार तपशील — {selected.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">नाव:</span> <br/>{selected.name}</div>
                <div><span className="text-muted-foreground">मोबाइल:</span> <br/>{selected.mobile}</div>
                <div><span className="text-muted-foreground">प्रकार:</span> <br/>{selected.type}</div>
                <div><span className="text-muted-foreground">विभाग:</span> <br/>{selected.department}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">वर्णन:</span>
                <p className="mt-1">{selected.description}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700" onClick={() => updateStatus(selected.id, "प्रलंबित")}>प्रलंबित</Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700" onClick={() => updateStatus(selected.id, "कार्यवाही सुरू")}>कार्यवाही सुरू</Button>
                <Button size="sm" className="bg-green-600 text-primary-foreground hover:bg-green-700" onClick={() => updateStatus(selected.id, "निराकरण")}>निराकरण</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
