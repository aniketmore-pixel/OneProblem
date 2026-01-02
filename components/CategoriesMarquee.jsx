import { categories } from "@/assets/assets";

const CategoriesMarquee = ({ categories = [] }) => {

    if (!categories.length) return null

    return (
        <div className="overflow-hidden py-4">
            <div className="flex gap-8 animate-marquee">
                {categories.map((category) => (
                    <span
                        key={category.id}
                        className="px-6 py-2 bg-slate-100 rounded-full text-sm font-medium"
                    >
                        {category.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default CategoriesMarquee

