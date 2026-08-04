import {
CheckCircle,
AlertTriangle,
} from "lucide-react";

export default function InterviewCard({
  status = "",
}) {

const ready =
status
.toLowerCase()
.includes("ready");

return(

<div className="rounded-3xl bg-[#111827] border border-white/10 p-6 h-full flex flex-col justify-between">

  <div className="flex items-center gap-2 text-yellow-400">
    <AlertTriangle size={18}/>
    <span className="text-sm">Interview Status</span>
  </div>

  <div className="mt-6">

    <h2 className="text-3xl font-bold">

      {status}

    </h2>

  </div>

</div>
)
}