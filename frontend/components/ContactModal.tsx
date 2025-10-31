'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = [
  { value: '1', label: 'Китай' },
  { value: '2', label: 'Турция' },
  { value: '3', label: 'ОАЭ' },
  { value: '4', label: 'Индия' },
  { value: '5', label: 'Корея' },
  { value: '6', label: 'Другая страна' },
];

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
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

    // Валидация обязательных полей
    if (!name || !phone || !country) {
      setErrorMessage('Пожалуйста, заполните имя, телефон и страну отправления');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    // Проверка согласия
    if (!agreed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 4000);
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
        
        // Отправка событий в аналитику
        if (typeof window !== 'undefined') {
          // Yandex Metrika
          if (typeof (window as any).ym !== 'undefined') {
            (window as any).ym((window as any).YANDEX_METRIKA_ID, 'reachGoal', 'form_submit');
          }
          // Google Analytics
          if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('event', 'form_submit', {
              event_category: 'conversion',
              event_label: 'Contact Form',
            });
          }
        }

        // Сброс формы
        setName('');
        setPhone('');
        setEmail('');
        setCountry('');
        setCargo('');
        setAgreed(false);

        // Закрытие через 3 секунды
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
      {/* Основное модальное окно */}
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
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
                  Я согласен с{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-brand-blue underline hover:text-brand-red"
                  >
                    политикой конфиденциальности
                  </button>{' '}
                  и{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-brand-blue underline hover:text-brand-red"
                  >
                    пользовательским соглашением
                  </button>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              {showWarning && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  Необходимо согласиться с политикой конфиденциальности
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

      {/* Модальное окно политики конфиденциальности */}
      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm">
            <p>Здесь текст вашей политики конфиденциальности...</p>
            <p>Можно загрузить из отдельного файла или компонента.</p>
          </div>
          <Button onClick={() => setShowPrivacyModal(false)} className="mt-4">
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
