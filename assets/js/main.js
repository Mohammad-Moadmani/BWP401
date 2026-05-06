/* Events detals */

const events = [
    {
        id: 1,
        title: "مبادرة ضوء LIGHT INITIATIVE ",
        date: "2026-05-20",
        time: "18:00",
        category: "music",
        location: "القاعة  A",
        image: "assets/img/FB.jpg",
        gallery: ["", "", ""],
        description: "",
        map: ""
    },
    {
        id: 2,
        title: "المسابقة البرمجية للكليات",
        date: "2026-05-22",
        time: "14:00",
        category: "technology",
        location: "مختبر التقنية",
        image: "assets/img/ICPCL.png",
        gallery: ["", ""],
        description: "تعتبر المسابقة الدولية البرمجية للطلاب الجامعيين ICPC مسابقة البرمجة الأولى التي تنظمها الجامعات على المستوى العالمي.",
        map: ""
    },
    {
        id: 3,
        title: " برنامج التدريب البرمجي للأطفال واليافعين KPT",
        date: "2026-05-25",
        time: "10:00",
        category: "family",
        location: "الساحة الرئيسية",
        image: "assets/img/KPT.png",
        gallery: ["", "", ""],
        description: "فعاليات ممتعة لجميع أفراد العائلة.",
        map: ""
    },
    {
        id: 4,
        title: "سباق الجري",
        date: "2026-05-28",
        time: "08:00",
        category: "sports",
        location: "الملعب ",
        image: "",
        gallery: ["", ""],
        description: "سباق جري لجميع طلاب الجامعة الافتراضية.",
        map: ""
    },
    {
        id: 5,
        title: "معرض الثقافة",
        date: "2026-06-01",
        time: "12:00",
        category: "culture",
        location: "قاعة المعارض",
        image: "",
        gallery: ["", "", ""],
        description: "معرض ثقافي يعرض أعمال الطلاب الفنية.",
        map: ""
    },
    {
        id: 6,
        title: "مؤتمر التقنية",
        date: "2026-06-05",
        time: "09:00",
        category: "technology",
        location: "القاعة الكبرى",
        image: "",
        gallery: ["", ""],
        description: "مؤتمر تقني يستضيف خبراء في مجال التكنولوجيا.",
        map: ""
    }
];

/* top events slier */

