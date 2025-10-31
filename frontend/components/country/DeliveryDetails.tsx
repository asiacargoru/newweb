interface Props {
  data: {
    delivery_name: string;
    description: string;
    days_min: number;
    days_max: number;
    cost_per_kg: number;
    details?: any;
  };
}

export default function DeliveryDetails({ data }: Props) {
  return (
    <div className="space-y-12">
      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-2">Срок доставки</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.days_min}-{data.days_max} дней
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-2">Стоимость</h3>
          <p className="text-3xl font-bold text-green-600">
            от ${data.cost_per_kg}/кг
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-2">Тип доставки</h3>
          <p className="text-2xl font-bold text-purple-600">
            {data.delivery_name}
          </p>
        </div>
      </div>

      {/* Описание */}
      <div className="prose max-w-none">
        <h2>О доставке</h2>
        <p>{data.description}</p>
      </div>

      {/* Преимущества */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Преимущества</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Отслеживание груза 24/7</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Страхование груза</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Таможенное оформление под ключ</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
