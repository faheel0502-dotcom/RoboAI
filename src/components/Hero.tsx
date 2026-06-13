import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:py-36 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col items-start text-left">
          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            <span className="bg-primary-light/50 text-primary border border-primary/10 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              Ages 8–14
            </span>
            <span className="bg-secondary-light/50 text-secondary border border-secondary/10 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              4 Weeks Cohort
            </span>
            <span className="bg-tertiary-light/50 text-tertiary border border-tertiary/10 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              Interactive Online
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark leading-[1.15] mb-6">
            AI &amp; Robotics <br />
            <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
              Summer Workshop
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-muted mb-8 max-w-xl leading-relaxed">
            Empower your child's future with hands-on learning in AI, robotics, and coding. Build real-world projects and learn critical thinking with expert mentors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo('register')}
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover-lift shadow-lg shadow-primary/25 group transition-all"
            >
              Enroll Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('curriculum')}
              className="bg-white hover:bg-neutral-background border-2 border-neutral-border/50 text-neutral-dark px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:border-neutral-dark"
            >
              <Play size={16} className="fill-neutral-dark" />
              View Curriculum
            </button>
          </div>
        </div>

        {/* Right Side: Visual Image */}
        <div className="relative flex justify-center items-center">
          {/* Subtle back gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-tertiary/10 blur-3xl rounded-full scale-90 -z-10 animate-float"></div>

          {/* High-quality 3D Robot Image */}
          <div className="relative max-w-lg lg:max-w-full w-full hover:scale-[1.02] transition-transform duration-500">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkI0GmxtjD9-oeG546v1i1ulWsKcwCnZaN17IG1CWBh17mDFVo7mtgHS3DAmosJ-jLDocWME7VU6TpdELca2z0VLngSjtJKxnpYdpQ7G3fXwl9595JD7gmoXaY45g0OBmRayVTvkZrDOqak7IkhTnsN73JjX40Onxd9kjh3s8w9_nFvBd-SWVi4CW0p2Q8Dg7ZykZDel0W3eLEKY89P2dULvW5Tvjlx2JGeztCKTZNoaq0kNkgcyE5nw"
              alt="AI & Robotics Summer Workshop for kids"
              className="w-full h-auto drop-shadow-2xl object-cover rounded-3xl"
              style={{ maxHeight: '450px' }}
            />
            
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-neutral-border/10 animate-float">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold text-sm">
                Live
              </div>
              <div>
                <p className="text-xs text-neutral-muted font-medium">Next Cohort Starts</p>
                <p className="text-sm text-neutral-dark font-bold">15 July 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
