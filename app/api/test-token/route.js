export async function GET() {
  const token = process.env.CALENDLY_API_TOKEN;
  const userUri = process.env.CALENDLY_USER_URI;

  try {
    const response = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return Response.json({
      success: response.ok,
      status: response.status,
      hasToken: !!token,
      tokenStart: token?.substring(0, 20),
      userUri: userUri,
      response: data
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}