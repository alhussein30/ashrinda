(() => {
  const B = {
    wa: "201142947747", phone: "01153020799", shown: "011 5302 0799",
    ig: "https://www.instagram.com/ashrinda_store/",
    faqs: [
      ["المنتجات أصلية؟", "أيوه، كل منتجات ASHRINDA® تصنيع مصري أصلي 100%، برقم ضريبي رسمي."],
      ["بتوصّلوا لكل المحافظات؟", "أيوه، بنشحن لكل محافظات مصر عن طريق شركات الشحن."],
      ["عندكم منتجات للرجال؟", "أيوه، عندنا تشكيلة Men Body Splash وغيرها."],
      ["إزاي أطلب؟", "ابعتيلنا على واتساب أو من الفورم في الصفحة دي، وهنأكد معاكي التفاصيل."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايزة أسأل عن منتجاتكم";

  ["#hdWa", "#navWa", "#heroWa", "#dWa"].forEach((s) => ($(s).href = wa(hello)));
  ["#heroIg", "#dIg", "#fIg"].forEach((s) => ($(s).href = B.ig));
  $("#tel").href = "tel:" + B.phone; $("#tel").textContent = B.shown;
  $("#telWa").href = wa(hello); $("#telWa").textContent = "+20 11 4294 7747";
  $("#ig").href = B.ig; $("#ig").textContent = "@ashrinda_store";
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");

  $$(".order-btn").forEach((b) => b.addEventListener("click", () => {
    window.open(wa(`أهلاً، عايزة أطلب: ${b.dataset.p}`), "_blank", "noopener");
  }));

  const nav = $("#nav"), bg = $("#burger");
  const setMenu = (o) => { nav.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); };
  bg.onclick = () => setMenu(!nav.classList.contains("open"));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    const name = $("#fName").value.trim(), items = $("#fItems").value.trim(), skin = $("#fSkin").value.trim();
    if (!items) { $("#fErr").textContent = "اكتبي اسم المنتج اللي عايزاه."; $("#fItems").focus(); return; }
    $("#fErr").textContent = "";
    const lines = ["أهلاً، عايزة أطلب:", "", items];
    if (name) lines.push(`الاسم: ${name}`);
    if (skin) lines.push(`نوع البشرة/الشعر: ${skin}`);
    window.open(wa(lines.join("\n")), "_blank", "noopener");
  };

  $$(".pgrid,.why-list,.trust-in").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--d", i * 0.09 + "s")));
  const els = $$(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add("in"));

  let started = false;
  const countUp = () => $$("[data-count]").forEach((el) => {
    if (reduce) return;
    const to = +el.dataset.count, suf = el.dataset.suf || "", t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  const start = () => {
    if (started) return; started = true;
    $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready");
    setTimeout(countUp, 800);
  };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1900));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  const bar = $("#progress"), header = $(".header");
  let tick = false;
  addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { tick = false; const max = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; header.classList.toggle("stuck", scrollY > 30); }); }, { passive: true });

  if (fine && !reduce) {
    $$(".pc").forEach((c) => {
      c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = `perspective(900px) rotateY(${x * -4}deg) rotateX(${y * 4}deg) translateY(-4px)`; });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  }
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".btn"); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement("span");
    d.className = "ripple"; d.style.cssText = `inline-size:${s}px;block-size:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.append(d); setTimeout(() => d.remove(), 650);
  });
})();
