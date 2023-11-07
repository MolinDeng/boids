
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Boids Simulation</h3>

  <p align="center">
    Georgia Tech CSE 6730 Fall-2023 Modeling and Simulation Project
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <br />
    <a href="https://boids-gt.vercel.app/">Live Demo</a>
    ·
    <a href="https://typst.app/project/raPr6DOusWCrubeP9PTGQg">View Report</a>

  </p>
</div>

## About The Project

<p align="center">
  <img src="https://boids-gt.vercel.app/demo.gif" alt="demo" width="500" height="auto">
</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TS-url]
* [![ReactThreeFiber][ReactThreeFiber]][R3F-url]
* [![ThreeJS][ThreeJS]][ThreeJS-url]

### File Structure

```bash
.
├── src
# Render part
│   ├── components
│   │   ├── BoidCanvas.tsx
│   │   ├── BoidsRenderer.tsx
# UI part
│   │   ├── ToolMenu.tsx
# Logic part
│   ├── models
│   │   ├── Bird
│   │   │   ├── index.ts
│   │   ├── Rule
│   │   │   ├── Basic
│   │   │   │   ├── index.ts
│   │   │   │   ├── Alignment.ts
│   │   │   │   ├── Cohesion.ts
│   │   │   │   ├── Separation.ts
│   │   │   ├── Extented
│   │   │   │   ├── TODO
```

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

* Logic Part
  * [x] Three basic rules
    * [x] Alignment
    * [x] Cohesion
    * [x] Separation
  * [ ] Adjust config through UI (doing now)
  * [ ] Additional rules (doing now)
    * [x] Direction noise
    * [ ] Velocity noise
  * [ ] Energy Model
  * [ ] Predator/Prey Model

* Rendering part
  * [x] Use InstancedMesh to render boids (reduce draw calls)

* More interative
  * [ ] Mouse click concentration
  * [x] Next Frame button

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact (TODO)

Your Name - [@your_twitter](https://twitter.com/your_username) - <email@example.com>

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

## Acknowledgments (TODO)

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

## Useful Links

* <https://github.com/pmndrs/react-three-fiber/discussions/857>
* <https://codesandbox.io/s/r3f-floating-diamonds-prb9t?file=/src/App.js:1796-1804> InstancedMesh example

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[ReactThreeFiber]: https://img.shields.io/badge/React%20Three%20Fiber-000000?style=for-the-badge&logo=react&logoColor=white
[R3F-url]: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
[ThreeJS]: https://img.shields.io/badge/ThreeJS-black?style=for-the-badge&logo=three.js&logoColor=white
[ThreeJS-url]: https://threejs.org/
