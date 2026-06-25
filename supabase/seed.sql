-- ════════════════════════════════════════════════════════════════
-- AeroBroker — بيانات تجريبية واقعية (8 إعلانات)
-- الصور من picsum.photos (ثابتة عبر seed) لأغراض العرض فقط
-- ════════════════════════════════════════════════════════════════

insert into public.listings (
  slug, category, make, model, year, price_usd, price_visible, negotiable,
  flying_hours, engine_model, max_speed_kmh, range_km, mtow_kg, seats,
  condition, country, city, shipping_weight_kg, description_ar, description_en, images, status
) values
-- ── طائرات فوق خفيفة (ultralight) ──────────────────────────────
(
  'pipistrel-virus-sw-121-2021', 'ultralight', 'Pipistrel', 'Virus SW 121', 2021, 165000, true, true,
  320, 'Rotax 912 ULS', 245, 1000, 600, 2,
  'Excellent', 'Slovenia', 'Ajdovščina', 360.00,
  'طائرة فوق خفيفة بمقعدين، اقتصادية في الاستهلاك وممتازة للتدريب والرحلات الطويلة. ساعات طيران قليلة وصيانة موثقة بالكامل.',
  'Two-seat ultralight, fuel-efficient and excellent for training and cross-country flights. Low airframe hours with full maintenance records.',
  array['https://picsum.photos/seed/pipistrel-virus-1/800/600','https://picsum.photos/seed/pipistrel-virus-2/800/600','https://picsum.photos/seed/pipistrel-virus-3/800/600'],
  'active'
),
(
  'tecnam-p2008-jc-2019', 'ultralight', 'Tecnam', 'P2008 JC', 2019, 138000, true, false,
  540, 'Rotax 912 S2', 232, 1110, 650, 2,
  'Good', 'Italy', 'Capua', 380.00,
  'تكنام P2008 بهيكل مركّب وجناح معدني، مثالية لمدارس الطيران. مزوّدة بشاشات Garmin G3X.',
  'Tecnam P2008 with composite fuselage and metal wing, ideal for flight schools. Equipped with Garmin G3X avionics.',
  array['https://picsum.photos/seed/tecnam-p2008-1/800/600','https://picsum.photos/seed/tecnam-p2008-2/800/600'],
  'active'
),
(
  'flight-design-ctls-2018', 'ultralight', 'Flight Design', 'CTLS', 2018, 119000, true, true,
  690, 'Rotax 912 ULS', 220, 1500, 600, 2,
  'Good', 'Germany', 'Stuttgart', 350.00,
  'CTLS خفيفة الوزن بمدى طيران كبير ومقصورة واسعة. مظلّة طوارئ بالباراشوت مثبّتة.',
  'Lightweight CTLS with long range and a roomy cabin. Equipped with a whole-airframe ballistic parachute.',
  array['https://picsum.photos/seed/ctls-1/800/600','https://picsum.photos/seed/ctls-2/800/600','https://picsum.photos/seed/ctls-3/800/600'],
  'active'
),
(
  'icon-a5-2020', 'ultralight', 'ICON', 'A5', 2020, 389000, true, false,
  180, 'Rotax 912 iS', 175, 760, 686, 2,
  'Excellent', 'United States', 'Vacaville', 460.00,
  'طائرة برمائية رياضية بأجنحة قابلة للطي، مثالية للمغامرات على الماء واليابسة. حالة ممتازة كالجديدة.',
  'Amphibious sport aircraft with folding wings, perfect for water and land adventures. Excellent, like-new condition.',
  array['https://picsum.photos/seed/icon-a5-1/800/600','https://picsum.photos/seed/icon-a5-2/800/600'],
  'active'
),
-- ── مروحيات (helicopter) ───────────────────────────────────────
(
  'robinson-r44-raven-ii-2017', 'helicopter', 'Robinson', 'R44 Raven II', 2017, 465000, true, true,
  1250, 'Lycoming IO-540', 240, 560, 1134, 4,
  'Good', 'United States', 'Torrance', 700.00,
  'مروحية R44 رافن II بأربعة مقاعد، الأكثر شيوعاً عالمياً. محرك حديث ضمن ساعات التشغيل الموصى بها.',
  'Four-seat R44 Raven II, the world''s most popular piston helicopter. Engine well within recommended TBO hours.',
  array['https://picsum.photos/seed/r44-1/800/600','https://picsum.photos/seed/r44-2/800/600','https://picsum.photos/seed/r44-3/800/600'],
  'active'
),
(
  'guimbal-cabri-g2-2019', 'helicopter', 'Guimbal', 'Cabri G2', 2019, 410000, false, true,
  820, 'Lycoming O-360', 185, 700, 700, 2,
  'Excellent', 'France', 'Aix-en-Provence', 650.00,
  'مروحية تدريب بمقعدين بمعايير أمان عالية ودوّار خلفي مغلق (Fenestron). سجل صيانة كامل.',
  'Two-seat training helicopter with high safety standards and a shrouded Fenestron tail rotor. Full maintenance log.',
  array['https://picsum.photos/seed/cabri-1/800/600','https://picsum.photos/seed/cabri-2/800/600'],
  'active'
),
-- ── معدّات طيران (machinery) ───────────────────────────────────
(
  'tld-tpx-100-pushback-tug-2016', 'machinery', 'TLD', 'TPX-100 Pushback Tug', 2016, 78000, true, true,
  null, null, null, null, null, null,
  'Good', 'France', 'Saint-Lin', 4200.00,
  'جرّار دفع للطائرات بدون قضيب جر (towbarless)، يناسب طائرات الطيران العام والإقليمي. تشغيل موثوق.',
  'Towbarless aircraft pushback tug suitable for general aviation and regional aircraft. Reliable operation.',
  array['https://picsum.photos/seed/tld-tug-1/800/600','https://picsum.photos/seed/tld-tug-2/800/600'],
  'active'
),
(
  'guinault-ga400-gpu-2018', 'machinery', 'Guinault', 'GA400 CA6 GPU', 2018, 42000, true, false,
  null, null, null, null, null, null,
  'Excellent', 'United Arab Emirates', 'Dubai', 1800.00,
  'وحدة طاقة أرضية (GPU) بقدرة 400 هرتز لتزويد الطائرات بالطاقة أثناء التوقف. صيانة دورية موثّقة.',
  '400 Hz Ground Power Unit (GPU) for supplying aircraft with power while parked. Documented periodic maintenance.',
  array['https://picsum.photos/seed/guinault-gpu-1/800/600','https://picsum.photos/seed/guinault-gpu-2/800/600'],
  'active'
);
