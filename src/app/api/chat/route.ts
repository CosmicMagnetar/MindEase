import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Call your deployed Flask backend
    const flaskResponse = await fetch('https://therepybot.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting to TherapyBot:', error);
    return NextResponse.json(
      { error: 'Failed to connect to TherapyBot API' },
      { status: 500 }
    );
  }
}
