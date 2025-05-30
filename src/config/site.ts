export type SiteConfig = typeof siteConfig;

export const siteConfig = {

  name: "Convocatorias",
  description: "Convocatorias SENA",
  navItems: [
    {
      label: "Iniciar Sesión",
      href: "/",
    },
    {
      label: "Registrarse",
      href: "/register",
    },

  ],
  navMenuItems: [
    {
      label: "Iniciar Sesión",
      href: "/",
    },
    {
      label: "Registrarse",
      href: "/register",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};