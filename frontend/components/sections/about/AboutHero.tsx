import { Building2, Globe2, Shield, Award } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            <span>С 2015 года на рынке логистики</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Азия Транс Карго
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Ваш надежный партнер в мире международной логистики
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
            <div className="space-y-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Globe2 className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-foreground">20+</div>
              <div className="text-sm text-muted-foreground">Стран доставки</div>
            </div>
            <div className="space-y-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Building2 className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-foreground">5</div>
              <div className="text-sm text-muted-foreground">Офисов в Китае</div>
            </div>
            <div className="space-y-2 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Shield className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Гарантия доставки</div>
            </div>
            <div className="space-y-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Award className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-foreground">5000+</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
