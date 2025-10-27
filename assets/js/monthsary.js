// Floating hearts animation
function createHeart() {
    const heart = $('<div class="heart"><i class="bi bi-heart-fill"></i></div>');
    heart.css({
        left: Math.random() * 100 + "vw",
        animationDuration: (Math.random() * 3 + 3) + "s"
    });
    $("body").append(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

// Typewriter effect for intro text
const typedText = [
    "Two months of love and happiness ",
    "Every second with you feels special",
    "You are my favorite story, my forever person, my everything."
];

let i = 0, j = 0;
function typeWriter() {
    if (i < typedText.length) {
        if (j < typedText[i].length) {
            $(".typed-text").append(typedText[i].charAt(j));
            j++;
            setTimeout(typeWriter, 60);
        } else {
            j = 0;
            i++;
            setTimeout(() => {
                $(".typed-text").fadeOut(300, function () {
                    $(this).text("").fadeIn(300, typeWriter);
                });
            }, 1500);
        }
    }
}

// Function for typing message inside modal
function playTypingMessage() {
    const message = "Every moment with you feels like a sweet melody under the Italian moon. You make my heart smile, my soul dance, and my world glow brighter with your love. Happy 2nd month of love, bella mia. I’ll keep loving you more with each passing day.";

    let idx = 0;
    const speed = 45;
    const textTarget = $("#typedMessage");
    textTarget.text("");

    function typeNext() {
        if (idx < message.length) {
            textTarget.append(message.charAt(idx));
            idx++;
            setTimeout(typeNext, speed);
        }
    }
    typeNext();
}

$(document).ready(function () {
    typeWriter();
    AOS.init({ duration: 1000, once: true });

    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.5;
    let musicStarted = false;

    // Start music on first user interaction
    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(() => { });
            musicStarted = true;
        }
    }

    $(document).on("click keydown scroll", startMusic);

    // Modal logic
    let modalLoaded = false;
    let loveModal;

    $('#specialButton').on('click', function () {
        if (!modalLoaded) {
            $("#modalContainer").load("assets/modal/monthsary_modal.html", function () {
                loveModal = new bootstrap.Modal(document.getElementById("loveModal"));
                loveModal.show();
                playTypingMessage();
                modalLoaded = true;
            });
        } else {
            loveModal.show();
            playTypingMessage();
        }
    });

    $(document).on('hidden.bs.modal', '#loveModal', function () {
        $('.modal-backdrop').remove();
    });
});
