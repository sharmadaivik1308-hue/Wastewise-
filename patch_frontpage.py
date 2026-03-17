import sys
import re

with open(r"c:\Users\Daivik Sharma\OneDrive\Desktop\final copy(1)\prototype1\hack garbage\index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update CSS variables
old_vars = """    :root {
      --bg: #f0f7f1;
      --white: #ffffff;
      --green: #1b8a4c;
      --green2: #27ae60;
      --green3: #52d68a;
      --green-pale: #e0f5ea;
      --green-glow: rgba(39, 174, 96, 0.25);
      --text: #132b1e;
      --muted: #5a7a65;
      --border: #c8e6d0;
      --amber: #f39c12;
      --sky: #2980b9;
    }"""
new_vars = """    :root {
      --bg: transparent;
      --white: rgba(8, 22, 12, 0.65);
      --green: #52d68a;
      --green2: #27ae60;
      --green3: #1b8a4c;
      --green-pale: rgba(82, 214, 138, 0.15);
      --green-glow: rgba(82, 214, 138, 0.25);
      --text: #ffffff;
      --muted: rgba(255, 255, 255, 0.65);
      --border: rgba(82, 214, 138, 0.25);
      --amber: #f39c12;
      --sky: #2980b9;
    }"""
content = content.replace(old_vars, new_vars)

# 2. Add slide styles
slide_styles = """
    /* ─── Slideshow Background ─── */
    .bg-slideshow { position: fixed; inset: 0; z-index: 0; }

    .bg-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1.4s ease-in-out;
    }
    .bg-slide.active { opacity: 1; }

    .bg-overlay {
      position: fixed;
      inset: 0;
      background: rgba(6, 16, 10, 0.78);
      z-index: 1;
    }

    /* Override buttons */
    .btn-learn {
      background: rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.8);
      border: 1px solid rgba(255,255,255,0.18);
    }
    .btn-learn:hover {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.35);
      color: #fff;
    }
    .big-scan-btn {
      background: var(--green);
      color: #fff;
    }
    
    .hero-badge {
      background: rgba(82, 214, 138, 0.15);
      color: #52d68a;
      border-color: rgba(82, 214, 138, 0.3);
    }
    
    .stat-pill {
        background: rgba(8, 22, 12, 0.65);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(82, 214, 138, 0.25);
    }
"""
content = content.replace("    /* ─── FLOATING LEAVES background ─── */", slide_styles + "\n    /* ─── FLOATING LEAVES background ─── */")

# 3. Add backdrops
content = content.replace("background: rgba(240, 247, 241, 0.88);", "background: rgba(8, 22, 12, 0.6);")
content = content.replace("background: var(--white);", "background: var(--white);\n      backdrop-filter: blur(16px);")
content = content.replace(".step-card {\n      background: var(--white);", ".step-card {\n      background: var(--white);\n      backdrop-filter: blur(16px);")
content = content.replace(".counter-card {\n      background: var(--white);", ".counter-card {\n      background: var(--white);\n      backdrop-filter: blur(16px);")

# 4. Bin categories transparent
content = content.replace("""    #bins {
      padding: 5rem 5rem;
      background: var(--white);
      position: relative;
      z-index: 1;
    }""", """    #bins {
      padding: 5rem 5rem;
      background: transparent;
      position: relative;
      z-index: 1;
    }""")

# 5. Fix Bin cards
bins_old = """    .bin-card {
      border-radius: 20px;
      padding: 1.6rem 1rem 1.4rem;
      text-align: center;
      border: 1.5px solid transparent;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: default;
    }

    .bin-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
    }

    .bin-emoji {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 0.7rem;
    }

    .bin-card h4 {
      font-size: 0.88rem;
      font-weight: 800;
      margin-bottom: 0.3rem;
    }

    .bin-card p {
      font-size: 0.72rem;
      line-height: 1.55;
    }

    .bin-green {
      background: #e8faf0;
      border-color: #a8e6c0;
    }

    .bin-green h4 {
      color: #1b8a4c;
    }

    .bin-green p {
      color: #3a7a55;
    }

    .bin-blue {
      background: #e8f4fd;
      border-color: #a8d4ef;
    }

    .bin-blue h4 {
      color: #2176ae;
    }

    .bin-blue p {
      color: #3a6e8a;
    }

    .bin-yellow {
      background: #fef9e7;
      border-color: #f7dc6f;
    }

    .bin-yellow h4 {
      color: #b7950b;
    }

    .bin-yellow p {
      color: #8a7033;
    }

    .bin-red {
      background: #fdedec;
      border-color: #f1948a;
    }

    .bin-red h4 {
      color: #c0392b;
    }

    .bin-red p {
      color: #8a3830;
    }

    .bin-black {
      background: #f4f4f4;
      border-color: #c0c0c0;
    }

    .bin-black h4 {
      color: #2c2c2c;
    }

    .bin-black p {
      color: #5a5a5a;
    }"""
bins_new = """    .bin-card {
      border-radius: 20px;
      padding: 1.6rem 1rem 1.4rem;
      text-align: center;
      border: 1.5px solid transparent;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: default;
      backdrop-filter: blur(12px);
    }

    .bin-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    }

    .bin-emoji {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 0.7rem;
    }

    .bin-card h4 {
      font-size: 0.88rem;
      font-weight: 800;
      margin-bottom: 0.3rem;
    }

    .bin-card p {
      font-size: 0.72rem;
      line-height: 1.55;
      color: rgba(255,255,255,0.7);
    }

    .bin-green {
      background: rgba(27, 138, 76, 0.15);
      border-color: rgba(82, 214, 138, 0.4);
    }
    .bin-green h4 { color: #52d68a; }

    .bin-blue {
      background: rgba(33, 118, 174, 0.15);
      border-color: rgba(52, 152, 219, 0.4);
    }
    .bin-blue h4 { color: #3498db; }

    .bin-yellow {
      background: rgba(183, 149, 11, 0.15);
      border-color: rgba(241, 196, 15, 0.4);
    }
    .bin-yellow h4 { color: #f1c40f; }

    .bin-red {
      background: rgba(192, 57, 43, 0.15);
      border-color: rgba(231, 76, 60, 0.4);
    }
    .bin-red h4 { color: #e74c3c; }

    .bin-black {
      background: rgba(44, 44, 44, 0.3);
      border-color: rgba(150, 150, 150, 0.4);
    }
    .bin-black h4 { color: #bdc3c7; }"""

content = content.replace(bins_old, bins_new)

# 6. Add HTML tags after <body>
slides_html = """  <!-- Slideshow -->
  <div class="bg-slideshow">
    <div class="bg-slide active" style="background-image:url('indore1.jpg')"></div>
    <div class="bg-slide" style="background-image:url('indore2.jpg')"></div>
    <div class="bg-slide" style="background-image:url('indore3.jpg')"></div>
    <div class="bg-slide" style="background-image:url('indore4.jpg')"></div>
    <div class="bg-slide" style="background-image:url('indore5.jpg')"></div>
  </div>
  <div class="bg-overlay"></div>

  <!-- ANIMATED LEAF BACKGROUND -->"""
content = content.replace("  <!-- ANIMATED LEAF BACKGROUND -->", slides_html)

# 7. Add slide jumping JS
js_logic = """    /* ── Slideshow ── */
    const slides = document.querySelectorAll('.bg-slide');
    let cur = 0;
    function goTo(n) {
      if(slides.length === 0) return;
      slides[cur].classList.remove('active');
      cur = n;
      slides[cur].classList.add('active');
    }
    if (slides.length > 0) {
      setInterval(() => goTo((cur + 1) % slides.length), 4500);
    }

    /* ── Generate floating leaves ── */"""

content = content.replace("    /* ── Generate floating leaves ── */", js_logic)

with open(r"c:\Users\Daivik Sharma\OneDrive\Desktop\final copy(1)\prototype1\hack garbage\index.html", "w", encoding="utf-8") as f:
    f.write(content)
