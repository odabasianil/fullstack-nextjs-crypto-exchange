import { type NextRequest, NextResponse } from 'next/server';

const jsonSelectHandler = (coin1: string, coin2: string) => {

  return require(`./${coin1?.toLowerCase()}-${coin2?.toLowerCase()}.json`);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const coin1 = searchParams.get('coin1') as string;
  const coin2 = searchParams.get('coin2') as string;

  if (!coin1 && !coin2)
    return NextResponse.json(null, { status: 400 });

  return NextResponse.json(jsonSelectHandler(coin1, coin2), {
    status: 200
  });
}
