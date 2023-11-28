import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

// GET POSTS BY PAGINATION AND CATEGORY
export const GET = async (req) => {

    const { searchParams } = new URL(req.url)

    const page = searchParams.get('page')
    const cat = searchParams.get('cat')

    const POSTS_PER_PAGE = 3

    const query = {
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * (page - 1),
        where: {
            ...(cat && { catSlug: cat })
        },
        include: { user: true }
    }

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.Post.findMany(query),
            prisma.Post.count({where: query.where})
        ])
        
        return new NextResponse(
            JSON.stringify({posts, count}, {status: 200})
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error}, {status: 500})
        )
    }
}

export const POST = async (req) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body, userEmail: session.user.email },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };