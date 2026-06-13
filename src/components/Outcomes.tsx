import { Brain, Cpu, Blocks, Eye, Rocket, CheckCircle2 } from 'lucide-react';

interface OutcomeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeColor: string;
  iconColor: string;
}

function OutcomeCard({ icon, title, description, badgeColor, iconColor }: OutcomeCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-neutral-border/10 hover-lift flex flex-col items-center text-center">
      <div className={`w-14 h-14 ${badgeColor} rounded-2xl flex items-center justify-center ${iconColor} mb-6`}>
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-neutral-dark mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Outcomes() {
  const outcomes = [
    {
      icon: <Brain size={28} />,
      title: 'AI Fundamentals',
      description: 'Understand the core principles of artificial intelligence and logical reasoning.',
      badgeColor: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: <Cpu size={28} />,
      title: 'Robotics Logic',
      description: 'Program mechanical actions and learn how robots interpret sensor feedbacks.',
      badgeColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      icon: <Blocks size={28} />,
      title: 'Coding Blocks',
      description: 'Develop structured and algorithmic problem-solving skills using visual blocks.',
      badgeColor: 'bg-tertiary/10',
      iconColor: 'text-tertiary',
    },
    {
      icon: <Eye size={28} />,
      title: 'Machine Learning',
      description: 'Train simple visual models and see how AI recognition datasets are created.',
      badgeColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Real-World Projects',
      description: 'Build functional systems from scratch and demo them in the final showcase.',
      badgeColor: 'bg-green-500/10',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <section id="outcomes" className="py-20 max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
          What Your Child Will Learn
        </h2>
        <p className="text-neutral-muted leading-relaxed">
          A comprehensive and engaging curriculum designed specifically for curious young minds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {outcomes.map((item, idx) => (
          <OutcomeCard
            key={idx}
            icon={item.icon}
            title={item.title}
            description={item.description}
            badgeColor={item.badgeColor}
            iconColor={item.iconColor}
          />
        ))}
      </div>

      {/* Trust points bar */}
      <div className="mt-16 bg-neutral-background rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 border border-neutral-border/10">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-600 shrink-0" size={24} />
          <span className="text-sm font-semibold text-neutral-dark">1:10 Instructor Ratio</span>
        </div>
        <div className="w-px h-8 bg-neutral-border/30 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-600 shrink-0" size={24} />
          <span className="text-sm font-semibold text-neutral-dark">Interactive Live Breakouts</span>
        </div>
        <div className="w-px h-8 bg-neutral-border/30 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-600 shrink-0" size={24} />
          <span className="text-sm font-semibold text-neutral-dark">Lifetime Community Access</span>
        </div>
      </div>
    </section>
  );
}
