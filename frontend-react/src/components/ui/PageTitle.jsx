export default function PageTitle({

badge,

title,

subtitle,

}){

return(

<div>

<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">

{badge}

</div>

<h1 className="text-5xl font-black mt-6">

{title}

</h1>

<p className="text-gray-400 mt-5 text-lg">

{subtitle}

</p>

</div>

);

}