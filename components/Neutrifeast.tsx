export default function Neutrifeast() {
  const categories = [
    {
      title: "Millet Biscuits",
      note: "250g",
      items: [
        ["Coconut Jowar Biscuit", "185"], ["Peanut Jowar Biscuit", "160"],
        ["Sprouted Healthmix Biscuit", "235"], ["Pearl Millet Biscuit", "165"],
        ["Choco Ragi Biscuit", "165"], ["Nankhatai", "165"],
      ],
    },
    {
      title: "Healthy Laddus",
      note: "250g",
      items: [
        ["Green gram laddu", "150"], ["Ragi laddu", "150"],
        ["Kambu laddu", "150"], ["Sprouted healthmix laddu", "250"],
        ["Multigrain laddu", "200"], ["Ragi simili", "170"],
      ],
    },
  ];

  const brownies = [
    ["Classic Brownie", "400"], ["Double Chocolate Brownie", "450"],
    ["Triple Chocolate Brownie", "500"], ["Blondie", "400"],
    ["Double Chocolate Blondie", "450"], ["Rasamalai Blondie", "450"],
    ["Rosemilk Blondie", "450"], ["Brookies", "500"],
  ];

  const cakes = [
    ["Tea Cake", "120"], ["Pudding Cake", "180"], ["Butter Cake", "180"],
    ["Chocolate Cake", "130"], ["Rosemilk Cake", "120"],
    ["Dates Cinnamon Cake", "170"], ["Karuppatti Cake", "220"],
    ["Carrot Cake", "150"], ["Banana Cake", "160"],
  ];

  return (
    <main className="nf-site">
      <header className="nf-nav">
        <a className="nf-brand" href="#top" aria-label="Neutrifeast home">
          <span className="nf-brand-mark">N</span>
          <span>Neutrifeast</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Our story</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nf-order" href="https://wa.me/919360257567" target="_blank" rel="noreferrer">Order now</a>
      </header>

      <section className="nf-hero" id="top">
        <div className="nf-hero-copy">
          <p className="nf-kicker">Homemade • Wholesome • Fresh</p>
          <h1>Goodness in every <em>bite.</em></h1>
          <p className="nf-intro">Handmade millet biscuits, nourishing laddus and irresistible cakes — crafted with familiar ingredients and a whole lot of care.</p>
          <div className="nf-actions">
            <a className="nf-primary" href="#menu">Explore the menu</a>
            <a className="nf-secondary" href="#story">Our ingredients ↓</a>
          </div>
        </div>

        <div className="nf-hero-art" aria-label="Handmade wholesome treats">
          <div className="nf-sun" />
          <div className="nf-bowl">
            <span className="nf-bowl-grain grain-one" /><span className="nf-bowl-grain grain-two" /><span className="nf-bowl-grain grain-three" />
          </div>
          <div className="nf-cookie c-one" /><div className="nf-cookie c-two" />
          <div className="nf-cookie c-three" /><div className="nf-cookie c-four" />
          <div className="nf-leaf leaf-one" /><div className="nf-leaf leaf-two" />
          <div className="nf-art-label"><strong>100%</strong><span>homemade</span></div>
        </div>
      </section>

      <section className="nf-marquee" aria-label="Neutrifeast qualities">
        <span>Freshly baked</span><b>◆</b><span>Millet goodness</span><b>◆</b><span>Made with care</span><b>◆</b><span>Custom flavours</span>
      </section>

      <section className="nf-menu" id="menu">
        <div className="nf-section-heading"><p>From our kitchen</p><h2>Choose your favourite</h2></div>
        <div className="nf-category-grid">
          {categories.map((category) => (
            <article className="nf-category" key={category.title}>
              <div className="nf-category-head"><h3>{category.title}</h3><span>{category.note}</span></div>
              <div className="nf-products">
                {category.items.map(([name, price]) => (
                  <div className="nf-product" key={name}><span>{name}</span><i /><strong>₹{price}</strong></div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="nf-featured">
          <article className="nf-feature-card brownie-card">
            <div className="nf-feature-visual" aria-hidden="true"><div className="nf-brownies"><i /><i /><i /><i /></div></div>
            <div className="nf-feature-copy">
              <p className="nf-kicker">Rich & fudgy</p><h3>Brownies <span>500g</span></h3>
              <div className="nf-feature-list">
                {brownies.map(([name, price]) => (<div key={name}><span>{name}</span><strong>₹{price}</strong></div>))}
              </div>
              <p className="nf-extra">Eggless version: ₹50 extra on each item</p>
            </div>
          </article>

          <article className="nf-feature-card cake-card">
            <div className="nf-feature-copy">
              <p className="nf-kicker">Soft & delightful</p><h3>Spongy Cakes <span>250g</span></h3>
              <div className="nf-feature-list">
                {cakes.map(([name, price]) => (<div key={name}><span>{name}</span><strong>₹{price}</strong></div>))}
              </div>
              <p className="nf-extra">Custom flour, egg & eggless options available</p>
            </div>
            <div className="nf-feature-visual" aria-hidden="true"><div className="nf-cake"><i /><i /><i /></div></div>
          </article>
        </div>

        <div className="nf-nuts">
          <h3>Other Varieties</h3>
          <div>
            <p><span>Rasmalai Biscuit</span><strong>₹230</strong></p><p><span>Coin Drop Biscuit</span><strong>₹165</strong></p>
            <p><span>Saffron Biscuit</span><strong>₹170</strong></p><p><span>Ghee Biscuit</span><strong>₹195</strong></p>
            <p><span>Butter Biscuit</span><strong>₹170</strong></p>
          </div>
        </div>
      </section>

      <section className="nf-story" id="story">
        <div><p className="nf-kicker">Made the honest way</p><h2>Simple ingredients.<br />Real comfort.</h2></div>
        <p>Every Neutrifeast batch is prepared in small quantities with thoughtfully chosen grains, millets and familiar flavours. We also customise recipes to suit your preference.</p>
      </section>

      <footer className="nf-footer" id="contact">
        <div><span className="nf-footer-logo">Neutrifeast</span><p>Crafted with love, served with care.</p></div>
        <div className="nf-footer-links"><a href="tel:+919360257567">+91 93602 57567</a><a href="https://www.instagram.com/neutrifeast" target="_blank" rel="noreferrer">@neutrifeast</a></div>
        <a className="nf-primary" href="https://wa.me/919360257567" target="_blank" rel="noreferrer">WhatsApp to order</a>
      </footer>
    </main>
  );
}
