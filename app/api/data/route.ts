import { NextResponse } from 'next/server';
import { initialData } from '@/app/table/utils/constants';

let tableData = [...initialData];

export async function GET() {
  return NextResponse.json(tableData);
}

export async function POST(request: Request) {
  const newPerson = await request.json();
  const addedPerson = { ...newPerson, id: tableData.length + 1 };
  tableData.push(addedPerson);
  return NextResponse.json(addedPerson, { status: 201 });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { status } = await request.json();
  
  const person = tableData.find(p => p.id === parseInt(id!));
  if (person) {
    person.status = status;
    return NextResponse.json(person);
  }
  return NextResponse.json({ error: 'Person not found' }, { status: 404 });
}