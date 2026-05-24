import { type NextRequest, NextResponse } from 'next/server';

const jsonSelectHandler = (coin: string) => {

  return require(`./${coin?.toLowerCase()}.json`);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const coin = searchParams.get('coin') as string;

  if (!coin)
    return NextResponse.json(null, { status: 400 });

  return NextResponse.json(jsonSelectHandler(coin), {
    status: 200
  });
}
