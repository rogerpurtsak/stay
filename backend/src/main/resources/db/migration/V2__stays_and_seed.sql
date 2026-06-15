-- Update stays table schema
ALTER TABLE stays RENAME COLUMN location TO location_name;
ALTER TABLE stays RENAME COLUMN price_per_night TO price_from;
ALTER TABLE stays DROP COLUMN image_url;
ALTER TABLE stays ADD COLUMN rating NUMERIC(3, 1);
ALTER TABLE stays ADD COLUMN description TEXT;
ALTER TABLE stays ADD COLUMN vibe_tags TEXT;

-- Create stay_images table
CREATE TABLE stay_images (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stay_id    UUID NOT NULL REFERENCES stays(id) ON DELETE CASCADE,
    image_url  TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- Seed stays
INSERT INTO stays (id, name, location_name, latitude, longitude, price_from, rating, description, booking_url, vibe_tags) VALUES

-- City
('00000000-0000-0000-0000-000000000001', 'Le Marais Boutique Hotel', 'Paris, France', 48.8566, 2.3522, 180, 4.7, 'Stylish hotel in the heart of Le Marais, steps from galleries and bistros.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000002', 'Gothic Quarter Loft', 'Barcelona, Spain', 41.3851, 2.1734, 140, 4.5, 'Spacious loft in the historic Gothic Quarter with rooftop terrace.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000003', 'Canal House Amsterdam', 'Amsterdam, Netherlands', 52.3676, 4.9041, 210, 4.8, 'Historic 17th-century canal house with authentic Dutch interiors.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000004', 'Old Town Residence', 'Prague, Czech Republic', 50.0755, 14.4378, 120, 4.6, 'Elegant apartment overlooking Prague Old Town Square.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000005', 'Ring Hotel Vienna', 'Vienna, Austria', 48.2082, 16.3738, 195, 4.7, 'Grand hotel on the famous Ringstrasse, near opera and museums.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000006', 'Alfama Guest House', 'Lisbon, Portugal', 38.7195, -9.1331, 110, 4.4, 'Cosy guesthouse in the ancient Alfama district with city views.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000007', 'Trastevere Apartment', 'Rome, Italy', 41.8891, 12.4695, 160, 4.6, 'Charming apartment in bohemian Trastevere, minutes from the Colosseum.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000008', 'Mitte Design Hotel', 'Berlin, Germany', 52.5200, 13.4050, 130, 4.5, 'Minimalist design hotel in central Berlin, close to Museum Island.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000009', 'Andrássy Suite', 'Budapest, Hungary', 47.4979, 19.0402, 100, 4.6, 'Luxurious suite on Andrássy Avenue, Budapest''s finest boulevard.', 'https://booking.com', 'City'),
('00000000-0000-0000-0000-000000000010', 'Nyhavn View', 'Copenhagen, Denmark', 55.6761, 12.5683, 220, 4.8, 'Modern apartment overlooking the iconic colourful Nyhavn harbour.', 'https://booking.com', 'City'),

-- Beach
('00000000-0000-0000-0000-000000000011', 'Marbella Beach Villa', 'Marbella, Spain', 36.5099, -4.8827, 350, 4.9, 'Private villa with infinity pool and direct beach access.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000012', 'Oia Cliffside Suite', 'Santorini, Greece', 36.4618, 25.3753, 420, 4.9, 'Iconic cave suite carved into the caldera cliffs with sunset views.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000013', 'Old Town Sea View', 'Dubrovnik, Croatia', 42.6507, 18.0944, 280, 4.8, 'Stone apartment inside the medieval walls with Adriatic views.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000014', 'Amalfi Terrace', 'Amalfi, Italy', 40.6340, 14.6027, 310, 4.7, 'Cliffside hotel with lemon-scented terraces above the Amalfi Coast.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000015', 'Lagos Surf House', 'Lagos, Portugal', 37.1026, -8.6753, 90, 4.3, 'Relaxed surf hostel a short walk from Praia Dona Ana beach.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000016', 'Rhodes Harbour Hotel', 'Rhodes, Greece', 36.4341, 28.2176, 150, 4.5, 'Boutique hotel in the medieval harbour town of Rhodes.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000017', 'Split Marina Suite', 'Split, Croatia', 43.5081, 16.4402, 170, 4.6, 'Modern suite with balcony overlooking Split marina and Diocletian''s Palace.', 'https://booking.com', 'Beach'),
('00000000-0000-0000-0000-000000000018', 'Mykonos Windmill View', 'Mykonos, Greece', 37.4444, 25.3289, 380, 4.8, 'Whitewashed villa with private pool, overlooking the famous windmills.', 'https://booking.com', 'Beach'),

-- Nature
('00000000-0000-0000-0000-000000000019', 'Bavarian Forest Lodge', 'Berchtesgaden, Germany', 47.6316, 13.0010, 145, 4.7, 'Timber lodge surrounded by Alpine forest, near Königssee lake.', 'https://booking.com', 'Nature'),
('00000000-0000-0000-0000-000000000020', 'Black Forest Treehouse', 'Freiburg, Germany', 47.9990, 7.8421, 200, 4.9, 'Unique treehouse stay nestled in the Black Forest canopy.', 'https://booking.com', 'Nature'),
('00000000-0000-0000-0000-000000000021', 'Highland Retreat', 'Inverness, Scotland', 57.4778, -4.2247, 160, 4.6, 'Remote stone cottage by a Highland loch, perfect for hiking.', 'https://booking.com', 'Nature'),
('00000000-0000-0000-0000-000000000022', 'Tuscan Farmhouse', 'Siena, Italy', 43.3187, 11.3307, 190, 4.8, 'Restored 16th-century farmhouse amid cypress trees and olive groves.', 'https://booking.com', 'Nature,Countryside'),
('00000000-0000-0000-0000-000000000023', 'Norwegian Fjord Cabin', 'Flåm, Norway', 60.8632, 7.1197, 240, 4.9, 'Glass-walled cabin perched above Sognefjord with northern lights potential.', 'https://booking.com', 'Nature'),
('00000000-0000-0000-0000-000000000024', 'Forest Eco-Lodge', 'Bovec, Slovenia', 46.3392, 13.5531, 110, 4.5, 'Sustainable lodge at the edge of Triglav National Park.', 'https://booking.com', 'Nature'),

-- Mountains
('00000000-0000-0000-0000-000000000025', 'Chamonix Alpine Chalet', 'Chamonix, France', 45.9237, 6.8694, 290, 4.8, 'Ski-in ski-out chalet with Mont Blanc views and spa access.', 'https://booking.com', 'Mountains'),
('00000000-0000-0000-0000-000000000026', 'Innsbruck Mountain Suite', 'Innsbruck, Austria', 47.2692, 11.4041, 175, 4.6, 'Alpine suite in the heart of Innsbruck with panoramic mountain views.', 'https://booking.com', 'Mountains'),
('00000000-0000-0000-0000-000000000027', 'Zermatt Ski Lodge', 'Zermatt, Switzerland', 46.0207, 7.7491, 450, 4.9, 'Luxury car-free ski lodge with direct Matterhorn views.', 'https://booking.com', 'Mountains'),
('00000000-0000-0000-0000-000000000028', 'Bansko Ski Chalet', 'Bansko, Bulgaria', 41.8357, 23.4882, 80, 4.4, 'Cosy ski chalet near the lifts with traditional Bulgarian decor.', 'https://booking.com', 'Mountains'),
('00000000-0000-0000-0000-000000000029', 'Swiss Valley View', 'Interlaken, Switzerland', 46.6863, 7.8632, 260, 4.7, 'Classic Swiss hotel between two Alpine lakes with Eiger views.', 'https://booking.com', 'Mountains'),
('00000000-0000-0000-0000-000000000030', 'Dolomites Stone House', 'Cortina d''Ampezzo, Italy', 46.5404, 12.1357, 320, 4.8, 'Traditional stone house surrounded by dramatic Dolomite peaks.', 'https://booking.com', 'Mountains'),

-- Countryside
('00000000-0000-0000-0000-000000000031', 'Provence Lavender Farm', 'Gordes, France', 43.9126, 5.2009, 220, 4.8, 'Mas provençal farmhouse amid lavender fields and vineyards.', 'https://booking.com', 'Countryside'),
('00000000-0000-0000-0000-000000000032', 'Tuscany Vineyard Estate', 'Greve in Chianti, Italy', 43.5847, 11.3147, 270, 4.9, 'Estate in the Chianti wine region with cellar tours and pool.', 'https://booking.com', 'Countryside'),
('00000000-0000-0000-0000-000000000033', 'Cotswolds Country House', 'Bourton-on-the-Water, England', 51.8837, -1.7585, 185, 4.7, 'Quintessential honey-stone cottage in the heart of the Cotswolds.', 'https://booking.com', 'Countryside'),
('00000000-0000-0000-0000-000000000034', 'Douro Valley Quinta', 'Pinhão, Portugal', 41.1832, -7.5424, 150, 4.6, 'Wine estate perched above terraced Douro vineyards with river views.', 'https://booking.com', 'Countryside'),
('00000000-0000-0000-0000-000000000035', 'Normandy Manor House', 'Bayeux, France', 49.2765, -0.7024, 165, 4.5, 'Elegant Norman manor with apple orchards and farm-to-table breakfast.', 'https://booking.com', 'Countryside'),
('00000000-0000-0000-0000-000000000036', 'Umbrian Hilltop Villa', 'Perugia, Italy', 43.1107, 12.3908, 195, 4.7, 'Hilltop villa above the Umbrian valley with pool and olive press.', 'https://booking.com', 'Countryside'),

-- Any / Mixed
('00000000-0000-0000-0000-000000000037', 'Lake Como Villa', 'Como, Italy', 45.8079, 9.0852, 380, 4.9, 'Iconic lakeside villa with private dock, gardens, and mountain backdrop.', 'https://booking.com', 'Nature,Countryside'),
('00000000-0000-0000-0000-000000000038', 'Lake Bled House', 'Bled, Slovenia', 46.3683, 14.1144, 175, 4.8, 'Lakeside house with direct view of Bled Island and Julian Alps.', 'https://booking.com', 'Nature,Mountains'),
('00000000-0000-0000-0000-000000000039', 'Hvar Island House', 'Hvar, Croatia', 43.1726, 16.4412, 220, 4.7, 'Stone house on the lavender island of Hvar with sea-view terrace.', 'https://booking.com', 'Beach,Countryside'),
('00000000-0000-0000-0000-000000000040', 'Alsace Wine Village', 'Colmar, France', 48.0794, 7.3590, 130, 4.6, 'Half-timbered house in the fairy-tale Alsatian wine village of Colmar.', 'https://booking.com', 'City,Countryside');

-- Seed stay_images (2 images per stay)
INSERT INTO stay_images (stay_id, image_url, sort_order) VALUES
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1555990538-c56a4e939018?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000017', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000017', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000018', 'https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000018', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000019', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000019', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000020', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000020', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000021', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000021', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000022', 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000022', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000023', 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000023', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000024', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000024', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000025', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000025', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000026', 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000026', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000027', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000027', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000028', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000028', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000029', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000029', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000030', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000030', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000031', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000031', 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000032', 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000032', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000033', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000033', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000034', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000034', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000035', 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000035', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000036', 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000036', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000037', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000037', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000038', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000038', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000039', 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000039', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', 1),
('00000000-0000-0000-0000-000000000040', 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop', 0),
('00000000-0000-0000-0000-000000000040', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop', 1);
