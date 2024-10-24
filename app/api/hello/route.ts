import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    message: 'Hello next.js!',
    contents: '/app/api 폴더 생성 Next.js 서비스 제공 기능 관습적으로 ......',
  }
  return NextResponse.json(data)
}
