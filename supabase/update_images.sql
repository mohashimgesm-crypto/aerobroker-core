-- ════════════════════════════════════════════════════════════════
-- AeroBroker — استبدال الصور العشوائية بصور حقيقية من Wikimedia Commons
-- كل الروابط تم التحقق منها (HTTP 200, image/jpeg)
-- الصق هذا الملف كاملاً في Supabase SQL Editor وشغّله.
-- ════════════════════════════════════════════════════════════════

-- Pipistrel Virus SW 121 (3 صور)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/b/bd/Pipistrel_Virus_SW.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/AP_Pipistrel_Virus_SW_912_IS.JPG/1280px-AP_Pipistrel_Virus_SW_912_IS.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/3/39/Pipistrel_Virus_SW_Takeoff.jpg'
] where slug = 'pipistrel-virus-sw-121-2021';

-- Tecnam P2008 JC (2 صورة)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tecnam_P2008_JC_MkII_%28N512US%2C_cn_215%29_%2807-29-2023%29.jpg/1280px-Tecnam_P2008_JC_MkII_%28N512US%2C_cn_215%29_%2807-29-2023%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Antwerp_Tecnam_P2008_OO-KWO_01.jpg/1280px-Antwerp_Tecnam_P2008_OO-KWO_01.jpg'
] where slug = 'tecnam-p2008-jc-2019';

-- Flight Design CTLS (2 صورة)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flight_Design_CTLS_G-CONA_5D4_2751_%2832831658997%29.jpg/1280px-Flight_Design_CTLS_G-CONA_5D4_2751_%2832831658997%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flight_Design_CTLS_%286932146514%29.jpg/1280px-Flight_Design_CTLS_%286932146514%29.jpg'
] where slug = 'flight-design-ctls-2018';

-- ICON A5 (3 صور)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Icon_A5_in_the_water.jpg/1280px-Icon_A5_in_the_water.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ICON_A5_N924BA_at_Felts_Field.jpg/1280px-ICON_A5_N924BA_at_Felts_Field.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Icon_A5_in_wings-stowed_configuration.jpg/1280px-Icon_A5_in_wings-stowed_configuration.jpg'
] where slug = 'icon-a5-2020';

-- Robinson R44 Raven II (3 صور)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Robinson_R44_Raven_II_Bakoma.JPG/1280px-Robinson_R44_Raven_II_Bakoma.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Black_Robinson_R44.jpg/1280px-Black_Robinson_R44.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/%C5%9Amig%C5%82owiec%2C_Robinson_R44_Salt_Aviation.jpg/1280px-%C5%9Amig%C5%82owiec%2C_Robinson_R44_Salt_Aviation.jpg'
] where slug = 'robinson-r44-raven-ii-2017';

-- Guimbal Cabri G2 (2 صورة)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Guimbal_Cabri_G2_-_F-GRIL.jpg/1280px-Guimbal_Cabri_G2_-_F-GRIL.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Guimbal_Cabri_G2_%2828538717295%29.jpg/1280px-Guimbal_Cabri_G2_%2828538717295%29.jpg'
] where slug = 'guimbal-cabri-g2-2019';

-- TLD TPX-100 Pushback Tug — جرّار دفع طائرات (3 صور)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/38_Towbarless_pushback_tractor_for_aircraft_towing_-_airplane_pushback.jpg/1280px-38_Towbarless_pushback_tractor_for_aircraft_towing_-_airplane_pushback.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lektro_pushback%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0510%29.jpg/1280px-Lektro_pushback%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0510%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Regional_Express_pushback_tug_%27Green_8%27_at_Melbourne_Airport.jpg/1280px-Regional_Express_pushback_tug_%27Green_8%27_at_Melbourne_Airport.jpg'
] where slug = 'tld-tpx-100-pushback-tug-2016';

-- Guinault GA400 GPU — وحدة طاقة أرضية (3 صور)
update public.listings set images = array[
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Aircraft_Ground_Power_Unit_at_Wagga_Wagga_Airport.jpg/1280px-Aircraft_Ground_Power_Unit_at_Wagga_Wagga_Airport.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ground_power_unit_and_Belavia_aircraft_at_Minsk_National_Airport.jpg/1280px-Ground_power_unit_and_Belavia_aircraft_at_Minsk_National_Airport.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Luxair%2C_ground_power_unit-101.jpg/1280px-Luxair%2C_ground_power_unit-101.jpg'
] where slug = 'guinault-ga400-gpu-2018';
