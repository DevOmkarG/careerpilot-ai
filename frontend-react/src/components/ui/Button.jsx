import { motion } from "framer-motion";

export default function Button({

children,

className="",

onClick,

type="button",

disabled=false,

icon,

}){

return(

<motion.button

whileHover={{
scale:1.03
}}

whileTap={{
scale:.97
}}

type={type}

disabled={disabled}

onClick={onClick}

className={`rounded-2xl px-6 py-4 font-semibold transition disabled:opacity-60 ${className}`}

>

<div className="flex items-center justify-center gap-3">

{icon}

{children}

</div>

</motion.button>

);

}