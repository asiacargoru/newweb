'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = [
  { value: '530', label: 'Австралия' },
  { value: '1578', label: 'Бангладеш' },
  { value: '516', label: 'Вьетнам' },
  { value: '2020', label: 'Египет' },
  { value: '520', label: 'Иран' },
  { value: '1588', label: 'Индия' },
  { value: '526', label: 'Индонезия' },
  { value: '1456', label: 'Китай' },
  { value: '1406', label: 'Корея' },
  { value: '2018', label: 'Малайзия' },
  { value: '532', label: 'Мьянма' },
  { value: '524', label: 'Новая Зеландия' },
  { value: '518', label: 'ОАЭ' },
  { value: '2022', label: 'Сербия' },
  { value: '536', label: 'Тайвань' },
  { value: '2006', label: 'Таиланд' },
  { value: '686', label: 'Турция' },
  { value: '1568', label: 'Филиппины' },
  { value: '538', label: 'Япония' },
];

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [cargo, setCargo] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const formatRuPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    if (!digits.startsWith('7')) {
      digits = '7' + digits;
    }
    digits = digits.slice(0, 11);

    const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)];
    let result = '+7';
    if (parts[0]) result += ` (${parts[0]}` + (parts[0].length === 3 ? ')' : '');
    if (parts[1]) result += ` ${parts[1]}`;
    if (parts[2]) result += `-${parts[2]}`;
    if (parts[3]) result += `-${parts[3]}`;
    return result;
  };

  const isValidRuPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('7');
  };

  const isValidEmail = (value: string) => {
    if (!value) return true; // email необязателен
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !country) {
      setErrorMessage('Пожалуйста, заполните имя, телефон и страну отправления');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    if (!isValidRuPhone(phone)) {
      setPhoneError('Введите корректный номер телефона');
      setTimeout(() => setPhoneError(null), 4000);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Введите корректный email');
      setTimeout(() => setEmailError(null), 4000);
      return;
    }

    if (!agreed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone: phone.replace(/\D/g, ''),
          email,
          country: country ? Number(country) : undefined,
          cargo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        
        if (typeof window !== 'undefined') {
          if (typeof (window as any).ym !== 'undefined') {
            (window as any).ym(97096133, 'reachGoal', 'form_submit');
          }
          if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('event', 'form_submit', {
              event_category: 'conversion',
              event_label: 'Contact Form',
            });
          }
        }

        setName('');
        setPhone('');
        setEmail('');
        setCountry('');
        setCargo('');
        setAgreed(false);

        setTimeout(() => {
          setShowSuccess(false);
          onOpenChange(false);
        }, 3000);
      } else {
        alert(`Ошибка: ${data.error}`);
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка при отправке. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand-blue">
              Получить расчет стоимости
            </DialogTitle>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в течение 15 минут
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => {
                    const formatted = formatRuPhone(e.target.value);
                    setPhone(formatted);
                    if (phoneError && isValidRuPhone(formatted)) setPhoneError(null);
                  }}
                  onBlur={() => {
                    if (!isValidRuPhone(phone)) setPhoneError('Введите корректный номер телефона');
                  }}
                  required
                  className="mt-2"
                />
                {phoneError && (
                  <p className="text-sm text-red-600 mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Эл. почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@mail.ru"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError && isValidEmail(e.target.value)) setEmailError(null);
                  }}
                  onBlur={() => {
                    if (!isValidEmail(email)) setEmailError('Введите корректный email');
                  }}
                  className="mt-2"
                />
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Страна отправления *</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите страну" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cargo">Описание груза</Label>
                <Textarea
                  id="cargo"
                  placeholder="Опишите ваш груз, объем, вес..."
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy-consent"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(!!checked)}
                />
                <label
                  htmlFor="privacy-consent"
                  className="text-sm text-muted-foreground leading-tight cursor-pointer"
                >
                  Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-brand-blue underline hover:text-brand-red"
                  >
                    Политикой конфиденциальности
                  </button>{' '}
                  и Федеральным законом № 152-ФЗ «О персональных данных»
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              {showWarning && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  Необходимо дать согласие на обработку персональных данных
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !agreed}
                className="w-full !bg-brand-red hover:!bg-brand-red/90 text-white"
              >
                {isSubmitting ? 'Отправка...' : 'Получить расчет'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-bold mt-4">1. Общие положения</h3>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта asiacargo.su.</p>
            
            <p><strong>ООО "Азия Транс Карго"</strong> (ОГРН 5177746090220, ИНН 7731387839), зарегистрированное по адресу: ул. Горбунова, д. 2, стр. 3, этаж 4, помещение II, комната 25, Москва, Россия, 121596 (далее — Оператор), обрабатывает персональные данные в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ "О персональных данных".</p>
            
            <h3 className="text-lg font-bold mt-4">2. Согласие на обработку персональных данных</h3>
            <p>Отправляя заявку через форму на сайте, вы свободно, своей волей и в своем интересе выражаете безусловное согласие на обработку своих персональных данных Оператором.</p>
            
            <h3 className="text-lg font-bold mt-4">3. Категории обрабатываемых персональных данных</h3>
            <p>Согласие дается на обработку следующих категорий персональных данных:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Имя</li>
              <li>Адрес электронной почты (E-mail)</li>
              <li>Номер телефона</li>
              <li>Пункт отправления (страна/город)</li>
              <li>Описание груза, вес, объем</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">4. Цели обработки персональных данных</h3>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Предоставление услуг грузоперевозки</li>
              <li>Подготовка коммерческих предложений</li>
              <li>Направление уведомлений об услугах</li>
              <li>Ответы на запросы клиентов</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">5. Передача персональных данных третьим лицам</h3>
            <p>Оператор осуществляет обработку персональных данных посредством программы «1С-Битрикс24». Обработка может быть поручена ООО «1С-Битрикс» (ОГРН 5077746476209).</p>
            
            <h3 className="text-lg font-bold mt-4">6. Срок действия согласия</h3>
            <p>Настоящее согласие действует в течение всего периода хранения персональных данных, если иное не предусмотрено законодательством РФ.</p>
            
            <h3 className="text-lg font-bold mt-4">7. Отзыв согласия</h3>
            <p>Вы имеете право отозвать согласие путем направления уведомления:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Эл.почта: <a href="mailto:info@asiacargo.ru" className="text-brand-blue underline">info@asiacargo.ru</a></li>
              <li>Адрес: ул. Горбунова, д. 2, стр. 3, Москва, 121596</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">8. Меры по защите персональных данных</h3>
            <p>Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа.</p>
            
            <h3 className="text-lg font-bold mt-4">9. Контактная информация</h3>
            <p>По вопросам обработки персональных данных: <a href="mailto:info@asiacargo.ru" className="text-brand-blue underline">info@asiacargo.ru</a></p>
          </div>
          <Button onClick={() => setShowPrivacyModal(false)} className="mt-6 !bg-brand-blue hover:!bg-brand-blue/90">
            Принять
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactModal;
