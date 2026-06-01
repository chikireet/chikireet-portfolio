import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, listId } = body;

  if (!email || !name) {
    return { success: false, error: 'Missing name or email' };
  }

  // Получаем ключ через конфиг Nuxt
  const config = useRuntimeConfig();
  const apiKey = config.brevoApiKey;

  // Защита от дурака: если ключ всё ещё не подтянулся, скажем об этом
  if (!apiKey) {
    console.error('CRITICAL: Brevo API key is missing in runtime config!');
    return { success: false, error: 'Server configuration error' };
  }

  // Если listId передан, используем его, иначе оставляем дефолтный [2]
  const targetLists = listId ? [Number(listId)] : [2];

  try {
    // Отправляем контакт в базу Brevo
    await $fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey, // Теперь ключ точно есть
        'content-type': 'application/json'
      },
      body: {
        email: email,
        attributes: {
          FIRSTNAME: name 
        },
        listIds: targetLists,
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
