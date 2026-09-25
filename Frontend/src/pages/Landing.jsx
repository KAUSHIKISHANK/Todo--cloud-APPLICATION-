import { ArrowRight, CheckCircle2, Cloud, ShieldCheck, Sparkles, ListTodo } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-mark"><ListTodo size={20} /></span>
          <span>Task<span>Flow</span></span>
        </button>

        <div className="landing-nav-actions">
          <button className="nav-login" onClick={() => navigate("/login")}>Sign in</button>
          <button className="nav-signup" onClick={() => navigate("/register")}>Get started</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Simple task management</div>
            <h1>Turn your tasks into <span>progress.</span></h1>
            <p>
              TaskFlow gives you a clean workspace to organize everyday work,
              track progress, and stay focused without the clutter.
            </p>

            <div className="hero-actions">
              <button className="hero-primary" onClick={() => navigate("/register")}>
                Get started free <ArrowRight size={18} />
              </button>
              <button className="hero-secondary" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>

            <div className="hero-trust">
              <span><CheckCircle2 size={16} /> Secure login</span>
              <span><CheckCircle2 size={16} /> Cloud ready</span>
              <span><CheckCircle2 size={16} /> Built for focus</span>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-glow" />
            <div className="preview-window">
              <div className="preview-top">
                <div>
                  <span className="preview-date">Tuesday, 24 September</span>
                  <h3>Good morning, Ishank</h3>
                </div>
                <span className="preview-avatar">I</span>
              </div>

              <div className="preview-stats">
                <div><span>Total</span><strong>8</strong></div>
                <div><span>Pending</span><strong>5</strong></div>
                <div><span>Done</span><strong>3</strong></div>
              </div>

              <div className="preview-list">
                <div className="preview-task"><span className="task-dot" /> Complete cloud assignment <b>Pending</b></div>
                <div className="preview-task"><span className="task-dot" /> Revise DBMS <b>Pending</b></div>
                <div className="preview-task done"><span className="task-check">✓</span> Submit project report <b>Done</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-heading">
            <span>Everything you need</span>
            <h2>A focused workspace for your day.</h2>
          </div>

          <div className="feature-grid">
            <article>
              <span className="feature-icon"><ListTodo size={20} /></span>
              <h3>Organize tasks</h3>
              <p>Create, edit, complete, search, and delete tasks from one simple workspace.</p>
            </article>
            <article>
              <span className="feature-icon"><ShieldCheck size={20} /></span>
              <h3>Private by account</h3>
              <p>JWT authentication keeps each user's task workspace separated and protected.</p>
            </article>
            <article>
              <span className="feature-icon"><Cloud size={20} /></span>
              <h3>Cloud ready</h3>
              <p>Designed to run with a cloud-hosted frontend, backend, and MongoDB Atlas database.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>© {new Date().getFullYear()} TaskFlow</span>
        <span>Organize. Focus. Finish.</span>
      </footer>
    </div>
  );
}

export default Landing;
