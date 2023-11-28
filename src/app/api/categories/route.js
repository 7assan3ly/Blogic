import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const categories = await prisma.Category.findMany()
        return new NextResponse(
            JSON.stringify(categories, {status: 200})
        )

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error }, {status: 500})
        )
    }
}