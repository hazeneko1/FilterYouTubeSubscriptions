// Función para extraer el número de suscriptores
function extractSubscriberCount(element) {
  const text = element.textContent.trim();
  const match = text.match(/(\d+)\s+suscriptores/);
  return match ? parseInt(match[1], 10) : null;
}

// Seleccionar todos los canales de la página
const channelElements = document.querySelectorAll('ytd-channel-renderer');

// Procesar cada canal
const channelsUnder1000 = Array.from(channelElements)
  .map(channel => {
    const subscriberElement = channel.querySelector('#video-count.style-scope.ytd-channel-renderer');
    const nameElement = channel.querySelector('#text.style-scope.ytd-channel-name');
    
    const subscribers = subscriberElement ? extractSubscriberCount(subscriberElement) : null;
    const name = nameElement ? nameElement.textContent.trim() : 'Nombre no disponible';
    
    return {
      element: channel,
      name: name,
      subscribers: subscribers
    };
  })
  .filter(channel => channel.subscribers !== null && channel.subscribers < 1000);

// Mostrar resultados en una tabla bonita en la consola
console.log(`%cCanales con menos de 1000 suscriptores: ${channelsUnder1000.length}`, 'color: green; font-weight: bold;');

// Crear tabla
console.table(channelsUnder1000.map(channel => ({
  'Nombre del canal': channel.name,
  'Suscriptores': channel.subscribers,
  'Elemento': channel.element
})), ['Nombre del canal', 'Suscriptores']);

// Devolver el array para uso posterior
channelsUnder1000;
