interface BadgeProps {
	value: string;
	variant: string;
}

const Badge = ({ value, variant }: BadgeProps) => {
    return <div className={`text-white text-xs ${variant === "success" ? "bg-green-500" :"bg-red-500"} w-fit rounded-md px-1 py-1 `}>{value}</div>;
};

export default Badge;
