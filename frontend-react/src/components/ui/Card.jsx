export default function Card({

children,

className="",

}){

return(

<div

className={`rounded-3xl bg-[#111827] border border-white/10 p-8 ${className}`}

>

{children}

</div>

);

}