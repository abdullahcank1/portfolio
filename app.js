import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/* =========================================================
   LOADER
========================================================= */

let progress = 0;

const loader = document.getElementById("loader");
const loaderPercent = document.getElementById("loaderPercent");
const loaderBar = document.getElementById("loaderBar");

const loaderInterval = setInterval(() => {

    progress += Math.random() * 12;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loaderInterval);

        setTimeout(() => {

            loader.classList.add("hidden");

            document.body.classList.add("loaded");

        }, 500);

    }

    loaderPercent.textContent =
        Math.floor(progress);

    loaderBar.style.width =
        `${progress}%`;

}, 120);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});

function updateCursor() {

    cursorX +=
        (mouseX - cursorX) * .18;

    cursorY +=
        (mouseY - cursorY) * .18;

    cursor.style.left =
        `${cursorX}px`;

    cursor.style.top =
        `${cursorY}px`;

    requestAnimationFrame(updateCursor);

}

updateCursor();


/* =========================================================
   CURSOR INTERACTION
========================================================= */

document
    .querySelectorAll(
        "a, button, .project, .magnetic"
    )
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursor.classList.add("active");
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                cursor.classList.remove("active");
            }
        );

    });


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document
    .querySelectorAll(".magnetic")
    .forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * .18}px, ${y * .18}px)`;

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0,0)";

            }
        );

    });


/* =========================================================
   THREE.JS HERO
========================================================= */

const container =
    document.getElementById("heroCanvas");

const scene =
    new THREE.Scene();

scene.fog =
    new THREE.FogExp2(
        0x0a0a0a,
        0.035
    );


/* CAMERA */

const camera =
    new THREE.PerspectiveCamera(
        45,
        container.clientWidth /
        container.clientHeight,
        0.1,
        100
    );

camera.position.set(
    0,
    0,
    7
);


/* RENDERER */

const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.shadowMap.enabled = true;

container.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTS
========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        .35
    );

scene.add(ambientLight);


const greenLight =
    new THREE.PointLight(
        0xd7ff38,
        20,
        15
    );

greenLight.position.set(
    2,
    2,
    3
);

scene.add(greenLight);


const whiteLight =
    new THREE.PointLight(
        0xffffff,
        10,
        12
    );

whiteLight.position.set(
    -3,
    -2,
    2
);

scene.add(whiteLight);


/* =========================================================
   MAIN 3D OBJECT
========================================================= */

const group =
    new THREE.Group();

scene.add(group);


/* TORUS */

const torusGeometry =
    new THREE.TorusKnotGeometry(
        1.35,
        .38,
        180,
        32,
        2,
        3
    );

const torusMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0xd7ff38,

        metalness: .75,

        roughness: .18,

        clearcoat: 1,

        clearcoatRoughness: .15

    });

const torus =
    new THREE.Mesh(
        torusGeometry,
        torusMaterial
    );

group.add(torus);


/* =========================================================
   WIREFRAME SHELL
========================================================= */

const wireGeometry =
    new THREE.IcosahedronGeometry(
        2.1,
        2
    );

const wireMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xffffff,

        wireframe: true,

        transparent: true,

        opacity: .09

    });

const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

group.add(wire);


/* =========================================================
   FLOATING PARTICLES
========================================================= */

const particleCount = 900;

const particleGeometry =
    new THREE.BufferGeometry();

const particlePositions =
    new Float32Array(
        particleCount * 3
    );

for (
    let i = 0;
    i < particleCount;
    i++
) {

    const radius =
        3 + Math.random() * 5;

    const theta =
        Math.random() * Math.PI * 2;

    const phi =
        Math.acos(
            2 * Math.random() - 1
        );

    particlePositions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

    particlePositions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    particlePositions[i * 3 + 2] =
        radius *
        Math.cos(phi);

}

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({

        color: 0xd7ff38,

        size: .018,

        transparent: true,

        opacity: .7

    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);


/* =========================================================
   ORBIT CONTROLS
========================================================= */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableZoom = false;

controls.enablePan = false;

controls.enableDamping = true;

controls.dampingFactor = .04;

controls.autoRotate = true;

controls.autoRotateSpeed = .45;

controls.minPolarAngle =
    Math.PI / 2.8;

controls.maxPolarAngle =
    Math.PI / 1.7;


/* =========================================================
   MOUSE PARALLAX
========================================================= */

let targetRotationX = 0;
let targetRotationY = 0;

window.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth;

        const y =
            event.clientY /
            window.innerHeight;

        targetRotationY =
            (x - .5) * .45;

        targetRotationX =
            (y - .5) * .25;

    }
);


/* =========================================================
   ANIMATION
========================================================= */

const clock =
    new THREE.Clock();

function animate() {

    requestAnimationFrame(
        animate
    );

    const elapsed =
        clock.getElapsedTime();


    torus.rotation.x +=
        .002;

    torus.rotation.y +=
        .003;


    wire.rotation.x =
        elapsed * .04;

    wire.rotation.y =
        elapsed * .06;


    particles.rotation.y =
        elapsed * .015;

    particles.rotation.x =
        Math.sin(elapsed * .1) * .1;


    group.rotation.y +=
        (
            targetRotationY -
            group.rotation.y
        ) * .025;

    group.rotation.x +=
        (
            targetRotationX -
            group.rotation.x
        ) * .025;


    greenLight.position.x =
        Math.sin(elapsed * .7) * 3;

    greenLight.position.y =
        Math.cos(elapsed * .5) * 2;


    controls.update();

    renderer.render(
        scene,
        camera
    );

}

animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }
            );

        },
        {
            threshold: .1
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [

    {
        number: "01",
        title: "NOIR / IDENTITY",
        category: "BRANDING",
        description:
            "Deneysel tipografi, görsel kimlik ve art direction üzerine geliştirilen bir marka kimliği."
    },

    {
        number: "02",
        title: "FRAGMENT",
        category: "POSTER",
        description:
            "Parçalanma, ritim ve tipografik kontrast üzerine oluşturulmuş deneysel poster serisi."
    },

    {
        number: "03",
        title: "DIGITAL VOID",
        category: "DIGITAL",
        description:
            "Dijital boşluk kavramını interaktif görsel dil üzerinden araştıran dijital deneyim."
    },

    {
        number: "04",
        title: "MOVING TYPE",
        category: "MOTION",
        description:
            "Tipografinin hareket, zaman ve ses ile ilişkisini araştıran motion design projesi."
    },

    {
        number: "05",
        title: "FORM / OBJECT",
        category: "ART DIRECTION",
        description:
            "3D form, ışık ve materyal üzerine geliştirilen görsel araştırma."
    },

    {
        number: "06",
        title: "AFTERIMAGE",
        category: "POSTER",
        description:
            "Görüntünün ardında bıraktığı iz fikrinden hareketle oluşturulmuş deneysel tasarım."
    }

];


/* =========================================================
   FILTER SYSTEM
========================================================= */

const filters =
    document.querySelectorAll(
        ".filter"
    );

const projectElements =
    document.querySelectorAll(
        ".project"
    );

const projectCount =
    document.getElementById(
        "projectCount"
    );


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                f =>
                    f.classList
                        .remove("active")
            );

            filter.classList.add(
                "active"
            );

            const category =
                filter.dataset.filter;

            let count = 0;

            projectElements.forEach(
                project => {

                    const matches =
                        category === "all" ||
                        project.dataset.category ===
                            category;

                    if (matches) {

                        project.style.display =
                            "";

                        count++;

                    } else {

                        project.style.display =
                            "none";

                    }

                }
            );

            projectCount.textContent =
                String(count).padStart(
                    2,
                    "0"
                );

        }
    );

});


/* =========================================================
   PROJECT MODAL
========================================================= */

const modal =
    document.getElementById(
        "projectModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalNumber =
    document.getElementById(
        "modalNumber"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );


function openProject(index) {

    const project =
        projects[index];

    modalNumber.textContent =
        project.number;

    modalTitle.textContent =
        project.title;

    modalCategory.textContent =
        project.category;

    modalDescription.textContent =
        project.description;


    const gradients = [

        "radial-gradient(circle at 20% 30%, #d7ff38, transparent 30%), #161616",

        "radial-gradient(circle at 70% 30%, #ff3b30, transparent 35%), #121212",

        "radial-gradient(circle, #7638ff, transparent 40%), #080808",

        "linear-gradient(135deg, #f1f1ed, #777)",

        "radial-gradient(circle, #00e5ff, transparent 30%), #101010",

        "conic-gradient(#ff006e, #7b2cff, #00d4ff, #ff006e)"

    ];

    modalImage.style.background =
        gradients[index];

    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


projectElements.forEach(
    project => {

        project.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        project.dataset.project
                    );

                openProject(index);

            }
        );

    }
);


function closeModal() {

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}

modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {
            closeModal();
        }

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu
                    .classList
                    .remove("active");

            }
        );

    });


/* =========================================================
   PARALLAX ON SCROLL
========================================================= */

let scrollY = 0;

window.addEventListener(
    "scroll",
    () => {

        scrollY =
            window.scrollY;

        const grid =
            document.querySelector(
                ".hero-grid"
            );

        if (grid) {

            grid.style.transform =
                `translateY(${scrollY * .12}px)`;

        }

    },
    {
        passive: true
    }
);
