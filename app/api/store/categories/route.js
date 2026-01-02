export async function GET() {
    return Response.json({
        categories: [
            { id: 1, name: "Mobiles" },
            { id: 2, name: "Laptops" },
            { id: 3, name: "Headphones" },
            { id: 4, name: "Accessories" },
            { id: 4, name: "Computers" }
        ]
    })
}
