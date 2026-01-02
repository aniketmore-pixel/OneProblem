export async function GET() {
    return Response.json({
        collections: [
            {
                title: "Top 10 Headphones",
                slug: "top-10-headphones",
                category: "Headphones",
                image: "/images/headphones.png",
                theme: "orange"
            },
            {
                title: "Best Smartphones 2025",
                slug: "best-smartphones-2025",
                category: "Smartphones",
                image: "/images/smartphones.png",
                theme: "blue"
            },
            {
                title: "Budget Gadgets",
                slug: "budget-gadgets",
                category: "Accessories",
                image: "/images/gadgets.png",
                theme: "orange"
            }
        ]
    })
}
