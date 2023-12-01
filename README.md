
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
    <a href="https://boids-gt1.vercel.app/">Live Demo</a>
    ·
    <a href="https://typst.app/project/raPr6DOusWCrubeP9PTGQg">View Report</a>

  </p>
</div>

## About The Project

<p align="center">
  <img src="https://boids-gt1.vercel.app/demo.gif" alt="demo" width="500" height="auto">
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
│   │   ├── MyCanvas.tsx
│   │   ├── BoidsRenderer.tsx
│   │   │   ├── useFrame (update per frame)
# UI part
│   │   ├── ControlPanel.tsx
# Logic part
│   ├── models
│   │   ├── Bird
│   │   │   ├── index.ts
│   │   ├── Predator
│   │   │   ├── index.ts
│   │   ├── Obstacle
│   │   │   ├── index.ts
│   │   ├── Rule
│   │   │   ├── index.ts (Rule Base Class)
│   │   │   ├── Basic
│   │   │   │   ├── Alignment.ts
│   │   │   │   ├── Cohesion.ts
│   │   │   │   ├── Separation.ts
│   │   │   ├── Extented
│   │   │   │   ├── AvoidPredator.ts
│   │   │   │   ├── AvoidObstacles.ts
# State Management
│   ├── hooks
│   │   ├── useBoidsConfig.tsx
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

* Logic Part
  * [x] Three basic rules
    * [x] Alignment
    * [x] Cohesion
    * [x] Separation
  * [x] Boundless or Bouce off edge
  * [x] Speed limit
  * [x] Additional rules
    * [x] Direction noise
    * [x] Avoid Predator
    * [x] Avoid Obstacle
    * [ ] Goal setting
  * [x] Predator/Prey Model
    * [x] Single Predator
    * [x] Multiple Predators
    * [ ] Energy Model
      * [ ] for predator, starvation makes it more aggressive
      * [ ] for prey, starvation makes it more likely to be caught
      * [ ] for prey, perching occasionally to rest and regain energy

* Rendering part
  * [x] Use InstancedMesh and shared material to render boids (reduce draw calls)

* More interative
  * [x] Adjust config through UI
  * [x] Next Frame button
  * [x] Soft Refresh
  * [x] Drag to move obstacle
  * [ ] Mouse click concentration

* Data/Simulation Analysis
  * [ ] Simulate "Flocking" behavior with different rule weights
  * [ ] Simulate "Avoid Predator" rule
  * [ ] Simulate "Avoid Obstacle" rule
  * [ ] How to measure the number of flocks
  * [ ] Track the number of flocks over time
  * [ ] Track the number of boids in each flock over time
  * [ ] Track the alive rate of boids when a predator is present over time given birds flock or not

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact

Molin Deng - [@molin](https://molin7.vercel.app/) - <mdeng47@gatech.edu>

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
