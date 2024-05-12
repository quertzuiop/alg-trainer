const canvas = document.getElementById('animated-background');
let main = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const ctx = canvas.getContext('2d');
var casesWidth = aside.offsetWidth;
canvas.width = window.innerWidth;
canvas.height = main.scrollHeight;


const particles = [];

function createParticle(x, y) {
    return {
        x,
        y,
        size: Math.random() * 50 + 1,
        heading: Math.random() * Math.PI * 2,
        //speed: Math.random(),
        speed: 1,
        color: ['rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)'][Math.floor(Math.random() * 2)],
    };
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
    //draw center of timer
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(timerX, timerY, 10, 0, Math.PI * 2);
    ctx.fill();
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const mod = (a, n) => a - Math.floor(a/n) * n
function updateParticles() {
    if (casesWidth != aside.offsetWidth && window.innerWidth < 1000) {
        particles.forEach((particle) => {
            particle.x += (aside.offsetWidth - casesWidth) / 2;
        });
        casesWidth = aside.offsetWidth;
    }
    particles.forEach((particle) => {
        particle.x += Math.cos(particle.heading) * particle.speed;
        particle.y += Math.sin(particle.heading) * particle.speed;
        const a = Math.atan2(timerY - particle.y, timerX- particle.x) - particle.heading;
        const angle = mod(a + Math.PI, Math.PI*2) - Math.PI;
        //const angle = Math.atan2(window.innerHeight / 2 - particle.y, window.innerWidth / 2 - particle.x) - particle.heading;
        //console.log(mod(-10, 360), angle * 57.2958, particle.heading * 57.2958);
        particle.heading += angle * 0.0001 * Math.sqrt(Math.pow(timerX - particle.x, 2) + Math.pow(timerY- particle.y, 2));
        particle.heading += Math.random() * 0.2 - 0.1;
        if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
            particle.x = timerX;
            particle.y = timerY;
        }
    });
}
function animate() {
    /*createParticle(window.innerWidth / 2, window.innerHeight / 2);*/
    drawParticles();
    updateParticles();
    setTimeout(animate, 50);
}

function updatePos() {
    let blur = document.querySelector("main", "::before"); 
    console.log(blur);
    canvas.width = window.innerWidth;
    main = document.getElementsByTagName("main")[0];
    console.log(main.scrollHeight);
    canvas.height = main.scrollHeight;
    /*blur.style.height = document.documentElement.scrollHeight + "px";*/   
    [prevX, prevY] = [timerX, timerY];
    targetPos = document.getElementById("timer").getBoundingClientRect();
    timerX = targetPos.left+targetPos.width/2;
    timerY = targetPos.top+targetPos.height/2;
    particles.forEach((particle) => {
        particle.x += timerX - prevX;
        particle.y += timerY - prevY;
    });
    timerPos = targetPos;
}
window.addEventListener('resize', () => {
    updatePos();
});

setTimeout(() => {
    casesWidth = aside.offsetWidth;
    let timerPos = document.getElementById("timer").getBoundingClientRect();
    timerX = timerPos.left+timerPos.width/2;
    timerY = timerPos.top+timerPos.height/2;
    for (let i = 0; i < 30; i++) {
        //particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
        particles.push(createParticle(timerX + Math.random()*200 - 100,timerY + Math.random()*200 - 100));
    }
    animate();
}, 100);
