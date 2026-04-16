Place site images in this folder.

Files here are served from `/images`. For example:

```tsx
<Image src="/images/profile.jpg" alt="Profile portrait" width={400} height={400} />
```

Project images can also be referenced from `data/projects.ts`:

```ts
image: {
  src: "/images/project-name.jpg",
  alt: "Short description of the project image"
}
```
