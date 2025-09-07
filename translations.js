const translations = {
  en: {
    home_button: "Home",
    home: "Home",
    loading_message: "Loading...",
    // Index Page
    nra_client_tools: "NRA Client Tools",
    health_status_checker: "Health Status Checker",
    health_status_checker_desc: "Check your Bulgarian health insurance status.",
    tax_office_locator: "Tax Office Locator",
    tax_office_locator_desc:
      "Find National Revenue Agency (НАП) and Municipal Tax (МДТ) offices.",
    receipt_checker: "Receipt Checker",
    receipt_checker_desc:
      "Verify Bulgarian tax receipts by QR code or manual entry.",
    tax_calendar: "Tax Calendar",
    tax_calendar_desc:
      "View important Bulgarian tax deadlines and obligations.",
    company_vat_lookup: "Company/VAT Lookup",
    company_vat_lookup_desc:
      "Search for Bulgarian companies in the VAT registry.",

    // Health Page
    bulgarian_health_status_checker: "Bulgarian Health Status Checker",
    health_note:
      "Note: This tool connects to the Bulgarian National Revenue Agency's health status checking system. You need valid Bulgarian identification to use this service.",
    id_type: "ID Type:",
    egn: "EGN (Bulgarian Personal ID)",
    lnc: "LNC (Foreigner Personal Number)",
    bulstat: "BULSTAT (Company Number)",
    id_number: "ID Number:",
    enter_id_number: "Enter your ID number",
    birth_date: "Birth Date (DDMMYYYY):",
    birth_date_placeholder: "15011990",
    agree_processing:
      "I agree to the processing of my personal data for this inquiry",
    get_captcha: "Get Verification Code",
    enter_captcha_code: "Enter Captcha Code",
    captcha_code_label: "6-Digit Captcha Code:",
    captcha_code_placeholder: "123456",
    check_health_status: "Check Health Status",
    health_status_result: "Health Status Result",
    requesting_captcha: "Requesting captcha...",
    captcha_loaded:
      "Captcha loaded! Please enter the 6-digit code from the image.",
    server_error: "Server error: ",
    unexpected_response:
      "Unexpected response format. Check console for details.",
    network_error: "Network error: ",
    checking_health_status: "Checking health status...",
    health_check_complete: "Health status check completed!",
    error_prefix: "Error: ",
    id_number_error: "ID number must be 9, 10, or 13 digits",
    birth_date_error: "Birth date must be exactly 8 digits (DDMMYYYY)",
    agree_data_processing_error: "You must agree to data processing",
    captcha_code_error: "Please enter a 6-digit captcha code",
    no_challenge_token:
      "No challenge token available. Please request captcha first.",
    missing_periods: "Missing periods:",

    // Map Page
    bulgarian_tax_office_locator: "Bulgarian Tax Office Locator",
    map_note:
      "Find Tax Offices: Locate National Revenue Agency (НАП) offices and Municipal Tax offices (МДТ) throughout Bulgaria. Click on markers for contact information and directions.",
    office_type: "Office Type:",
    all_offices: "All Offices",
    nap_offices: "National Revenue Agency (НАП) Offices",
    mdt_offices: "Municipal Tax Offices (МДТ)",
    search_offices: "Search Offices:",
    search_by_city_or_name: "Search by city or office name",
    map_view: "Map View",
    list_view: "List View",
    loading_offices: "Loading office locations...",
    failed_to_load_offices: "Failed to load office locations",
    loaded_offices: "Loaded {0} office locations",
    showing_offices: "Showing {0} of {1} offices ({2} НАП, {3} МДТ)",
    no_offices_match: "No offices match your criteria.",
    show_on_map: "Show on Map",
    get_directions: "Get Directions",
    location_corrected: "⚠ Location corrected",

    // Receipt Page
    bulgarian_receipt_checker: "Bulgarian Receipt Checker",
    receipt_note:
      "About: This tool verifies Bulgarian tax receipts against the National Revenue Agency database. You can either scan a QR code or manually enter receipt details.",
    manual_entry: "Manual Entry",
    qr_scanner: "QR Scanner",
    fiscal_id: "Fiscal Memory Number / IASUTD ID:",
    fiscal_id_placeholder: "A1B2C3D4",
    doc_number: "Receipt Document Number:",
    doc_number_placeholder: "1234567",
    receipt_date: "Date (YYYY-MM-DD):",
    receipt_time: "Time (HH:MM):",
    amount: "Amount:",
    amount_placeholder: "25.50",
    check_receipt: "Check Receipt",
    camera_placeholder: "Camera will appear here when you start scanning",
    start_camera: "Start Camera",
    stop_camera: "Stop Camera",
    scanned_qr_data: "Scanned QR Data:",
    receipt_verification_result: "Receipt Verification Result",
    fill_all_fields: "Please fill in all fields",
    checking_receipt: "Checking receipt...",
    system_error: "System Error",
    try_again_later: "Please try again later.",
    receipt_not_found: "Receipt Not Found",
    merchant_info: "Merchant Information:",
    bulstat_eik: "BULSTAT/EIK:",
    company: "Company:",
    location: "Location:",
    address: "Address:",
    receipt_verified_successfully: "Receipt Verified Successfully",
    receipt_registered:
      "This receipt has been properly registered with the Bulgarian National Revenue Agency.",
    receipt_verification_failed: "Receipt verification failed",
    receipt_successfully_verified: "Receipt successfully verified!",
    qr_scanned_successfully:
      'QR code scanned successfully! Review the data and click "Check Receipt".',
    invalid_qr_format:
      "Invalid QR code format. Please scan a Bulgarian tax receipt QR code.",
    camera_started:
      "Camera started. Position a receipt QR code in front of the camera.",
    could_not_access_camera: "Could not access camera: ",
    qr_scanned_checking: "QR code scanned successfully! Checking receipt...",
    not_available: "N/A",

    // Tax Calendar Page
    bulgarian_tax_calendar: "Bulgarian Tax Calendar",
    tax_calendar_note:
      "Tax Deadlines: View important tax deadlines and obligations by law and month. This calendar shows deadlines from Bulgarian tax legislation.",
    tax_law: "Tax Law:",
    all_laws: "All Laws",
    vat_law: "VAT Law (Закон за ДДС)",
    personal_income_tax_law:
      "Personal Income Tax Law (Закон за данъците върху доходите на физическите лица)",
    corporate_income_tax_law:
      "Corporate Income Tax Law (Закон за корпоративното подоходно облагане)",
    local_taxes_and_fees_law:
      "Local Taxes and Fees Law (Закон за местните данъци и такси)",
    intra_community_trade_law:
      "Intra-Community Trade Statistics Law (Закон за статистика на вътрешнообщностната търговия със стоки)",
    regulation_h18: "Regulation № Н-18 from 13.12.2006",
    insurance_premium_tax_law:
      "Insurance Premium Tax Law (Закон за данък върху застрахователните премии)",
    month: "Month:",
    january: "January (Януари)",
    february: "February (Февруари)",
    march: "March (Март)",
    april: "April (Април)",
    may: "May (Май)",
    june: "June (Юни)",
    july: "July (Юли)",
    august: "August (Август)",
    september: "September (Септември)",
    october: "October (Октомври)",
    november: "November (Ноември)",
    december: "December (Декември)",
    show_tax_calendar: "Show Tax Calendar",
    loading_tax_calendar: "Loading tax calendar...",
    loading_tax_deadlines: "📅 Loading tax deadlines...",
    no_deadlines_found: "No tax deadlines found for the selected criteria.",
    error_loading_calendar: "Error loading calendar. Please try again.",
    calendar_loaded_no_deadlines: "Calendar loaded - no deadlines found",
    calendar_results: "Tax Calendar Results",
    showing_deadlines_for:
      "Showing deadlines for <strong>{0}</strong> in <strong>{1}</strong>",
    calendar_loaded_successfully: "Tax calendar loaded successfully",

    // VAT Page
    bulgarian_company_vat_lookup: "Bulgarian Company & VAT Lookup",
    vat_note:
      "Search Bulgarian Companies: Enter a BULSTAT number or company name to search the VAT registry. Minimum 5 characters required.",
    bulstat_or_company_name: "BULSTAT Number or Company Name:",
    enter_bulstat_or_company_name:
      "Enter BULSTAT or company name (min 5 characters)",
    search_companies: "Search Companies",
    enter_at_least_5_chars: "Please enter at least 5 characters",
    searching_companies: "Searching companies...",
    searching_database: "🔍 Searching Bulgarian company database...",
    search_failed: "Search failed",
    no_companies_found: '📋 No companies found matching "{0}"',
    search_completed_no_results: "Search completed - no results found",
    found_companies: "Found {0} companies:",
    found_one_company: "Found 1 company:",
    unknown_company: "Unknown Company",
    show_more: "Show More",
    show_less: "Show Less",
    vat_bulstat: "BULSTAT",
    vat_address: "Address",
    full_address: "Full Address:",
    vat_registration_date: "VAT Registration Date:",
    vat_deregistration_date: "VAT Deregistration Date:",
    corporate_registration_date: "Corporate Registration Date:",
    corporate_regime_effective_date: "Corporate Regime Effective Date:",
    corporate_deregistration_date: "Corporate Deregistration Date:",

    select_language: "Language:",
    theme: "Theme:",
    copyright: "© 2025 SintesLab. Licensed under the MIT License.",
    unofficial_disclaimer:
      "This software is unofficial and not affiliated with the National Revenue Agency (NRA).",
  },
  bg: {
    home_button: "Начало",
    home: "Начало",
    loading_message: "Зарежда...",
    // Index Page
    nra_client_tools: "Справка с НАП - Инструменти",
    health_status_checker: "Проверка на здравен статус",
    health_status_checker_desc: "Проверете здравноосигурителния си статус.",
    tax_office_locator: "Карта на офисите на НАП",
    tax_office_locator_desc:
      "Намерете офиси на Националната агенция за приходите (НАП) и общински данъчни служби (МДТ).",
    receipt_checker: "Проверка на касови бележки",
    receipt_checker_desc:
      "Проверете български данъчни касови бележки чрез QR код или ръчно въвеждане.",
    tax_calendar: "Данъчен календар",
    tax_calendar_desc:
      "Прегледайте важни български данъчни срокове и задължения.",
    company_vat_lookup: "Справка за фирми/ДДС",
    company_vat_lookup_desc: "Търсене на български фирми в регистъра по ДДС.",

    // Health Page
    bulgarian_health_status_checker: "Проверка на здравен статус",
    health_note:
      "Забележка: Този инструмент се свързва със системата за проверка на здравния статус на Националната агенция за приходите. За да използвате тази услуга, е необходима валидна българска идентификация.",
    id_type: "Тип идентификатор:",
    egn: "ЕГН (Единен граждански номер)",
    lnc: "ЛНЧ (Личен номер на чужденец)",
    bulstat: "БУЛСТАТ (Фирмен номер)",
    id_number: "Идентификационен номер:",
    enter_id_number: "Въведете своя идентификационен номер",
    birth_date: "Дата на раждане (ДДММГГГГ):",
    birth_date_placeholder: "15011990",
    agree_processing:
      "Съгласен съм с обработката на личните ми данни за тази справка",
    get_captcha: "Получи код за проверка",
    enter_captcha_code: "Въведете CAPTCHA кода",
    captcha_code_label: "6-цифрен CAPTCHA код:",
    captcha_code_placeholder: "123456",
    check_health_status: "Провери здравен статус",
    health_status_result: "Резултат от проверката",
    requesting_captcha: "Заявяване на captcha...",
    captcha_loaded:
      "Captcha е заредена! Моля, въведете 6-цифрения код от изображението.",
    server_error: "Грешка от сървъра: ",
    unexpected_response:
      "Неочакван формат на отговора. Проверете конзолата за детайли.",
    network_error: "Мрежова грешка: ",
    checking_health_status: "Проверка на здравния статус...",
    health_check_complete: "Проверката на здравния статус е завършена!",
    error_prefix: "Грешка: ",
    id_number_error: "Идентификационният номер трябва да е 9, 10 или 13 цифри",
    birth_date_error: "Датата на раждане трябва да е точно 8 цифри (ДДММГГГГ)",
    agree_data_processing_error:
      "Трябва да се съгласите с обработката на данни",
    captcha_code_error: "Моля, въведете 6-цифрен captcha код",
    no_challenge_token:
      "Няма наличен challenge token. Моля, първо заявете captcha.",
    missing_periods: "Липсващи периоди:",

    // Map Page
    bulgarian_tax_office_locator: "Локатор на данъчни служби в България",
    map_note:
      "Намерете данъчни служби: Намерете офиси на Националната агенция за приходите (НАП) и общински данъчни служби (МДТ) в цяла България. Кликнете върху маркерите за информация за контакт и упътвания.",
    office_type: "Тип офис:",
    all_offices: "Всички офиси",
    nap_offices: "Офиси на НАП",
    mdt_offices: "Общински данъчни служби (МДТ)",
    search_offices: "Търсене на офиси:",
    search_by_city_or_name: "Търсене по град или име на офис",
    map_view: "Карта",
    list_view: "Списък",
    loading_offices: "Зареждане на местоположенията на офисите...",
    failed_to_load_offices:
      "Неуспешно зареждане на местоположенията на офисите",
    loaded_offices: "Заредени са {0} местоположения на офиси",
    showing_offices: "Показани са {0} от {1} офиса ({2} НАП, {3} МДТ)",
    no_offices_match: "Няма офиси, които да отговарят на вашите критерии.",
    show_on_map: "Покажи на картата",
    get_directions: "Получаване на упътвания",
    location_corrected: "⚠ Местоположението е коригирано",

    // Receipt Page
    bulgarian_receipt_checker: "Проверка на български касови бележки",
    receipt_note:
      "Относно: Този инструмент проверява български данъчни касови беleжки в базата данни на Националната агенция за приходите. Можете да сканирате QR код или ръчно да въведете данните от касовата бележка.",
    manual_entry: "Ръчно въвеждане",
    qr_scanner: "QR скенер",
    fiscal_id: "Номер на фискална памет / ID на СУПТО:",
    fiscal_id_placeholder: "A1B2C3D4",
    doc_number: "Номер на документа на касовата бележка:",
    doc_number_placeholder: "1234567",
    receipt_date: "Дата (ГГГГ-ММ-ДД):",
    receipt_time: "Час (ЧЧ:ММ):",
    amount: "Сума:",
    amount_placeholder: "25.50",
    check_receipt: "Провери касовата бележка",
    camera_placeholder:
      "Камерата ще се появи тук, когато започнете сканирането",
    start_camera: "Стартирай камерата",
    stop_camera: "Спри камерата",
    scanned_qr_data: "Сканирани данни от QR код:",
    receipt_verification_result: "Резултат от проверката на касовата бележка",
    fill_all_fields: "Моля, попълнете всички полета",
    checking_receipt: "Проверка на касовата бележка...",
    system_error: "Системна грешка",
    try_again_later: "Моля, опитайте отново по-късно.",
    receipt_not_found: "Касовата бележка не е намерена",
    merchant_info: "Информация за търговеца:",
    bulstat_eik: "БУЛСТАТ/ЕИК:",
    company: "Фирма:",
    location: "Местоположение:",
    address: "Адрес:",
    receipt_verified_successfully: "Касовата бележка е проверена успешно",
    receipt_registered:
      "Тази касова бележка е надлежно регистрирана в Националната агенция за приходите.",
    receipt_verification_failed: "Проверката на касовата бележка е неуспешна",
    receipt_successfully_verified: "Касовата бележка е проверена успешно!",
    qr_scanned_successfully:
      'QR кодът е сканиран успешно! Прегледайте данните и натиснете "Провери касовата бележка".',
    invalid_qr_format:
      "Невалиден формат на QR кода. Моля, сканирайте QR код от българска данъчна касова бележка.",
    camera_started:
      "Камерата е стартирана. Позиционирайте QR код от касова бележка пред камерата.",
    could_not_access_camera: "Няма достъп до камерата: ",
    qr_scanned_checking:
      "QR кодът е сканиран успешно! Проверка на касовата бележка...",
    not_available: "няма данни",

    // Tax Calendar Page
    bulgarian_tax_calendar: "Данъчен календар на България",
    tax_calendar_note:
      "Данъчни срокове: Прегледайте важни данъчни срокове и задължения по закон и месец. Този календар показва срокове от българското данъчно законодателство.",
    tax_law: "Данъчен закон:",
    all_laws: "Всички закони",
    vat_law: "Закон за ДДС",
    personal_income_tax_law:
      "Закон за данъците върху доходите на физическите лица",
    corporate_income_tax_law: "Закон за корпоративното подоходно облагане",
    local_taxes_and_fees_law: "Закон за местните данъци и такси",
    intra_community_trade_law:
      "Закон за статистика на вътрешнообщностната търговия със стоки",
    regulation_h18: "Наредба № Н-18 от 13.12.2006 г.",
    insurance_premium_tax_law: "Закон за данък върху застрахователните премии",
    month: "Месец:",
    january: "Януари",
    february: "Февруари",
    march: "Март",
    april: "Април",
    may: "Май",
    june: "Юни",
    july: "Юли",
    august: "Август",
    september: "Септември",
    october: "Октомври",
    november: "Ноември",
    december: "Декември",
    show_tax_calendar: "Покажи данъчен календар",
    loading_tax_calendar: "Зареждане на данъчния календар...",
    loading_tax_deadlines: "📅 Зареждане на данъчните срокове...",
    no_deadlines_found: "Няма намерени данъчни срокове за избраните критерии.",
    error_loading_calendar:
      "Грешка при зареждане на календара. Моля, опитайте отново.",
    calendar_loaded_no_deadlines:
      "Календарът е зареден - няма намерени срокове",
    calendar_results: "Резултати от данъчния календар",
    showing_deadlines_for:
      "Показани са срокове за <strong>{0}</strong> през <strong>{1}</strong>",
    calendar_loaded_successfully: "Данъчният календар е зареден успешно",

    // VAT Page
    bulgarian_company_vat_lookup: "Справка за фирми и ДДС в България",
    vat_note:
      "Търсене на български фирми: Въведете номер по БУЛСТАТ или име на фирма, за да търсите в регистъра по ДДС. Необходими са минимум 5 символа.",
    bulstat_or_company_name: "Номер по БУЛСТАТ или име на фирма:",
    enter_bulstat_or_company_name:
      "Въведете БУЛСТАТ или име на фирма (мин. 5 символа)",
    search_companies: "Търсене на фирми",
    enter_at_least_5_chars: "Моля, въведете поне 5 символа",
    searching_companies: "Търсене на фирми...",
    searching_database: "🔍 Търсене в българската база данни за фирми...",
    search_failed: "Търсенето е неуспешно",
    no_companies_found: '📋 Няма намерени фирми, съответстващи на "{0}"',
    search_completed_no_results:
      "Търсенето е завършено - няма намерени резултати",
    found_companies: "Намерени са {0} фирми:",
    found_one_company: "Намерена е 1 фирма:",
    unknown_company: "Неизвестна фирма",
    show_more: "Покажи повече",
    show_less: "Покажи по-малко",
    vat_bulstat: "БУЛСТАТ",
    vat_address: "Адрес",
    full_address: "Пълен адрес:",
    vat_registration_date: "Дата на регистрация по ДДС:",
    vat_deregistration_date: "Дата на дерегистрация по ДДС:",
    corporate_registration_date: "Дата на корпоративна регистрация:",
    corporate_regime_effective_date:
      "Дата на влизане в сила на корпоративния режим:",
    corporate_deregistration_date: "Дата на корпоративна дерегистрация:",

    select_language: "Език:",
    theme: "Тема:",
    copyright: "© 2025 SintesLab. Лицензирано под MIT лиценз.",
    unofficial_disclaimer:
      "Този софтуер е неофициален и не е свързан с Националната агенция за приходите (НАП).",
  },
};
