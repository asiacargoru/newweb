import Link from 'next/link';

interface DeliveryOption {
  id: number;
  slug: string;
  name: string;
  icon: string;
  priority_index: number;
}

interface Props {
  country: any;
  options: DeliveryOption[];
}

export default function DeliveryOptionsList({ country, options }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {options.map((option) => (
        <Link 
          key={option.id}
          href={`/services/${country.slug}/${option.slug}`}
          className="p-6 border-2 rounded-lg hover:border-blue-600 hover:shadow-lg transition-all group"
        >
          <div className="text-4xl mb-4">{option.icon}</div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
            {option.name}
          </h3>
          <p className="text-blue-600 font-semibold">
            Подробнее →
          </p>
        </Link>
      ))}
    </div>
  );
}
