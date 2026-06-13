let images = [];

function getRandomImageUrl() {
    const image = images[Math.floor(Math.random() * images.length)];

    return (
        "https://raw.githubusercontent.com/RetroFries/Reaction-Pics/main/" +
        encodeURIComponent(image.path).replace(/%2F/g, "/")
    );
}

function rollImage(imgElement) {
    let rolls = 15;
    let delay = 10;

    function roll() {
        imgElement.src = getRandomImageUrl();

        rolls--;

        if (rolls > 0) {
            delay += 15;
            setTimeout(roll, delay);
        } else {
            imgElement.src = getRandomImageUrl();
        }
    }

    roll();
}

function rollAllImages() {
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`showcase${i}`);
        if (img) rollImage(img);
    }
}

// Load repo + initialize
fetch("https://api.github.com/repos/RetroFries/Reaction-Pics/git/trees/main?recursive=1")
    .then(r => r.json())
    .then(data => {

        images = data.tree.filter(f =>
            f.type === "blob" &&
            /\.(png|jpg|jpeg|gif|webp)$/i.test(f.path)
        );

        document.getElementById("image-count").textContent = images.length;

        // initial roll on load
        rollAllImages();
    })
    .catch(err => console.error("Failed to load image list:", err));