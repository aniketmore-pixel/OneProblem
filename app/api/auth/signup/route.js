import { supabase } from "@/lib/supabaseServer";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password required" }),
        { status: 400 }
      );
    }

    // 🔑 generate internal email
    const email = `${username}@app.local`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    await supabase.from("profiles").insert({
      id: data.user.id,
      username,
    });

    return new Response(
      JSON.stringify({ message: "Signup successful" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
