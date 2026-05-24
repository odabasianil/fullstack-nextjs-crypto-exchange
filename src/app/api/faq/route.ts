import { type NextRequest, NextResponse } from 'next/server';

const jsonSelectHandler = (question: string) => {

  return require(`./${question?.toLowerCase()}.json`);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const question = searchParams.get('question') as string;

  if (!question)
    return NextResponse.json(null, { status: 400 });

  return NextResponse.json(jsonSelectHandler(question), {
    status: 200
  });
}
