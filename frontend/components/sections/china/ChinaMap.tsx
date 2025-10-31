import { MapPin } from "lucide-react";

const ChinaMap = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Маршруты доставки из Китая в Россию
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Наши логистические коридоры охватывают все основные торговые маршруты между Китаем и Россией
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 overflow-hidden">
          {/* Map SVG */}
          <svg viewBox="0 0 1200 600" className="w-full h-auto">
            {/* Background */}
            <rect width="1200" height="600" fill="#f8fafc"/>
            
            {/* China region */}
            <path d="M 200 200 Q 350 180 400 250 L 420 320 Q 380 380 320 400 L 280 380 Q 200 350 180 280 Z" 
                  fill="#002a4a" opacity="0.1" stroke="#002a4a" strokeWidth="2"/>
            
            {/* Russia region */}
            <path d="M 600 150 L 1000 120 L 1050 200 Q 1000 280 950 320 L 700 350 Q 650 300 600 250 Z" 
                  fill="#002a4a" opacity="0.1" stroke="#002a4a" strokeWidth="2"/>
            
            {/* Route lines */}
            {/* Sea route - curved */}
            <path d="M 350 350 Q 400 450 650 380" 
                  stroke="#0284c7" strokeWidth="3" fill="none" strokeDasharray="10,5" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </path>
            
            {/* Air route - straight */}
            <path d="M 320 260 L 750 200" 
                  stroke="#f31911" strokeWidth="3" fill="none" strokeDasharray="10,5" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="1.5s" repeatCount="indefinite"/>
            </path>
            
            {/* Railway route - curved */}
            <path d="M 380 280 Q 500 250 700 240" 
                  stroke="#0284c7" strokeWidth="3" fill="none" strokeDasharray="10,5" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.5s" repeatCount="indefinite"/>
            </path>
            
            {/* Auto route - curved */}
            <path d="M 400 300 Q 550 320 750 280" 
                  stroke="#f31911" strokeWidth="3" fill="none" strokeDasharray="10,5" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </path>
            
            {/* China cities */}
            <g>
              {/* Beijing */}
              <circle cx="360" cy="240" r="8" fill="#f31911"/>
              <text x="360" y="225" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Пекин</text>
              
              {/* Shanghai */}
              <circle cx="420" cy="300" r="8" fill="#f31911"/>
              <text x="420" y="285" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Шанхай</text>
              
              {/* Guangzhou */}
              <circle cx="380" cy="360" r="8" fill="#f31911"/>
              <text x="380" y="345" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Гуанчжоу</text>
              
              {/* Shenzhen */}
              <circle cx="400" cy="380" r="8" fill="#f31911"/>
              <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Шэньчжэнь</text>
              
              {/* Qingdao */}
              <circle cx="420" cy="260" r="8" fill="#f31911"/>
              <text x="420" y="245" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Циндао</text>
            </g>
            
            {/* Russia cities */}
            <g>
              {/* Moscow */}
              <circle cx="750" cy="200" r="8" fill="#002a4a"/>
              <text x="750" y="185" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Москва</text>
              
              {/* Vladivostok */}
              <circle cx="680" cy="350" r="8" fill="#002a4a"/>
              <text x="680" y="335" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Владивосток</text>
              
              {/* Novosibirsk */}
              <circle cx="700" cy="240" r="8" fill="#002a4a"/>
              <text x="700" y="225" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Новосибирск</text>
              
              {/* St. Petersburg */}              
              <circle cx="720" cy="160" r="8" fill="#002a4a"/>
              <text x="720" y="145" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">СПб</text>
            </g>
            
            {/* Labels */}
            <text x="280" y="480" fontSize="18" fontWeight="700" fill="#002a4a">КИТАЙ</text>
            <text x="850" y="480" fontSize="18" fontWeight="700" fill="#002a4a">РОССИЯ</text>
          </svg>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-brand-blue"></div>
              <span className="text-sm text-muted-foreground">Морские и ж/д маршруты</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-brand-red"></div>
              <span className="text-sm text-muted-foreground">Авиа и авто маршруты</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-red"></div>
              <span className="text-sm text-muted-foreground">Наши офисы в Китае</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
              <span className="text-sm text-muted-foreground">Пункты назначения в РФ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinaMap;
