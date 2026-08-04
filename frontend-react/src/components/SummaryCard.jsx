export default function SummaryCard({
summary="",
}){

return(

<div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

<h2 className="text-2xl font-black mb-6">

Professional Summary

</h2>

<p className="text-gray-300 leading-8 whitespace-pre-wrap">

{summary}

</p>

</div>

);

}