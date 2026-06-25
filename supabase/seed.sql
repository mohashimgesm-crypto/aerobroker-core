-- ════════════════════════════════════════════════════════════════
-- AeroBroker — بيانات تجريبية واقعية (8 إعلانات)
-- الصور حقيقية من Wikimedia Commons (روابط مستقرة، تم التحقق منها)
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
  array['https://upload.wikimedia.org/wikipedia/commons/b/bd/Pipistrel_Virus_SW.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/AP_Pipistrel_Virus_SW_912_IS.JPG/1280px-AP_Pipistrel_Virus_SW_912_IS.JPG','https://upload.wikimedia.org/wikipedia/commons/3/39/Pipistrel_Virus_SW_Takeoff.jpg'],
  'active'
),
(
  'tecnam-p2008-jc-2019', 'ultralight', 'Tecnam', 'P2008 JC', 2019, 138000, true, false,
  540, 'Rotax 912 S2', 232, 1110, 650, 2,
  'Good', 'Italy', 'Capua', 380.00,
  'تكنام P2008 بهيكل مركّب وجناح معدني، مثالية لمدارس الطيران. مزوّدة بشاشات Garmin G3X.',
  'Tecnam P2008 with composite fuselage and metal wing, ideal for flight schools. Equipped with Garmin G3X avionics.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tecnam_P2008_JC_MkII_%28N512US%2C_cn_215%29_%2807-29-2023%29.jpg/1280px-Tecnam_P2008_JC_MkII_%28N512US%2C_cn_215%29_%2807-29-2023%29.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Antwerp_Tecnam_P2008_OO-KWO_01.jpg/1280px-Antwerp_Tecnam_P2008_OO-KWO_01.jpg'],
  'active'
),
(
  'flight-design-ctls-2018', 'ultralight', 'Flight Design', 'CTLS', 2018, 119000, true, true,
  690, 'Rotax 912 ULS', 220, 1500, 600, 2,
  'Good', 'Germany', 'Stuttgart', 350.00,
  'CTLS خفيفة الوزن بمدى طيران كبير ومقصورة واسعة. مظلّة طوارئ بالباراشوت مثبّتة.',
  'Lightweight CTLS with long range and a roomy cabin. Equipped with a whole-airframe ballistic parachute.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flight_Design_CTLS_G-CONA_5D4_2751_%2832831658997%29.jpg/1280px-Flight_Design_CTLS_G-CONA_5D4_2751_%2832831658997%29.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flight_Design_CTLS_%286932146514%29.jpg/1280px-Flight_Design_CTLS_%286932146514%29.jpg'],
  'active'
),
(
  'icon-a5-2020', 'ultralight', 'ICON', 'A5', 2020, 389000, true, false,
  180, 'Rotax 912 iS', 175, 760, 686, 2,
  'Excellent', 'United States', 'Vacaville', 460.00,
  'طائرة برمائية رياضية بأجنحة قابلة للطي، مثالية للمغامرات على الماء واليابسة. حالة ممتازة كالجديدة.',
  'Amphibious sport aircraft with folding wings, perfect for water and land adventures. Excellent, like-new condition.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Icon_A5_in_the_water.jpg/1280px-Icon_A5_in_the_water.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ICON_A5_N924BA_at_Felts_Field.jpg/1280px-ICON_A5_N924BA_at_Felts_Field.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Icon_A5_in_wings-stowed_configuration.jpg/1280px-Icon_A5_in_wings-stowed_configuration.jpg'],
  'active'
),
-- ── مروحيات (helicopter) ───────────────────────────────────────
(
  'robinson-r44-raven-ii-2017', 'helicopter', 'Robinson', 'R44 Raven II', 2017, 465000, true, true,
  1250, 'Lycoming IO-540', 240, 560, 1134, 4,
  'Good', 'United States', 'Torrance', 700.00,
  'مروحية R44 رافن II بأربعة مقاعد، الأكثر شيوعاً عالمياً. محرك حديث ضمن ساعات التشغيل الموصى بها.',
  'Four-seat R44 Raven II, the world''s most popular piston helicopter. Engine well within recommended TBO hours.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Robinson_R44_Raven_II_Bakoma.JPG/1280px-Robinson_R44_Raven_II_Bakoma.JPG','https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Black_Robinson_R44.jpg/1280px-Black_Robinson_R44.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/%C5%9Amig%C5%82owiec%2C_Robinson_R44_Salt_Aviation.jpg/1280px-%C5%9Amig%C5%82owiec%2C_Robinson_R44_Salt_Aviation.jpg'],
  'active'
),
(
  'guimbal-cabri-g2-2019', 'helicopter', 'Guimbal', 'Cabri G2', 2019, 410000, false, true,
  820, 'Lycoming O-360', 185, 700, 700, 2,
  'Excellent', 'France', 'Aix-en-Provence', 650.00,
  'مروحية تدريب بمقعدين بمعايير أمان عالية ودوّار خلفي مغلق (Fenestron). سجل صيانة كامل.',
  'Two-seat training helicopter with high safety standards and a shrouded Fenestron tail rotor. Full maintenance log.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Guimbal_Cabri_G2_-_F-GRIL.jpg/1280px-Guimbal_Cabri_G2_-_F-GRIL.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Guimbal_Cabri_G2_%2828538717295%29.jpg/1280px-Guimbal_Cabri_G2_%2828538717295%29.jpg'],
  'active'
),
-- ── معدّات طيران (machinery) ───────────────────────────────────
(
  'tld-tpx-100-pushback-tug-2016', 'machinery', 'TLD', 'TPX-100 Pushback Tug', 2016, 78000, true, true,
  null, null, null, null, null, null,
  'Good', 'France', 'Saint-Lin', 4200.00,
  'جرّار دفع للطائرات بدون قضيب جر (towbarless)، يناسب طائرات الطيران العام والإقليمي. تشغيل موثوق.',
  'Towbarless aircraft pushback tug suitable for general aviation and regional aircraft. Reliable operation.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/38_Towbarless_pushback_tractor_for_aircraft_towing_-_airplane_pushback.jpg/1280px-38_Towbarless_pushback_tractor_for_aircraft_towing_-_airplane_pushback.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lektro_pushback%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0510%29.jpg/1280px-Lektro_pushback%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0510%29.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Regional_Express_pushback_tug_%27Green_8%27_at_Melbourne_Airport.jpg/1280px-Regional_Express_pushback_tug_%27Green_8%27_at_Melbourne_Airport.jpg'],
  'active'
),
(
  'guinault-ga400-gpu-2018', 'machinery', 'Guinault', 'GA400 CA6 GPU', 2018, 42000, true, false,
  null, null, null, null, null, null,
  'Excellent', 'United Arab Emirates', 'Dubai', 1800.00,
  'وحدة طاقة أرضية (GPU) بقدرة 400 هرتز لتزويد الطائرات بالطاقة أثناء التوقف. صيانة دورية موثّقة.',
  '400 Hz Ground Power Unit (GPU) for supplying aircraft with power while parked. Documented periodic maintenance.',
  array['https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Aircraft_Ground_Power_Unit_at_Wagga_Wagga_Airport.jpg/1280px-Aircraft_Ground_Power_Unit_at_Wagga_Wagga_Airport.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ground_power_unit_and_Belavia_aircraft_at_Minsk_National_Airport.jpg/1280px-Ground_power_unit_and_Belavia_aircraft_at_Minsk_National_Airport.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Luxair%2C_ground_power_unit-101.jpg/1280px-Luxair%2C_ground_power_unit-101.jpg'],
  'active'
);
