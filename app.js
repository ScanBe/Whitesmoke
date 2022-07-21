// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

const navToggleBtn = document.getElementsByClassName("navToggleBtn")[0];
const navbarLinks = document.getElementsByClassName("navLinks")[0];
const navbar = document.getElementsByClassName("navbar");
navbarLinks.classList.add("inactive")

navToggleBtn.addEventListener("click", () => {
    navbarLinks.classList.toggle("inactive");
    navToggleBtn.classList.toggle("openNav")
    if (navbarLinks.classList.contains("inactive")) {
        setTimeout(() => {
            navbarLinks.classList.toggle("active");
        }, 500)
    } else {
        navbarLinks.classList.toggle("active");
    }

});

const header = document.querySelector(".navbar");
const headerHeight = document.querySelector(".navbar").offsetHeight;
let lastScroll = 0;
window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll - lastScroll > 0) {
        header.style.top = "-75px";
    } else {
        header.style.top = "0px";
    }
    lastScroll = currentScroll;
    if (navbarLinks.classList.contains("active")) {
        navbarLinks.classList.add("inactive");

        setTimeout(() => {
            navbarLinks.classList.remove("active");
        }, 500)
    }
    if (navToggleBtn.classList.contains("openNav")) {
        navToggleBtn.classList.toggle("openNav");
    }
})

/* var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementsByClassName("navbar").style.top = "0";
    } else {
        document.getElementsByClassName("navbar").style.top = "-250px";
    }
    prevScrollpos = currentScrollPos;
} */

navToggleBtn.addEventListener("focusout", () => {
    navbarLinks.classList.add("inactive");

    setTimeout(() => {
        navbarLinks.classList.remove("active");
    }, 500)
});

const getContainerHeight = el => {
    return window.getComputedStyle(el).getPropertyValue("height");
};

document.querySelectorAll(".collapsible.slow").forEach(current => {

    let toggler = document.createElement("div");
    let openItem = current;
    let clicker1 = openItem.querySelector(".tagDescription");
    let clicker2 = openItem.querySelector(".tagNotes");
    let copier = openItem.querySelector(".tagName");
    let copyBtn = openItem.querySelector(".copyTagBtn");

    toggler.className = "toggler";
    current.appendChild(toggler);

    current.dataset.initial = getContainerHeight(current);

    current.classList.add("open");
    current.dataset.final = getContainerHeight(current);
    current.classList.remove("open");

    current.style.height = current.dataset.initial;
    current.classList.add("ready");

    function fadeIn(el) {
        el.style.opacity = 0;
        setTimeout(function () {
            el.style.opacity = 0;
            var tick = function () {
                el.style.opacity = +el.style.opacity + 0.05;
                if (+el.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                }
            };
            tick();
        }, 450);
    }

    function grow(el, norm1, new1) {
        if (el.classList.contains("grown")) {
            el.style.borderWidth = `0 0 0 ${norm1}`;
            el.classList.remove("grown");
        } else {
            el.style.borderWidth = `0 0 0 ${new1}`;
            el.classList.add("grown");
        }
    }

    function shrink(el, norm1, new1) {
        if (el.classList.contains("grown")) {
            el.style.borderWidth = `0 0 0 ${norm1}`;
            el.classList.remove("grown");
        } else {
            el.style.borderWidth = `0 0 0 ${new1}`;
            el.classList.add("grown");
        }
    }

    function blink(e) {
        e.classList.add("fade");
        setTimeout(() => {
            e.classList.remove("fade");
        }, 200);
    }

    toggler.addEventListener("click", e => {
        current.style.height = current.classList.toggle("open") ? current.dataset.final : current.dataset.initial;
        copyBtn.classList.toggle("hidden");
        fadeIn(copyBtn);
        grow(copier, "8px", "33px");
    }, false);

    clicker1.addEventListener("click", e => {
        current.style.height = current.classList.toggle("open") ? current.dataset.final : current.dataset.initial;
        copyBtn.classList.toggle("hidden");
        fadeIn(copyBtn);
        grow(copier, "8px", "33px");
    }, false);

    clicker2.addEventListener("click", e => {
        current.style.height = current.classList.toggle("open") ? current.dataset.final : current.dataset.initial;
        copyBtn.classList.toggle("hidden");
        fadeIn(copyBtn);
        grow(copier, "8px", "33px");
    }, false);

    copyBtn.addEventListener("click", e => {
        navigator.clipboard.writeText(copier.textContent.trim());
        blink(copier);
        /*         const text = copier;
                const stringText = text.textContent;
                const splitText = stringText.split("");
                text.textContent = "";
        
                for (let i = 0; i < splitText.length; i++) {
                    text.innerHTML += "<span>" + splitText[i] + "</span>";
                }
                let char = 0;
                let timer = setInterval(onTick);
        
                function onTick() {
                    const span = text.querySelectorAll("span")[char];
                    span.classList.add("fade");
                    char++;
                    if (char === splitText.length) {
                        complete();
                        return;
                    }
                }
        
                let char2 = 0;
                let timer2 = setInterval(onTick2, 25);
        
                function onTick2() {
                    const span = text.querySelectorAll("span")[char2];
                    span.classList.remove("fade");
                    char2++;
                    if (char2 === splitText.length) {
                        complete2();
                        return;
                    }
                }
        
                function complete() {
                    clearInterval(timer);;
                    timer = null;
                }
        
                function complete2() {
                    clearInterval(timer2);;
                    timer2 = null;
                } */
    }, false);
});



const notesContainer = document.getElementById("app");
const addNoteBtn = notesContainer.querySelector(".addNotes");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content, note.content2);
    notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content, content2) {
    const container = document.createElement("div");
    const title = document.createElement("input");
    const element = document.createElement("textarea");
    const delBtn = document.createElement("button");

    title.type = "text";
    title.classList.add("noteTitle");
    title.value = content2;
    title.placeholder = "Title...";

    element.classList.add("noteContent");
    element.value = content;
    element.placeholder = "New Note...";

    container.addEventListener("change", () => {
        updateNote(id, element.value, title.value);
    });

    delBtn.addEventListener("focusout", () => {
        if (delBtn.classList.contains("confirmDel")) {
            delBtn.classList.toggle("confirmDel");
        };
    })

    delBtn.classList.add("deleteBtn");

    delBtn.addEventListener("click", () => {
        delBtn.classList.toggle("confirmDel")
        if (!delBtn.classList.contains("confirmDel")) {
            deleteNote(id, container);
        };
    });

    container.classList.add("note");

    container.appendChild(title);
    container.appendChild(element);
    container.appendChild(delBtn);

    return container;
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        content2: ""
    };

    const noteElement = createNoteElement(noteObj.id, noteObj.content, noteObj.content2);
    notesContainer.insertBefore(noteElement, addNoteBtn);

    notes.push(noteObj);
    saveNotes(notes);
}

function updateNote(id, newContent, newContent2) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    targetNote.content2 = newContent2;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}

