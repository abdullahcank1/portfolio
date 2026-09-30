/* =====================================================
   ABDULLAH CANKI — PORTFOLIO SYSTEM
===================================================== */


/* =====================================================
   PROJECT DATA
===================================================== */

const projects = [

    {
        number: "01",
        title: "NØIR",
        category: "BRAND IDENTITY / ART DIRECTION",
        tools: "Illustrator / Photoshop",
        description:
            "Gece kültürü, moda ve çağdaş görsel iletişim dili üzerinden geliştirilen deneysel marka kimliği. Tipografi, renk ve atmosfer üzerinden güçlü bir görsel sistem oluşturuldu.",
        visual: "visual-01"
    },

    {
        number: "02",
        title: "TYPE / 01",
        category: "EXPERIMENTAL TYPOGRAPHY",
        tools: "Illustrator / Photoshop",
        description:
            "Tipografinin yalnızca okunabilir bir metin değil, aynı zamanda görsel bir form olarak ele alındığı deneysel poster çalışması.",
        visual: "visual-02"
    },

    {
        number: "03",
        title: "DIGITAL VOID",
        category: "INTERACTIVE DESIGN",
        tools: "HTML / CSS / JavaScript",
        description:
            "Dijital boşluk, ışık, hareket ve kullanıcı etkileşimi kavramlarını araştıran deneysel dijital tasarım çalışması.",
        visual: "visual-03"
    },

    {
        number: "04",
        title: "MOTION TYPE",
        category: "MOTION / KINETIC TYPOGRAPHY",
        tools: "After Effects / Illustrator",
        description:
            "Tipografinin zaman içerisinde nasıl davranabileceğini araştıran kinetik tipografi ve motion design çalışması.",
        visual: "visual-04"
    },

    {
        number: "05",
        title: "OBJECT / 03",
        category: "3D / ART DIRECTION",
        tools: "Blender / Photoshop",
        description:
            "Soyut geometri, ışık, materyal ve kompozisyon üzerine gerçekleştirilen deneysel 3D görsel araştırma.",
        visual: "visual-05"
    },

    {
        number: "06",
        title: "AFTERIMAGE",
        category: "EXPERIMENTAL POSTER",
        tools: "Photoshop / Illustrator",
        description:
            "Görüntünün zihinde bıraktığı izden yola çıkan deneysel tipografi ve poster serisi.",
        visual: "visual-06"
    }

];


/* =====================================================
   CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");


let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

    followerX +=
        (mouseX - followerX) * 0.12;

    followerY +=
        (mouseY - followerY) * 0.12;

    follower.style.left =
        `${followerX}px`;

    follower.style.top =
        `${followerY}px`;

    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =====================================================
   CURSOR INTERACTION
===================================================== */

document
    .querySelectorAll("a, button, .project")
    .forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                follower.style.width = "55px";
                follower.style.height = "55px";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                follower.style.width = "34px";
                follower.style.height = "34px";

            }
        );

    });


/* =====================================================
   PROJECT MODAL
===================================================== */

const modal =
    document.getElementById(
        "projectModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalMeta =
    document.getElementById(
        "modalMeta"
    );


const modalVisual =
    document.getElementById(
        "modalVisual"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalTools =
    document.getElementById(
        "modalTools"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


document
    .querySelectorAll(".project")
    .forEach((project) => {

        project.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        project.dataset.project
                    );


                const data =
                    projects[index];


                modalMeta.textContent =
                    `PROJECT / ${data.number}`;


                modalTitle.textContent =
                    data.title;


                modalCategory.textContent =
                    data.category;


                modalTools.textContent =
                    data.tools;


                modalDescription.textContent =
                    data.description;


                modalVisual.className =
                    `modal-visual ${data.visual}`;


                modal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


function closeModal() {

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

document
    .querySelectorAll(".email, .explore")
    .forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * .12}px, ${y * .12}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


/* =====================================================
   HERO PARALLAX
===================================================== */

const orb =
    document.querySelector(".orb-area");


window.addEventListener(
    "mousemove",
    (event) => {

        if (!orb) return;


        const x =
            (event.clientX /
            window.innerWidth -
            .5);


        const y =
            (event.clientY /
            window.innerHeight -
            .5);


        orb.style.transform =
            `translate(${x * 20}px, ${y * 20}px)`;

    }
);


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealItems =
    document.querySelectorAll(
        ".project, .skill, .process-grid > div"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealItems.forEach(
    (item) => {

        observer.observe(item);

    }
);


/* =====================================================
   PROJECT IMAGE TILT
===================================================== */

document
    .querySelectorAll(".project-visual")
    .forEach((visual) => {

        visual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) -
                    .5) * -5;


                const rotateY =
                    ((x / rect.width) -
                    .5) * 5;


                visual.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(.99)`;

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                visual.style.transform =
                    "";

            }
        );

    });


/* =====================================================
   CONSOLE SIGNATURE
===================================================== */

console.log(
`
╔══════════════════════════════╗
║                              ║
║       ABDULLAH CANKI         ║
║       AC / 2026              ║
║                              ║
║   VISUAL COMMUNICATION       ║
║   DESIGN PORTFOLIO           ║
║                              ║
╚══════════════════════════════╝
`
);
