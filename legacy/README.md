# CarbonX
Documentation of the CarbonX repository.

# Introduction
We aim to provide an overview of our tech stack, our design choices and style guides, as well as a guide on how to dive into the code and get up and running as quickly as possible.

# Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
#### Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

# Technologies

#### Supabase [Supabase | The Open Source Firebase Alternative](https://supabase.com/)
Easy to use and scalable Backend-as-a-service, providing direct access to a postgres database, and realtime capabilities. Currently we do not use Supabase Auth in favour of Clerk. Supabase Edge Functions could be used for server side code execution, however Next 13 covers all of our server side needs for now.
- Documentation: [Supabase Docs](https://supabase.com/docs)
- Pricing: [Pricing & fees | Supabase](https://supabase.com/pricing)
#### OpenAI Embeddings [Embeddings - OpenAI API](https://platform.openai.com/docs/guides/embeddings)
Easy to integrate and cost effective embeddings endpoint to create vector embeddings from text.
Storing a vector representation of emission factors, allows us to query them by semantic meaning and get "smart" factor reccommendations for activities.
- Documentation: [Embeddings - OpenAI API](https://platform.openai.com/docs/guides/embeddings)
- Pricing: [Pricing (openai.com)](https://openai.com/pricing)
#### NEXT 13 [Next.js by Vercel - The React Framework (nextjs.org)](https://nextjs.org/)
Full-stack web framework with a rich ecosystem and a huge community behind it.
Chosen for its wide adoption, rich ecosystem, and rapid development speed.
- Documentation: [Docs | Next.js (nextjs.org)](https://nextjs.org/docs)
#### Drizzle ORM [DrizzleORM - next gen TypeScript ORM](https://orm.drizzle.team/)
Database schema definition and powerful, fully typesafe relational queries.
Drizzle ORM makes it easy to define a database schema using TypeScript and retrieve deeply connected data using relational queries. Drizzle acts as a source of truth for our data schema, making it much easier to be typesafe without relying on code generation like Prisma or Supabase.
- Documentation: [Drizzle ORM - DrizzleORM](https://orm.drizzle.team/docs/overview)
#### Drizzle Kit (CLI) [Drizzle Kit - DrizzleORM](https://orm.drizzle.team/kit-docs/overview)
Seamless database migrations.
Drizzle Kit can read the database schema defined with Drizzle ORM and compare it to the schema of a Postgres (or most other relational) database. It can then generate migration files or simply push the local schema to the database.
- Documentation: [Drizzle Kit - DrizzleORM](https://orm.drizzle.team/kit-docs/overview)

#### Clerk [Clerk | Authentication and User Management](https://clerk.com/)
Headache free user authentication.
Clerk is a drop in solution for authentication in Next. All sensitive user data is managed by Clerk in a secure environment. Authentication flows, email verification, password resets and changes, profile changes, 2FA, and much more is handled either by Clerk's hosted UI or prebuild components, that integrate seamlessly with Next 13. We may switch to Supabase Auth in the future. For now, Clerk allows us to move forward quickly.
- Documentation: [Welcome to Clerk Docs | Clerk](https://clerk.com/docs)
- Pricing: [Pricing | Clerk](https://clerk.com/pricing)
#### Shadcn UI [shadcn/ui](https://ui.shadcn.com/)
Accessible, extendable UI primitives styled with TailwindCSS  (uses RadixUI primitives under the hood).
Shadcn is not a component library. The Shadcn CLI copies the source code for selected components to a specified location, and installs required dependencies, giving us full controll over the components styling. Shadcn is also only a wrapper around RadixUI primitives, adding a minimalistic style to them.
- Documentation: [Introduction - shadcn/ui](https://ui.shadcn.com/docs)

#### Tremor [Tremor – The React library to build dashboards fast](https://www.tremor.so/)
Easy to use and beautifully styled charts and other data visualization components for rapid dashboard development. There are some overlaps in the range of available components with Shadcn. We default to Shadcn components where possible, and use the data visualization capabilities of Tremor.
- Documentation: [Tremor • Docs](https://www.tremor.so/docs/getting-started/installation)

#### TailwindCSS [Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)
- Documentation: [Installation - Tailwind CSS](https://tailwindcss.com/docs/installation)

#### Tanstack Table [TanStack Table | React Table, Solid Table, Svelte Table, Vue Table](https://tanstack.com/table/v8)
- Documentation: [Introduction | TanStack Table Docs](https://tanstack.com/table/v8/docs/guide/introduction)

#### Vercel [Vercel: Develop. Preview. Ship. For the best frontend teams](https://vercel.com/)
Increadibly streamlined hosting for Next with automatic deployments on every push to main, easy rollbacks and staging environments by default.
- Documentation: [Vercel Documentation | Vercel Docs](https://vercel.com/docs)
- Pricing: [Pricing – Vercel](https://vercel.com/pricing)

---

Other dependencies of this project can be found inside the `package.json`. The technologies that are mentioned here, however, have the largest impact on the overall architecture of the application.

# Folder structure
This repository contains a NEXT 13 app at the top level. The app initially was created using create-next-app@latest. Most files outside the `src` directory contain configuration files that are either directly related to NEXT or general dev environment options and standards.

#### /src
The source directory contains all the application logic and presentation code.
It is subdevided into `/app`, `/common`, and `/modules`.
The inner workings of the `app` directory are well documented inside the NEXT documentation ([Building Your Application: Routing | Next.js (nextjs.org)](https://nextjs.org/docs/app/building-your-application/routing)) and will not be discussed in depth in this guide. One thing to note is, however, that the app directory does not contain any not routing related components.

Both the `common` directory and all subdirectories of `modules` should not mix component files (`.tsx`) and pure TypeScript files (`.ts`) at the top level. These directories should rather be subdevided into `/components`, `/server-actions`, `/utils`, `/lib`, `/styles` and so on.

#### /src/common
This directory contains code that is commonly used accross the application or can not be categorized into a standalone module. Reusable, non-module-specific UI components, are located here under `/components`. Database clients, schema definitions, third-party API clients, global styles and other global utils are also located under the `common` directory.

#### /src/modules
To make the application more maintainable, we break it down into modules. A module can contain a specific Feature or a collection of Features that are closely related. We try to avoid coupling between modules. This means module boundaries must be well thought out.

# An iterative approach
We try to avoid overthinking and overengineering, and instead aim to reduce the overhead of making premature decisions that may need to be revised later. This can save time and effort.
It is a misconception that we could think ahead at the beginning of a project and design the perfect database schema, for example, before we know the intricate details and obstacles that lie ahead. It is therefore better not to try to think everything through from the beginning, but to implement only what is currently needed and testable.

# Unstructured Knowledge
In this section, we go a little deeper into some of the topics. Think of it as a loose collection of topics that may be moved to a more structured format in the future. For now, it is a place to quickly document general concepts or conventions without having to worry about the proper context in which to place the information.

#### Data fetching
With NEXT 13 and Server Actions ([Data Fetching: Forms and Mutations | Next.js (nextjs.org)](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)), we see the need for a dedicated API declining. The line between client and server is starting to blur again. Keeping in mind the section [[#An iterative approach]], we will default to using Server Actions, and only move to other ways of fetching data when necessary.

# Foot notes
This documentation is a work in progress and is by no means complete at this stage. Sections may be added at any time.