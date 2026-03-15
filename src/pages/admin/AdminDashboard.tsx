import { 
  MessageSquare, FileText, Users, FolderOpen, TrendingUp, 
  AlertTriangle, CheckCircle, Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "एकूण तक्रारी", value: "284", icon: MessageSquare, color: "text-primary" },
  { label: "प्रलंबित तक्रारी", value: "42", icon: Clock, color: "text-yellow-600" },
  { label: "निराकरण झालेल्या", value: "230", icon: CheckCircle, color: "text-green-600" },
  { label: "चालू प्रकल्प", value: "8", icon: FolderOpen, color: "text-blue-600" },
  { label: "सक्रिय सूचना", value: "15", icon: FileText, color: "text-purple-600" },
  { label: "नोंदणीकृत नागरिक", value: "1,240", icon: Users, color: "text-teal-600" },
];

const recentComplaints = [
  { id: "TK-284", subject: "रस्ता खराब - वार्ड ३", status: "प्रलंबित", date: "12 मार्च" },
  { id: "TK-283", subject: "पाणी पुरवठा बंद", status: "कार्यवाही सुरू", date: "11 मार्च" },
  { id: "TK-282", subject: "स्ट्रीटलाइट बंद - गणपती पेठ", status: "निराकरण", date: "11 मार्च" },
  { id: "TK-281", subject: "कचरा उचलला नाही", status: "प्रलंबित", date: "10 मार्च" },
  { id: "TK-280", subject: "गटार तुंबलेले", status: "कार्यवाही सुरू", date: "10 मार्च" },
];

const statusColors: Record<string, string> = {
  "प्रलंबित": "bg-yellow-100 text-yellow-800",
  "कार्यवाही सुरू": "bg-blue-100 text-blue-800",
  "निराकरण": "bg-green-100 text-green-800",
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">डॅशबोर्ड</h1>
        <p className="text-muted-foreground">वाई नगर परिषद प्रशासकीय विहंगावलोकन</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              अलीकडील तक्रारी
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentComplaints.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.id} · {c.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              जलद कार्यवाही
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "नवीन सूचना जोडा", icon: FileText },
                { label: "तक्रार निराकरण", icon: CheckCircle },
                { label: "प्रकल्प अपडेट", icon: FolderOpen },
                { label: "बातमी प्रकाशित", icon: FileText },
                { label: "सभा शेड्यूल", icon: Clock },
                { label: "दिनक्रम अपडेट", icon: Users },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left text-sm"
                >
                  <action.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  {action.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
