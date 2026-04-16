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
    slug: "exploring-concussions",
    title: "Inside the Mind",
    year: "2024",
    summary: 
      "An immersive simulation of the SCAT-6 concussion evaluation protocol, used to teach \
            students how to evaluate athletes who may have suffered a concussion. Designed \
            to run on Oculus 2 headsets. The video features some mocap clips that I 'acted' for!",
    stack: ["Unreal Engine 5", "Cascadeur"],
    links: {
      video: "https://www.youtube.com/watch?v=I5n8PS4zB2M"
    },
    image: {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
      alt: "A video featuring the Exploring Concussions project"
    },
  },
  {
    slug: "grater",
    title: "Grater",
    year: "2024",
    summary:
      "A bespoke C++ game engine with support and integration for Lua scripting, 2D graphics with SDL, \
										Box2D for realistic 2D physics, and ASIO for online multiplayer networking.",
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
