import Image from 'next/image';

type CaseStudy = {
  id: string | number;
  images: string[];
  title: string;
  client_name: string;
  cargo_type: string;
  delivery_time: string | number;
};

interface CaseStudiesProps {
  title: string;
  cases: CaseStudy[];
}

export function CaseStudies({ title, cases }: CaseStudiesProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">{title}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((caseStudy: CaseStudy) => (
            <div key={caseStudy.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src={caseStudy.images[0]}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-4">{caseStudy.client_name}</p>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>🚚 {caseStudy.cargo_type}</span>
                  <span>⏱️ {caseStudy.delivery_time} дней</span>
                </div>
                
                <button className="mt-4 text-blue-600">
                  Читать кейс →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
