
export default function Curriculum() {
  const steps = [
    {
      week: 'Week 1',
      title: 'Introduction to AI & Logic',
      description: 'Learn the absolute basics of artificial intelligence. Explore how machines learn, recognize patterns, and logical reasoning through interactive coding blocks.',
    },
    {
      week: 'Week 2',
      title: 'Robotics & Sensors',
      description: 'Understand the hardware! Learn about sonar, light, and collision sensors. Program robotic motor speed, directions, and sensor-based movement triggers.',
    },
    {
      week: 'Week 3',
      title: 'Coding & Automation',
      description: 'Dive into loop structures and condition statements. Automate robotics tasks by writing rules that evaluate multiple sensor inputs concurrently.',
    },
    {
      week: 'Week 4',
      title: 'Final Project Showcase',
      description: 'Apply all concepts! Design and build a custom virtual robotic system. Present it live to parents and peers. Graduation certificates awarded.',
    },
  ];

  return (
    <section id="curriculum" className="bg-primary/5 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[90px] -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/10 rounded-full blur-[90px] -ml-40 -mb-40"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
            Workshop Curriculum
          </h2>
          <p className="text-neutral-muted leading-relaxed">
            Four weeks of exciting, hands-on, and highly rewarding project-based learning.
          </p>
        </div>

        <div className="space-y-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 md:gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform shadow-md shadow-primary/20 shrink-0">
                  {idx + 1}
                </div>
                {idx !== steps.length - 1 && (
                  <div className="w-0.5 grow bg-primary/20 mt-4 group-hover:bg-primary/40 transition-colors"></div>
                )}
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-neutral-border/10 flex-1 hover:border-primary/20 transition-all hover:shadow-[0px_10px_30px_rgba(79,70,229,0.05)]">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {step.week}
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-dark mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
