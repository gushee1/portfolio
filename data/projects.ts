import { NextBuildContext } from "next/dist/build/build-context";

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  links: {
    repo?:  string;
    demo?:  string;
    site?:  string;
    video?: string;
    play?:  string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export const projects: Project[] = [
  {
    slug: "just-nil",
    title: "JustNIL",
    year: "2026",
    summary: 
      "A platform intended to match student talent with small businesses looking to sponsor NIL partnerships.",
    stack: ["next.js", "coding agents"],
    links: {
      site: "https://justnil.org"
    },
    image: {
      src: "/images/JustNIL_logo_no_text.png",
      alt: "The JustNIL logo"
    }
  },
  {
    slug: "exploring-concussions",
    title: "Inside the Mind",
    year: "2024",
    summary: 
      "An immersive VR simulation designed to teach students to administer the SCAT-6 concussion \
            evaluation protocol. In addition to development, I did some voice and mocap acting for this project!",
    stack: ["Unreal Engine 5", "Cascadeur"],
    links: {
      video: "https://www.youtube.com/watch?v=I5n8PS4zB2M"
    },
    image: {
      src: "/images/exploring_concussions.gif",
      alt: "A video featuring the Exploring Concussions project"
    },
  },
  {
    slug: "grater",
    title: "Grater",
    year: "2024",
    summary:
      "A bespoke C++ game engine with support and integration for Lua scripting, 2D graphics with SDL, \
										and Box2D for realistic 2D physics",
    stack: ["C++", "Lua", "SDL", "Box2D"],
    links: {
      repo: "https://github.com/gushee1/grater",
    },
    image: {
      src: "/images/grater_logo.png",
      alt: "A quiet desk with notebooks and a laptop."
    },
  },
  {
    slug: "wisp",
    title: "Wisp",
    year: "2023",
    summary:
      "A 3D horror adventure game where the player must escape an abandoned dormitory \
										 armed only with a versatile lighter.",
    stack: ["Unity3D", "C#", "ProBuilder"],
    links: {
      play: "https://ajbyrd.itch.io/wisp",
    },
    image: {
      src: "/images/wisp_gif.gif",
      alt: "A gif showing one of the first scenes from WISP."
    },
  },
];
