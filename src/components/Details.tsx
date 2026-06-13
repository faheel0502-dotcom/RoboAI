import { Users, Calendar, Video, Landmark, Rocket, Award } from 'lucide-react';

interface HighlightCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

function HighlightCard({ icon, label, value, bgColor, iconColor }: HighlightCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.03)] border border-neutral-border/10 hover-lift flex flex-col items-center text-center">
      <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-5`}>
        {icon}
      </div>
      <span className="text-xs font-semibold tracking-wider text-neutral-muted uppercase mb-1">
        {label}
      </span>
      <p className="font-display text-xl font-bold text-neutral-dark">
        {value}
      </p>
    </div>
  );
}

export default function Details() {
  const highlights = [
    {
      icon: <Users size={28} />,
      label: 'Age Group',
      value: '8–14 Years',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: <Calendar size={28} />,
      label: 'Duration',
      value: '4 Weeks',
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      icon: <Video size={28} />,
      label: 'Mode',
      value: 'Online (Live)',
      bgColor: 'bg-tertiary/10',
      iconColor: 'text-tertiary',
    },
    {
      icon: <Landmark size={28} />,
      label: 'Fee',
      value: '₹2,999',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
    },
    {
      icon: <Rocket size={28} />,
      label: 'Start Date',
      value: '15 July 2026',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-600',
    },
    {
      icon: <Award size={28} />,
      label: 'Certificate',
      value: 'Accredited',
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-600',
    },
  ];

  return (
    <section id="details" className="bg-neutral-surface py-20 border-y border-neutral-border/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
            Workshop Highlights
          </h2>
          <p className="text-neutral-muted leading-relaxed">
            Everything you need to know about our upcoming cohort starting this summer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item, idx) => (
            <HighlightCard
              key={idx}
              icon={item.icon}
              label={item.label}
              value={item.value}
              bgColor={item.bgColor}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
