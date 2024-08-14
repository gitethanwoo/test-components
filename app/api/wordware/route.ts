import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { momInfo } = await request.json();

    console.log('Sending request to Wordware with momInfo:', momInfo);

    const response = await fetch('https://app.wordware.ai/api/released-app/87cc2262-44be-4d72-81a9-d8009daa53e6/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WORDWARE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: { mom_info: momInfo },
        version: "^1.2"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Wordware API error:', response.status, errorText);
      throw new Error(`Wordware API responded with status: ${response.status}. Error: ${errorText}`);
    }

    const reader = response.body?.getReader();
    let fullResponse = '';
    let insight = '';
    let recommendation = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        console.log('Chunk:', chunk);
        fullResponse += chunk;
      }
    }

    console.log('Full Wordware API response:', fullResponse);

    const lines = fullResponse.split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
      try {
        const jsonChunk = JSON.parse(line);
        if (jsonChunk.type === 'chunk' && jsonChunk.value.type === 'outputs') {
          insight = jsonChunk.value.values.insight || '';
          recommendation = jsonChunk.value.values.next_step || '';
          break;
        }
      } catch (parseError: unknown) {
        if (parseError instanceof Error) {
          console.error('Error parsing Wordware API response:', parseError);
          throw new Error(`Failed to parse Wordware API response: ${parseError.message}`);
        }
        throw parseError;
      }
    }

    const processedResponse = {
      outputs: {
        insight: insight.trim(),
        recommendation: recommendation.trim()
      }
    };

    console.log('Processed Wordware API response:', processedResponse);
    return NextResponse.json(processedResponse);
  } catch (error) {
    console.error('Error in Wordware API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}