const TrustIndicators = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Лет опыта</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Доставленных грузов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Без задержек</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
