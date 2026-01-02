"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const router = useRouter()

  const submit = async () => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    })
    router.push("/login")
  }

  return (
    <div>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Create Account</button>
    </div>
  )
}
