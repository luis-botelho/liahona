import 'dotenv/config';
import argon2 from 'argon2';

import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// AVISO: este seed é estritamente para desenvolvimento/demonstração.
// Ele nunca deve rodar em produção. A execução em NODE_ENV=production é bloqueada.
if (process.env.NODE_ENV === 'production') {
  console.error('O seed de demonstração não pode ser executado em produção.');
  process.exit(1);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = 'demo123';

const workerData = {
  whatsapp: '5511999999999',
  city: 'Mambucaba',
  neighborhood: 'Centro',
  bio: 'Procurando oportunidades de trabalho na região.',
  skills: ['atendimento', 'caixa', 'vendas'],
  interests: ['vendas', 'atendimento'],
  professionalTitle: 'Atendente / Vendas',
  availability: 'Período integral',
  desiredRoles: ['atendente', 'operador de caixa', 'vendedor'],
  workPreferences: ['CLT', 'meio período'],
  discoverableByRecruiters: true,
  whatsappOptIn: true,
};

const recruiterData = {
  organizationName: 'Padaria Demo',
  whatsapp: '5511988888888',
  city: 'Mambucaba',
  neighborhood: 'Centro',
  description: 'Comércio local com oportunidades para a comunidade.',
};

const demoOpportunities = [
  {
    title: 'Atendente de padaria',
    description:
      'Procuramos pessoa para atendimento ao balcão, caixa e organização da loja. Experiência não é obrigatória.',
    type: 'JOB',
    location: 'Mambucaba',
    category: 'Atendimento',
    tags: ['atendimento', 'caixa', 'vendas'],
  },
  {
    title: 'Ajudante de eletricista',
    description:
      'Auxiliar técnico em serviços de eletricidade residencial e comercial. Interessado será treinado.',
    type: 'SERVICE',
    location: 'Mambucaba',
    category: 'Elétrica',
    tags: ['elétrica', 'eletricista', 'serviços gerais'],
  },
  {
    title: 'Auxiliar de estoque',
    description:
      'Organização, reposição e conferência de mercadorias no estoque. Procuramos pessoa organizada.',
    type: 'JOB',
    location: 'Mambucaba',
    category: 'Logística',
    tags: ['estoque', 'reposição', 'organização'],
  },
] as const;

async function upsertWorker() {
  const email = 'demo@liahona.app';
  const password = await argon2.hash(DEMO_PASSWORD);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password, role: 'WORKER' },
    create: { email, password, name: 'Usuário Demo', role: 'WORKER' },
  });

  await prisma.workerProfile.upsert({
    where: { userId: user.id },
    update: workerData,
    create: { userId: user.id, ...workerData },
  });

  return user;
}

async function upsertRecruiter() {
  const email = 'recrutador.demo@liahona.app';
  const password = await argon2.hash(DEMO_PASSWORD);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password, role: 'RECRUITER' },
    create: { email, password, name: 'Recrutador Demo', role: 'RECRUITER' },
  });

  await prisma.recruiterProfile.upsert({
    where: { userId: user.id },
    update: recruiterData,
    create: { userId: user.id, ...recruiterData },
  });

  return user;
}

async function seedOpportunities(recruiterId: string) {
  for (const opportunity of demoOpportunities) {
    const existing = await prisma.opportunity.findFirst({
      where: { title: opportunity.title, authorId: recruiterId },
      select: { id: true },
    });

    if (existing) continue;

    await prisma.opportunity.create({
      data: { ...opportunity, authorId: recruiterId },
    });
  }
}

async function backfillLegacyOpportunities(recruiterId: string) {
  const legacy = await prisma.opportunity.findFirst({
    where: { title: 'Auxiliar para evento local', authorId: recruiterId },
  });

  if (!legacy) return;

  const needsBackfill = !legacy.category || !legacy.tags || legacy.tags.length === 0;

  if (needsBackfill) {
    await prisma.opportunity.update({
      where: { id: legacy.id },
      data: {
        category: 'Eventos',
        tags: ['auxiliar', 'eventos', 'serviços gerais'],
      },
    });

    console.log('Oportunidade legada preenchida:', legacy.title);
  }
}

async function seedDemoApplication(workerId: string, recruiterId: string) {
  const opportunity = await prisma.opportunity.findFirst({
    where: { authorId: recruiterId },
    orderBy: { createdAt: 'asc' },
    select: { id: true, title: true },
  });

  if (!opportunity) return;

  await prisma.application.upsert({
    where: {
      opportunityId_workerId: { opportunityId: opportunity.id, workerId },
    },
    update: {},
    create: {
      opportunityId: opportunity.id,
      workerId,
      status: 'REVIEWING',
    },
  });

  console.log('Candidatura demo criada para:', opportunity.title);
}

const demoCourses = [
  {
    title: 'Atendimento que encanta',
    description:
      'Aprenda a atender clientes com empatia, resolver reclamações e transformar uma visita em fidelidade.',
    category: 'Atendimento',
    skills: ['atendimento', 'comunicação'],
    provider: 'LIA Academia',
    source: 'LIA',
    lessons: [
      'Primeiro contato com o cliente',
      'Escuta ativa e empatia',
      'Lidando com reclamações',
      'Fechar o atendimento com excelência',
    ],
  },
  {
    title: 'Operadora de caixa na prática',
    description:
      'Do registro de itens ao fechamento do caixa: um guia passo a passo para operar com segurança.',
    category: 'Vendas',
    skills: ['caixa', 'vendas'],
    provider: 'LIA Academia',
    source: 'LIA',
    lessons: ['Conhecendo a máquina de cartão', 'Dinheiro e troco sem erros', 'Fechamento de caixa'],
  },
  {
    title: 'Introdução à elétrica residencial',
    description:
      'Conceitos básicos de segurança e instalação elétrica para quem quer começar como ajudante.',
    category: 'Elétrica',
    skills: ['elétrica', 'segurança'],
    provider: 'Instituto Demo',
    source: 'EXTERNAL',
    lessons: ['Segurança em primeiro lugar', 'Materiais e ferramentas', 'Instalação de tomadas'],
  },
  {
    title: 'Organização de estoque',
    description:
      'Técnicas simples de recebimento, estocagem e inventário para manter tudo no lugar.',
    category: 'Logística',
    skills: ['estoque', 'organização'],
    provider: 'LIA Academia',
    source: 'LIA',
    lessons: ['Recebimento de mercadorias', 'Etiqueta e prateleiras', 'Inventário rápido'],
  },
] as const;

async function seedCourses() {
  for (const course of demoCourses) {
    const existing = await prisma.course.findFirst({
      where: { title: course.title },
      select: { id: true },
    });

    if (existing) continue;

    await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        category: course.category,
        skills: [...course.skills],
        provider: course.provider,
        source: course.source,
        lessons: {
          create: course.lessons.map((title, orderIndex) => ({
            title,
            orderIndex,
          })),
        },
      },
    });
  }
}

async function main() {
  const worker = await upsertWorker();
  const recruiter = await upsertRecruiter();
  await seedOpportunities(recruiter.id);
  await backfillLegacyOpportunities(recruiter.id);
  await seedDemoApplication(worker.id, recruiter.id);
  await seedCourses();

  console.log('Seed finalizado.');
  console.log(`Worker:    ${worker.email} / ${DEMO_PASSWORD}`);
  console.log(`Recruiter: ${recruiter.email} / ${DEMO_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });