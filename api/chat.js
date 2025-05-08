import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load aiBotData.json once
const dataPath = path.join(process.cwd(), 'src', 'data', 'aiBotData.json');
let aiData = null;
try {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  aiData = JSON.parse(raw);
} catch (err) {
  console.error('Failed to load aiBotData.json', err);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  // Build system prompt with embedded RAG context
  const systemPrompt = `You are Pawel Sloboda's portfolio assistant. Answer user questions concisely (2-4 sentences) and always explain why Pawel is a great fit. 
Keep an upbeat, confident tone. Always reference at least one relevant project or experience. If possible, mention relevant skills.
Dataset:
${JSON.stringify(aiData)}
`; // Simple RAG by inlining all profile data

  const chatMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-10), // include last up to 10 messages for context
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.6,
      max_tokens: 180,
    });

    const assistantReply = completion.choices[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response.";
    return res.status(200).json({ content: assistantReply });
  } catch (error) {
    console.error('OpenAI error:', error);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
} 