import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Добавляем listId, который прилетит с фронтенда
  const { name, email, listId } = body;

  if (!email || !name) {
    return { success: false, error: 'Missing name or email' };
  }

  const apiKey = process.env.BREVO_API_KEY;

  // Если listId передан, используем его, иначе оставляем дефолтный [2]
  const targetLists = listId ? [Number(listId)] : [2];

  try {
    // Отправляем контакт в базу Brevo
    await $fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey || '',
        'content-type': 'application/json'
      },
      body: {
        email: email,
        attributes: {
          FIRSTNAME: name 
        },
        listIds: targetLists, // Теперь здесь динамический массив
        updateEnabled: true 
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Brevo API Error:', error.data || error);
    return { 
      success: false, 
      error: error.data?.message || 'Internal Server Error' 
    };
  }
});