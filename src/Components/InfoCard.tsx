import React from 'react'


interface cardProp {
    name: string,
    value: string | number,
    img: any,
    color: string[]
}

const InfoCard = ({name, value, img, color}:cardProp) => {
  return (
		<div className={`${color[0]} pb-1 rounded-2xl h-[200px] flex flex-col justify-center items-center hover:scale-110 transition-all ease-in-out duration-700 gap-2`}>
			<div className={`flex justify-center items-center rounded-full ${color[1]} w-12 h-12`}>
				<img src={img} alt="" className={"w-7"} />
			</div>
			<div className="text-4xl font-semibold my-2 text-slate-700">{value}</div>
			<p className="text-slate-600 text-center text-base w-[80%]">{name}</p>
		</div>
	);
}

export default InfoCard