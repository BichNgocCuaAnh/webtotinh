document.addEventListener("DOMContentLoaded", () => {

    // ===== DOM =====
    const startBtn = document.getElementById("startBtn");
    const startScreen = document.getElementById("startScreen");
    const typingEl = document.getElementById("typing");
    const buttons = document.getElementById("buttons");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const result = document.getElementById("result");
    const music = document.getElementById("music");
    const typingSound = document.getElementById("typingSound");

    // ===== TEXT =====
    const text = "Anh đã suy nghĩ rất lâu...\nVà anh nhận ra một điều:\n\nAnh iu em rấttt rấtttt nhìuuuuu 💖\n\nEm có đồng ý làm vợ anh hong?";

    let started = false;
    let i = 0;
    
    startBtn.addEventListener("click", () => {

    typingSound.play().catch(() => {});
    typingSound.pause();
    typingSound.currentTime = 0;

    // ẩn màn start
    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none";
    }, 400);

    // bắt đầu web
    typeWriter();
});


    function startTypingSound() {
        if (!started) {
            started = true;

            typingSound.currentTime = 0; // reset sound về đầu
            typingSound.play().catch(() => {
                document.addEventListener("click", () => {
                    typingSound.play();
                }, { once: true });
            });

            requestAnimationFrame(typeWriter)
        }
    }

    function stopTypingSound() {
        typingSound.pause();
        typingSound.currentTime = 0;
    }

    // ===== TYPEWRITER =====
    function typeWriter() {

        if (i < text.length) {

            const char = text.charAt(i);

            // ✍️ in chữ
            typingEl.innerHTML += (char === "\n") ? "<br>" : char;
            if (i === 0) {
                startTypingSound();
            }          

            i++;
            
            setTimeout(typeWriter, 80);
            

         } else {
                stopTypingSound();
            setTimeout(() => {
                buttons.classList.add("show");
            }, 300);
        }
    }


    // ===== RUNG =====
    function vibrate() {
        if (navigator.vibrate) navigator.vibrate(50);
    }

    // ===== SCALE BUTTON =====
    let yesScale = 1;
    let noScale = 1;

    noBtn.addEventListener("click", () => {
        vibrate();

        noScale *= 0.95;
        yesScale *= 1.05;

        noBtn.style.transform = `scale(${noScale})`;
        yesBtn.style.transform = `scale(${yesScale})`;
    });

    yesBtn.addEventListener("click", () => {
        vibrate();

        buttons.style.display = "none";
        result.style.display = "block";

        music.play().catch(() => {});

        setInterval(createHeart, 100);
    });

    // ===== HEART EFFECT =====
    function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";

        const duration = Math.random() * 3 + 3;
        heart.style.animationDuration = duration + "s";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    setInterval(createHeart, 300);

});