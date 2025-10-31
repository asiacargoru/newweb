import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const { name, phone, email, country, cargo } = data;
    
    if (!name || !phone || !country) {
      return NextResponse.json(
        { success: false, error: 'Не заполнены обязательные поля' },
        { status: 400 }
      );
    }

    const webhookUrl = 'https://asia-trans-cargo.bitrix24.ru/rest/15138/2mmepfh19xh2jc9k/crm.lead.add.json';
    
    // Преобразуем country в число
    const countryId = parseInt(country, 10);
    
    const postData = {
      fields: {
        TITLE: `Заявка с формы - ${name}`,
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
        EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : [],
        COMMENTS: cargo ? `Груз: ${cargo}` : '',
        UF_CRM_5D405553D5F19: countryId, // Преобразовано в число
        UF_CRM_1759480365637: 1,
      },
      params: { REGISTER_SONET_EVENT: 'Y' }
    };

    console.log('Отправка в Bitrix:', JSON.stringify(postData, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    
    console.log('Ответ Bitrix:', JSON.stringify(result, null, 2));

    if (result.result && result.result > 0) {
      return NextResponse.json({
        success: true,
        leadId: result.result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error_description || 'Ошибка создания лида в Bitrix24',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Ошибка API:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
