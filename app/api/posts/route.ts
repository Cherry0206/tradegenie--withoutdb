import { type NextRequest, NextResponse } from "next/server"

// Mock posts data
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content: "Learn how to build modern web applications with Next.js",
    authorId: 1,
    published: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Building APIs with Route Handlers",
    content: "Comprehensive guide to creating REST APIs in Next.js",
    authorId: 2,
    published: true,
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: 3,
    title: "Database Integration Patterns",
    content: "Best practices for connecting your app to databases",
    authorId: 1,
    published: false,
    createdAt: "2024-01-17T09:15:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const published = searchParams.get("published")
  const authorId = searchParams.get("authorId")

  let filteredPosts = posts

  // Filter by published status
  if (published !== null) {
    filteredPosts = posts.filter((post) => post.published === (published === "true"))
  }

  // Filter by author
  if (authorId) {
    filteredPosts = filteredPosts.filter((post) => post.authorId === Number.parseInt(authorId))
  }

  return NextResponse.json({
    posts: filteredPosts,
    total: filteredPosts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, authorId, published = false } = body

    if (!title || !content || !authorId) {
      return NextResponse.json({ error: "Title, content, and authorId are required" }, { status: 400 })
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      authorId: Number.parseInt(authorId),
      published,
      createdAt: new Date().toISOString(),
    }

    posts.push(newPost)

    return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
