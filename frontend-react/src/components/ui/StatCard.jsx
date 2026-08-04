import CountUp from "react-countup";

export default function StatCard({

icon,

title,

value,

color="text-cyan-400",

}){

return(

<div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

<div className={color}>

{icon}

</div>

<p className="text-gray-400 mt-6">

{title}

</p>

<h2 className="text-5xl font-black mt-3">

{

typeof value==="number"

?

<CountUp

end={value}

/>

:

value

}

</h2>

</div>

);

}