$(document).ready(function () {
    // loaded

    // fake loading
    $(".progress-bar").animate({
        width: "50vw"
    }, 5000, () => {
        // to do when fake loading is finish
        $(".preloader").addClass("hidden");
        setTimeout(() => {
            $(".preloader").addClass("none");

        }, 1000);
        $(".particles").css({
            "opacity": "0.2",
            "z-index": 100
        });

        $(".particles").css({
            "opacity": "0.2"
        });

        // face
        $(window).mousemove(function (event) {
            let x = event.pageX;
            let y = event.pageY;

            setEyePositionByCursor(x, y);
        });
        // eye click
        $(".eye-balls").click(function () {
            alert();
        });

        // left hover panel

        $(".hover-left-panel").hover(function () {
            // slide up/down progress bar
            $(".progress-bar-vertical").toggleClass("showen");

            // slide right/back stack menu sticks
            $(".hovered-panel").toggleClass("visible");

            $(".stack-menu").toggleClass("slided");

            $(".exploreTitle").toggleClass("hidden");


        });

        $("a").hover(function () {
            $(this).toggleClass("hovered");

        });

        let contactsShown = false;
        // contacts
        $(".contacts-show-button").click(function () {
            switchFace();

            if (contactsShown) {
                $(".contacts").toggleClass("hidden");
                setTimeout(() => {
                    $(".contacts").toggleClass("none");
                    contactsShown = false;
                }, 1000);

            } else {
                $(".contacts").toggleClass("none");

                setTimeout(() => {
                    $(".contacts").toggleClass("hidden");
                    contactsShown = true;
                }, 500);
            }

        });
        var isLastWasUp;
        var prevScrollCount = 0;
        $(document.body).bind("mousewheel", function (e) {

            let isScrollUp = e.originalEvent.wheelDelta > 0;
            switch (isScrollUp) {
                case false: {
                    if (isLastWasUp == true) {
                        prevScrollCount++;
                        if (prevScrollCount >= 3) {
                            showBio();
                            prevScrollCount = 0;

                        }
                    } else {
                        prevScrollCount = 0;
                        isLastWasUp = true;
                    }
                    break;
                }
                case true: {
                    if (isLastWasUp == false) {
                        prevScrollCount++;
                        if (prevScrollCount >= 3) {
                            hideBio();
                            prevScrollCount = 0;

                        }
                    } else {
                        prevScrollCount = 0;
                        isLastWasUp = false;
                    }
                    break;
                }
            }
        });

        $(".selector").click(function () {
            $(".selector").removeClass("current");
            $(this).addClass("current");
            let comment = $(this).data("comment");
            let author = $(this).data("author");
            $(".comment").fadeOut(400, function () {
                $(".comment").text(comment);
                $(".comment").fadeIn(400);
            });
            $(".author").fadeOut(400, function () {
                $(".author").text(author);
                $(".author").fadeIn(400);
            });
        });

        setInterval(blinkEyes, 5000);

        startSpeech();
    });



});

function blinkEyes() {
    switchFace();
    setTimeout(switchFace, 700);
}

function setEyePositionByCursor(x, y) {
    let pageW = $(document).width();
    let pageH = $(document).height();
    $(".eye-balls").css({
        "left": `${(((x - (pageW/2)))/(pageW/16))*2}px`,
        "top": `${((y - (pageH/2))/(pageH/20))*2}px`,
    });
}
let vocab = [
    "Howdy!",
    "I am Mon-Ika Mk2",
    "My author is corporation (c)Devlonic (Max Holdun)",
    "Have a nice trip ^_^",
];

function startSpeech() {
    let c = 0;
    vocab.forEach((tense) => {
        printTense(tense, c++ != vocab.length - 1);

    });
}
let x = 0;

function printTense(t, isEraseTimeout) {
    let tb = $(".speech");

    for (let i = 0; i < t.length; i++) {
        const s = t[i];

        setTimeout(() => {
            // remove "|"
            let prev = tb.text();
            let p = prev.substring(0, prev.length - 1);
            let res = p + s + '|';
            tb.text(res);
        }, x += 100);
    }
    if (isEraseTimeout) {
        setTimeout(() => {
            tb.text("");
        }, x += 2000);
    }

}

function switchFace() {
    $(".eye-lids").toggleClass("hidden");
}

let bioStatus = false;

function showBio() {
    if (bioStatus)
        return;
    switchFace();
    $(".bio").toggleClass("hidden");

    bioStatus = true;
}

function hideBio() {
    if (!bioStatus)
        return;
    switchFace();
    $(".bio").toggleClass("hidden");
    bioStatus = false;

}