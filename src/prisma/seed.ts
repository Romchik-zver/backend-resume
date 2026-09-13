import 'dotenv/config';
import { db } from './db';

const GITHUB = 'https://github.com/Romchik-zver';

export async function seed() {
  try {
    const existing = await db.orm.public.Profile.where({}).first();
    if (existing) {
      console.log('Профиль уже есть, сид пропущен');
      return;
    }

    const profile = await db.orm.public.Profile.create({
      name: 'Ткаченко Роман',
      description:
        'Разрабатываю программное обеспечение около двух лет, специализируюсь на серверной разработке. ' +
        'Проектировал REST API, работал с базами данных, разрабатывал Telegram-ботов, парсеры и консольные утилиты. ' +
        'Вёл проекты от проектирования архитектуры до развёртывания. Уверенно работаю с Linux и bash-скриптами ' +
        'для автоматизации задач. Быстро осваиваю новые технологии и довожу задачи до результата.',
      githubUrl: GITHUB,
      linkedinUrl: '',
    });

    const skills = [
      ['Node.js', 'Продвинутый'],
      ['TypeScript', 'Продвинутый'],
      ['JavaScript', 'Продвинутый'],
      ['REST API', 'Продвинутый'],
      ['PostgreSQL', 'Продвинутый'],
      ['Linux', 'Продвинутый'],
      ['Bash', 'Продвинутый'],
      ['Git', 'Продвинутый'],
      ['Docker', 'Средний'],
      ['CI/CD', 'Средний'],
      ['NestJS', 'Средний'],
      ['Prisma', 'Средний'],
      ['GraphQL', 'Средний'],
      ['Rust', 'Средний'],
      ['C/C++', 'Средний'],
    ] as const;
    await db.orm.public.Skill.createAll(
      skills.map(([name, level]) => ({ name, level, profileId: profile.id })),
    );

    await db.orm.public.Experience.createAll([
      {
        company: 'Работал над своим проектом ResumeHub',
        position: 'Fullstack-разработчик (Junior+)',
        period: '2026',
        achievements:
          'Полная разработка архитектуры проекта, Fullstack приложение от идеи до деплоя.',
        profileId: profile.id,
      },
    ]);

    await db.orm.public.Project.createAll([
      {
        name: 'fmanager',
        idea: 'Файловый менеджер для ПК, сейчас доступен под Linux',
        repoUrl: `${GITHUB}/fmanager`,
        stack: 'C',
        profileId: profile.id,
      },
      {
        name: 'ResumeHub',
        idea: 'Открытая платформа для публикации и копирования резюме',
        repoUrl: `${GITHUB}/ResumeHub`,
        stack: 'Next.js, TypeScript, TailwindCSS',
        profileId: profile.id,
      },
      {
        name: 'Telegram-рассылка',
        idea: 'Бот рассылки, подключается к аккаунту в Telegram',
        repoUrl:
          'Пока что приватный репозиторий, могу показать на собеседовании',
        stack: 'TypeScript, Telegram API',
        profileId: profile.id,
      },
    ]);

    console.log('Сид выполнен: профиль, навыки, опыт, проекты записаны');
  } finally {
    await db.close();
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
