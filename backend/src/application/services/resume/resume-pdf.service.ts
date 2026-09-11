import PDFDocument from 'pdfkit';

export interface ResumeOpportunityData {
  title?: string | null;
  tags?: string[];
}

export interface ResumeProfileData {
  name: string;
  email: string;
  professionalTitle?: string | null;
  whatsapp?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  bio?: string | null;
  skills?: string[];
  interests?: string[];
  desiredRoles?: string[];
  workPreferences?: string[];
  availability?: string | null;
  opportunity?: ResumeOpportunityData | null;
}

const isPresent = (value: unknown): boolean =>
  value !== undefined && value !== null && String(value).trim() !== '';

function collectPdf(pdf: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    pdf.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    pdf.on('end', () => resolve(Buffer.concat(chunks)));
    pdf.on('error', reject);
  });
}

function buildSectionTitle(pdf: PDFKit.PDFDocument, title: string) {
  pdf.moveDown(0.6);
  pdf.font('Helvetica-Bold').fontSize(11).fillColor('#1a1a1a').text(title);
  pdf.moveDown(0.2);
}

export function orderSkillsForOpportunity(
  skills: string[],
  opportunityTags: string[],
): string[] {
  const normalized = opportunityTags.map((tag) => tag.trim().toLowerCase());

  const matched = skills.filter((skill) =>
    normalized.includes(skill.trim().toLowerCase()),
  );
  const others = skills.filter(
    (skill) => !normalized.includes(skill.trim().toLowerCase()),
  );

  return [...matched, ...others];
}

export async function generateResumePdf(
  data: ResumeProfileData,
): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margin: 48 });

  const pdfPromise = collectPdf(doc);

  const name = data.name?.trim() || 'Currículo';
  const title = data.professionalTitle?.trim();

  doc.info.Title = data.opportunity?.title
    ? `Curriculo LIA - ${name} - ${data.opportunity.title}`
    : `Curriculo LIA - ${name}`;
  doc.info.Author = `LIA - ${name}`;
  doc.info.Subject = 'Currículo gerado pelo LIA a partir do perfil do trabalhador';
  doc.info.Creator = 'LIA';

  doc
    .fillColor('#171717')
    .font('Helvetica-Bold')
    .fontSize(20)
    .text(name, { align: 'left' });

  if (title) {
    doc.moveDown(0.25);
    doc.fillColor('#4b5563').font('Helvetica').fontSize(12).text(title);
  }

  if (data.opportunity?.title) {
    doc.moveDown(0.6);
    doc
      .fillColor('#0f172a')
      .roundedRect(doc.x, doc.y, doc.page.width - doc.page.margins.left - doc.page.margins.right, 24, 6)
      .fill('#0f172a');
    doc
      .fillColor('#ffffff')
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(
        `Currículo preparado para: ${data.opportunity.title}`,
        doc.page.margins.left + 10,
        doc.y + 7,
        { width: doc.page.width - doc.page.margins.left - doc.page.margins.right - 20 },
      );
    doc.y += 8;
    doc.fillColor('#171717');
  }

  buildSectionTitle(doc, 'Contato');

  const contactLines: string[] = [];
  if (isPresent(data.whatsapp)) contactLines.push(`WhatsApp: ${data.whatsapp}`);
  contactLines.push(`E-mail: ${data.email}`);
  if (isPresent(data.city) || isPresent(data.neighborhood)) {
    contactLines.push(
      `Localização: ${[data.city, data.neighborhood].filter(isPresent).join(' - ')}`,
    );
  }

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('#374151')
    .text(contactLines.join('\n'));

  if (isPresent(data.bio)) {
    buildSectionTitle(doc, 'Resumo');
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#374151')
      .text(data.bio as string);
  }

  const skills = data.skills ?? [];
  if (skills.length > 0) {
    const opportunityTags = data.opportunity?.tags ?? [];
    const ordered = opportunityTags.length
      ? orderSkillsForOpportunity(skills, opportunityTags)
      : skills;

    buildSectionTitle(doc, 'Habilidades');
    ordered.forEach((skill) => {
      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor('#374151')
        .text(`• ${skill}`);
    });
  }

  const roles = data.desiredRoles ?? [];
  if (roles.length > 0) {
    buildSectionTitle(doc, 'Cargos que procuro');
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#374151')
      .text(roles.join(', '));
  }

  const interests = data.interests ?? [];
  if (interests.length > 0) {
    buildSectionTitle(doc, 'Áreas de interesse');
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#374151')
      .text(interests.join(', '));
  }

  const preferences: string[] = [];
  if (isPresent(data.availability)) preferences.push(data.availability as string);
  preferences.push(...(data.workPreferences ?? []));

  if (preferences.length > 0) {
    buildSectionTitle(doc, 'Disponibilidade e preferências');
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#374151')
      .text(preferences.join(' · '));
  }

  doc.moveDown(1);
  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor('#9ca3af')
    .text('Gerado pelo LIA — Local Intelligence for Assistance', { align: 'center' });

  doc.end();

  return pdfPromise;
}