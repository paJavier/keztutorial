// app/api/calendly/route.js
export async function GET() {
  try {
    const token = process.env.CALENDLY_API_KEY;
    if (!token) throw new Error("Missing CALENDLY_API_KEY");

    // 1️⃣ Get user URI
    const userRes = await fetch("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await userRes.json();
    const userUri = userData.resource?.uri;

    if (!userUri) {
      throw new Error("User URI not found");
    }

    // 2️⃣ Fetch scheduled events
    const eventsRes = await fetch(
      `https://api.calendly.com/scheduled_events?user=${encodeURIComponent(userUri)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const eventsText = await eventsRes.text();

    if (!eventsRes.ok) {
      throw new Error(`Calendly error: ${eventsText}`);
    }

    const eventsData = JSON.parse(eventsText);

    return new Response(
      JSON.stringify(eventsData.collection ?? []),
      { status: 200 }
    );
  } catch (err) {
    console.error("Calendly API error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
