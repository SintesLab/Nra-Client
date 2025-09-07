# NRA Client

Уеб приложение за справки със системата на НАП с отворен код. Този Progressive Web App (PWA) предоставя лесен достъп до различни български данъчни и административни услуги.

## Функционалности

### Проверка на здравен статус
- Проверка на здравноосигурителния статус
- Поддръжка за ЕГН, ЛНЧ и БУЛСТАТ идентификация
- CAPTCHA система за верификация
- Проверка в реално време с показване на липсващи периоди

### Карта на офисите на НАП
- Интерактивна карта с офиси на НАП и общински данъчни служби
- Търсене по град или име на офис
- Контактна информация и упътвания
- Режими за карта и списък
- Корекция на координати за неточни местоположения

### Проверка на касови бележки
- Верификация на български данъчни касови бележки срещу базата данни на НАП
- Сканиране на QR код с камера
- Ръчно въвеждане на данни от касовата бележка
- Показване на информация за търговеца
- Поддръжка за различни формати на касови бележки

### Данъчен календар
- Преглед на важни български данъчни срокове
- Филтриране по данъчен закон и месец
- Множество категории данъчни закони (ДДС, данък върху доходите, корпоративен данък и др.)
- Приоритизиране на срокове (спешни/предстоящи)

### Справка за фирми/ДДС
- Търсене на български фирми в регистъра по ДДС
- Търсене по номер БУЛСТАТ или име на фирма
- Подробна информация за фирмата
- Дати на регистрация и дерегистрация

## Инсталация и разгръщане

### Изисквания
- Docker и Docker Compose
- HTTPS сертификат (необходим за PWA функционалността в продукция)

### Бърза настройка

1. **Клониране на хранилището:**
   ```bash
   git clone https://github.com/SintesLab/Nra-Client.git
   cd Nra-Client
   ```

2. **Създаване на nginx.conf файл:**
   ```bash
   # Създайте директория за nginx конфигурацията
   mkdir -p nginx-config
   # Копирайте nginx конфигурацията от README в nginx.conf файл
   ```

3. **Стартиране с Docker Compose:**
   ```bash
   # Редактирайте docker-compose.yml с вашите пътища
   docker-compose up -d
   ```

4. **Достъп до приложението:**
   - Отворете браузъра си и отидете на `http://localhost:8080`
   - Приложението ще се регистрира автоматично като PWA

### Инсталация на PWA
- **Desktop:** Кликнете върху бутона за инсталация в адресната лента на браузъра
- **Mobile:** Използвайте "Добави в началния екран" от менюто на браузъра
- **iOS:** Safari → Сподели → Добави в началния екран
- **Android:** Chrome → Меню → Добави в началния екран

## Nginx конфигурация

Ето препоръчителната nginx конфигурация за Docker разгръщане с Cloudflare Tunnels или други reverse proxy като Caddy:

```nginx
server {
    listen 80;
    server_name _;  # Приема всички домейни
    root /usr/share/nginx/html;
    index index.html;

    # Скриване на версията на nginx в error страниците и response headers
    server_tokens off;

    # Основни сигурностни настройки
    client_max_body_size 1k;

    # HTTPS пренасочване (за reverse proxy като Cloudflare Tunnels/Caddy)
    if ($http_x_forwarded_proto != "https") {
        return 301 https://$server_name$request_uri;
    }

    # API proxy за NRA Mobile услуги
    location /api/ {
        # Блокиране на ботове от API endpoints
        if ($http_user_agent ~* (bot|crawler|spider|scrapy|wget|curl|python|java|ruby|perl|scanner|hack|attack|exploit)) {
            return 403 'API access not permitted for automated clients';
        }

        # Разрешаване само на POST и OPTIONS за тези APIs
        if ($request_method !~ ^(POST|OPTIONS)$) {
            return 405 'Method not allowed';
        }

        # Блокиране на заявки не от този домейн (за reverse proxy)
        # if ($http_referer !~* ^https?://(www\.)?yourdomain\.com) {
        #     return 403 'Access denied';
        # }

        resolver 8.8.8.8;

        proxy_pass https://nramobile.nra.bg;
        proxy_ssl_server_name on;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;

        # Защита от timeout на заявките
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;

        proxy_set_header Host nramobile.nra.bg;
        proxy_set_header Origin "https://nramobile.nra.bg";
        proxy_set_header Referer "https://nramobile.nra.bg/";
        proxy_set_header Content-Type 'application/x-www-form-urlencoded';
        proxy_set_header User-Agent 'NRA-Client/1.0';
        proxy_set_header Accept 'application/json, text/plain, */*';

        # Сигурностни headers за клиента
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # CORS headers за клиента (заменете с вашия домейн)
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Methods' 'POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Accept' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        # Обработка на preflight заявки
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '$http_origin';
            add_header 'Access-Control-Allow-Methods' 'POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Accept';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }

    # Обслужване на manifest файлове с конкретен MIME тип
    location = /manifest.json {
        default_type application/manifest+json;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Скриване на .html разширението и обслужване на файлове
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Пренасочване на URLs с .html към версия без .html
    if ($request_uri ~ ^/(.*)\.html$) {
        return 301 /$1;
    }
}
```

