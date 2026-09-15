document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     THREE.JS
  ================================================== */

  const canvas = document.getElementById("three-bg");

  if (!canvas || typeof THREE === "undefined") {
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.z = 5;


  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );


  /* ==================================================
     PARTICLES
  ================================================== */

  const particleCount = 650;

  const positions =
    new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {

    const index = i * 3;

    positions[index] =
      (Math.random() - 0.5) * 15;

    positions[index + 1] =
      (Math.random() - 0.5) * 10;

    positions[index + 2] =
      (Math.random() - 0.5) * 9;
  }


  const particleGeometry =
    new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  const particleMaterial =
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.35
    });


  const particles =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );

  scene.add(particles);


  /* ==================================================
     WIREFRAME OBJECT
  ================================================== */

  const geometry =
    new THREE.IcosahedronGeometry(
      1.4,
      1
    );

  const material =
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

  const object =
    new THREE.Mesh(
      geometry,
      material
    );

  object.position.set(
    3,
    0.4,
    -1
  );

  scene.add(object);


  /* ==================================================
     MOUSE
  ================================================== */

  const mouse = {
    x: 0,
    y: 0
  };

  window.addEventListener(
    "mousemove",
    (event) => {

      mouse.x =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      mouse.y =
        -(event.clientY /
          window.innerHeight) *
          2 +
        1;

    },
    {
      passive: true
    }
  );


  /* ==================================================
     RESIZE
  ================================================== */

  window.addEventListener(
    "resize",
    () => {

      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

    },
    {
      passive: true
    }
  );


  /* ==================================================
     ANIMATION
  ================================================== */

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );

    const time =
      clock.getElapsedTime();


    particles.rotation.y =
      time * 0.012;

    particles.rotation.x =
      time * 0.004;


    object.rotation.x =
      time * 0.12;

    object.rotation.y =
      time * 0.18;


    object.position.x =
      3 + mouse.x * 0.4;

    object.position.y =
      0.4 + mouse.y * 0.25;


    renderer.render(
      scene,
      camera
    );
  }


  animate();


  /* ==================================================
     SCROLL REVEALS
  ================================================== */

  const revealElements =
    document.querySelectorAll(
      ".glass-card"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.classList.add(
              "revealed"
            );

            revealObserver.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(20px)";

      element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

      revealObserver.observe(
        element
      );

    }
  );


  /* ==================================================
     REVEAL CLASS
  ================================================== */

  const style =
    document.createElement("style");

  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(style);


  /* ==================================================
     SMOOTH INTERNAL LINKS
  ================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute(
              "href"
            );

          const target =
            document.querySelector(
              id
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

        }
      );

    });

});
