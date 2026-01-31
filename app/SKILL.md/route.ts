import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'SKILL.md')
    const fileContent = readFileSync(filePath, 'utf-8')
    
    return new Response(fileContent, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    return new Response('File not found', { status: 404 })
  }
}