### Docker Compose пример

```yaml
services:
  nginx:
    restart: unless-stopped
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - /path/to/your/nra-client:/usr/share/nginx/html:ro
      - /path/to/your/nginx/config:/etc/nginx/conf.d:ro
```

## Функции и технологии

### Progressive Web App (PWA)
- **Инсталируемо:** Добавяне в началния екран на мобилни и десктоп устройства
- **Адаптивно:** Работи на всички размери на устройства
- **Без кеширане:** Service worker изчиства всички данни за поверителност
- **Винаги свежи данни:** Всички заявки се извършват в реално време

### Интернационализация
- **Двуезична поддръжка:** Български и английски
- **Динамично превключване на език:** Превод в реално време
- **Локализирано съдържание:** Всички UI елементи са преведени

### Модерен UI/UX
- **Тъмна/светла тема:** Автоматично превключване на тема
- **Адаптивен дизайн:** Mobile-first подход
- **Достъпност:** ARIA етикети и навигация с клавиатура
- **Модерно стилизиране:** CSS променливи и плавни анимации

### Сигурностни функции
- **Защита от ботове:** Блокира автоматизирани заявки
- **CORS конфигурация:** Сигурни cross-origin заявки
- **Сигурностни заглавия:** Изчерпателни сигурностни заглавия
- **Валидация на вход:** Валидация от страна на клиента и сървъра

## Поддръжка на браузъри

- **Chrome/Edge:** Пълна PWA поддръжка
- **Firefox:** Пълна функционалност
- **Safari:** Пълна функционалност (iOS 11.3+)
- **Мобилни браузъри:** Оптимизирано за мобилна употреба

## Разработка

### Локална разработка
```bash
# Стартиране с локален сървър (необходимо за PWA)
python -m http.server 8000
# или
npx serve .
```

### Структура на файловете
```
nra-client/
├── index.html          # Главна страница на приложението
├── health.html         # Проверка на здравен статус
├── map.html           # Карта на офисите на НАП
├── receipt.html       # Проверка на касови бележки
├── taxcal.html        # Данъчен календар
├── vat.html          # Справка за фирми/ДДС
├── style.css         # Основен стил
├── translations.js   # Интернационализация
├── language.js       # Управление на език
├── theme.js         # Управление на тема
├── service-worker.js # PWA service worker
├── manifest.json    # PWA манифест
└── assets/         # Изображения и икони
```

## Важни бележки

### Правно отказване от отговорност
Този софтуер е **неофициален** и **не е свързан** с Националната агенция за приходите (НАП). Използвайте на свой риск.

### Поверителност на данните
- Никакви лични данни не се съхраняват локално
- Всички заявки отиват директно към сървърите на НАП
- Service worker изчиства всички данни при активиране
- Няма проследяване или аналитика

### Изисквания
- Валидна българска идентификация (ЕГН, ЛНЧ, БУЛСТАТ)
- Интернет връзка
- Модерен уеб браузър с включен JavaScript

## Принос

Приносите са добре дошли! Моля, не се колебайте да изпратите Pull Request.

### Насоки за разработка
1. Следвайте съществуващия стил на кода
2. Тествайте на множество браузъри
3. Осигурете мобилна адаптивност
4. Обновете преводите за нови функции

## Лиценз

Този проект е лицензиран под MIT лиценз - вижте файла [LICENSE](LICENSE) за подробности.

## Благодарности

- Национална агенция за приходите за предоставянето на публичните API
- OpenStreetMap за данните от картите
- Leaflet.js за функционалността на картите
- HTML5-QRCode за сканирането на QR кодове

