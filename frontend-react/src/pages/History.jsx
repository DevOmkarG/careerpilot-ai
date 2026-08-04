import { useEffect, useState } from "react";
import axios from "axios";
import { Clock3, Eye, Trash2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function deleteResume(id) {
    if (!window.confirm("Delete this resume?")) return;
    await axios.delete(`http://127.0.0.1:8000/history/${id}`);
    loadHistory();
  }

  return (
    <WorkspaceLayout rightPanel={<AIChat />}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Resume History
          </h1>
          <p className="text-slate-500 mt-2">Previously analyzed resumes.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading...</div>
        ) : history.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-16 text-center">
            <FileText size={56} className="mx-auto text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-800 mt-6">No resume history yet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Analyze a resume to see it show up here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{item.filename}</h2>
                  <div className="flex gap-6 mt-3 text-sm text-slate-500">
                    <span>
                      ATS:{" "}
                      <span className="text-blue-600 font-semibold ml-1">
                        {item.ats_score}%
                      </span>
                    </span>
                    <span>
                      Skills:{" "}
                      <span className="ml-1 font-semibold text-slate-700">
                        {item.skills_detected?.length}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                    <Clock3 size={14} />
                    {item.created_at}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Eye size={17} />
                  </button>
                  <button
                    onClick={() => deleteResume(item._id)}
                    className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
