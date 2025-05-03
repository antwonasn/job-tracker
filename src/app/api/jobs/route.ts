import { PrismaClient } from '@/generated/prisma'
const prisma = new PrismaClient();

export async function GET() {
  const jobs = await prisma.job.findMany();
  return Response.json(jobs);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
    
        const job = await prisma.job.create({
          data: {
            company: body.company,
            role: body.role,
            platform: body.platform,
            status: body.status,
            appliedDate: body.appliedDate ? new Date(body.appliedDate) : null,
            doubleDown: body.doubleDown ?? false,
            followedUp: body.followedUp ?? false,
          },
        });
    
        return Response.json(job, { status: 201 });
      } catch (error) {
        console.error('Error creating job:', error);
        return new Response('Failed to create job', { status: 500 });
      }
    }