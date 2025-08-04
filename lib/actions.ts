"use server"

import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const role = formData.get("role") as string

  // Validate input
  if (!name || !email) {
    throw new Error("Name and email are required")
  }

  try {
    // In a real app, save to database
    console.log("Creating user:", { name, email, role })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the page to show updated data
    revalidatePath("/dashboard")

    return { success: true, message: "User created successfully" }
  } catch (error) {
    throw new Error("Failed to create user")
  }
}

export async function updateUserStatus(userId: number, status: string) {
  try {
    // In a real app, update database
    console.log("Updating user status:", { userId, status })

    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/dashboard")

    return { success: true, message: "User status updated" }
  } catch (error) {
    throw new Error("Failed to update user status")
  }
}