function loadHeroSlider() {
    const container = document.getElementById("heroSlides");
    if (!container) return;

    let html = "";

    events.slice(0, 3).forEach((event, index) => {
        html += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${event.image}" class="d-block w-100" alt="">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${event.title}</h5>
                    <p>${event.date} - ${event.location}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/* Categories */

function loadCategories() {
    const container = document.getElementById("categoriesContainer");
    if (!container) return;

    const categories = [
        { id: "music", name: "موسيقى" },
        { id: "sports", name: "رياضة" },
        { id: "culture", name: "ثقافة" },
        { id: "family", name: "عائلي" },
        { id: "technology", name: "تقنية" }
    ];

    let html = "";

    categories.forEach(cat => {
        html += `
            <div class="col-md-2 col-6 mb-3">
                <a href="events.html?category=${cat.id}" class="text-decoration-none text-dark">
                    <div class="card p-3 text-center">
                        <h6 class="fw-bold">${cat.name}</h6>
                    </div>
                </a>
            </div>
        `;
    });

    container.innerHTML = html;
}



/* latest events  */

function loadLatestEvents() {
    const container = document.getElementById("latestEvents");
    if (!container) return;

    let html = "";

    events.slice(0, 3).forEach(event => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${event.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="fw-bold">${event.title}</h5>
                        <p class="text-muted small">${event.date} - ${event.location}</p>
                        <a href="event.html?id=${event.id}" class="btn btn-primary btn-sm">عرض التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/* all events page */

function loadAllEvents() {
    const container = document.getElementById("eventsContainer");
    if (!container) return;

    let html = "";

    events.forEach(event => {
        html += `
            <div class="col-md-4 mb-4 event-card" data-category="${event.category}" data-date="${event.date}">
                <div class="card">
                    <img src="${event.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="fw-bold">${event.title}</h5>
                        <p class="text-muted small">${event.date} - ${event.location}</p>
                        <a href="event.html?id=${event.id}" class="btn btn-primary btn-sm">عرض التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/* filters fot events page  */

function applyFilters() {
    const search = document.getElementById("searchInput")?.value.toLowerCase();
    const category = document.getElementById("categoryFilter")?.value;
    const date = document.getElementById("dateFilter")?.value;

    const cards = document.querySelectorAll(".event-card");
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector("h5").innerText.toLowerCase();
        const cardCategory = card.dataset.category;
        const cardDate = card.dataset.date;

        let show = true;

        if (search && !title.includes(search)) show = false;
        if (category && category !== cardCategory) show = false;
        if (date && date !== cardDate) show = false;

        card.style.display = show ? "block" : "none";
        if (show) visibleCount++;
    });

    document.getElementById("noEvents").style.display = visibleCount === 0 ? "block" : "none";
}

/* data loading for events page  */

function loadEventDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    if (!id) return;

    const event = events.find(e => e.id === id);
    if (!event) return;

    document.getElementById("eventTitle").innerText = event.title;
    document.getElementById("eventShortInfo").innerText = `${event.date} - ${event.location}`;
    document.getElementById("eventImage").src = event.image;
    document.getElementById("eventDescription").innerText = event.description;
    document.getElementById("eventDate").innerText = event.date;
    document.getElementById("eventTime").innerText = event.time;
    document.getElementById("eventLocation").innerText = event.location;
    document.getElementById("eventCategory").innerText = event.category;
    document.getElementById("eventMap").src = event.map;

    // gallery for event  
    let galleryHTML = "";
    event.gallery.forEach(img => {
        galleryHTML += `
            <div class="col-4">
                <img src="${img}" class="img-fluid rounded" alt="">
            </div>
        `;
    });
    document.getElementById("eventGallery").innerHTML = galleryHTML;

    // filter result
    const related = events.filter(e => e.category === event.category && e.id !== id);
    let relatedHTML = "";

    related.forEach(e => {
        relatedHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${e.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h6 class="fw-bold">${e.title}</h6>
                        <a href="event.html?id=${e.id}" class="btn btn-primary btn-sm">عرض التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("relatedEvents").innerHTML = relatedHTML;
}

/* contact us page  */

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const first = document.getElementById("firstName");
        const last = document.getElementById("lastName");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let valid = true;

        if (!first.value.trim()) { first.classList.add("is-invalid"); valid = false; }
        else first.classList.remove("is-invalid");

        if (!last.value.trim()) { last.classList.add("is-invalid"); valid = false; }
        else last.classList.remove("is-invalid");

        if (!email.value.includes("@")) { email.classList.add("is-invalid"); valid = false; }
        else email.classList.remove("is-invalid");

        if (!subject.value) { subject.classList.add("is-invalid"); valid = false; }
        else subject.classList.remove("is-invalid");

        if (!message.value.trim()) { message.classList.add("is-invalid"); valid = false; }
        else message.classList.remove("is-invalid");

        const alertBox = document.getElementById("alertContainer");

        if (!valid) {
            alertBox.innerHTML = `
                <div class="alert alert-danger">الرجاء تعبئة جميع الحقول بشكل صحيح</div>
            `;
            return;
        }

        alertBox.innerHTML = `
            <div class="alert alert-success">تم إرسال الرسالة بنجاح</div>
        `;

        form.reset();
    });
}

/* ran function for all pages*/

document.addEventListener("DOMContentLoaded", () => {

    loadHeroSlider();
    loadCategories();
    loadLatestEvents();
    loadAllEvents();
    loadEventDetails();
    initContactForm();


    const params = new URLSearchParams(window.location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL) {
        const categorySelect = document.getElementById("categoryFilter");
        if (categorySelect) {
            categorySelect.value = categoryFromURL;
            applyFilters();
        }
    }


    document.getElementById("searchInput")?.addEventListener("input", applyFilters);
    document.getElementById("categoryFilter")?.addEventListener("change", applyFilters);
    document.getElementById("dateFilter")?.addEventListener("change", applyFilters);
    document.getElementById("clearFilters")?.addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("categoryFilter").value = "";
        document.getElementById("dateFilter").value = "";
        applyFilters();
    });
});
