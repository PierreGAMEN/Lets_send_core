-- Insertion de données dans la table 'company'
INSERT INTO company (email, password, name) VALUES 
('info@restaurant1.com', 'password123', 'Restaurant Le Gourmet'),
('contact@barcentral.com', 'password456', 'Bar Central'),
('hello@cafeparis.com', 'password789', 'Café de Paris');

-- Insertion de données dans la table 'product'
INSERT INTO product (company_id, name, description, image, price, type) VALUES 
(1, 'Pasta Carbonara', 'Delicious Italian pasta with a creamy sauce', 'carbonara.jpg', 12.99, 'Main'),
(1, 'Tiramisu', 'Classic Italian dessert with layers of mascarpone cheese and coffee', 'tiramisu.jpg', 6.50, 'Dessert'),
(2, 'Mojito', 'Refreshing cocktail with rum, mint, and lime', 'mojito.jpg', 8.00, 'Drink'),
(2, 'Pilsner Beer', 'Crisp and refreshing beer', 'pilsner.jpg', 5.00, 'Drink'),
(3, 'Croissant', 'Freshly baked butter croissant', 'croissant.jpg', 2.50, 'Other'),
(3, 'Espresso', 'Strong and rich espresso', 'espresso.jpg', 2.00, 'Drink');

-- Insertion de données dans la table 'restaurant_table'
INSERT INTO company_table (table_number, company_id) VALUES 
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(2, 3),
(3, 3);

-- Insertion de données dans la table de jointure 'product_table'
INSERT INTO order_table (product_id, table_id, status) VALUES 
(1, 1, 'to prepare'), -- Pasta Carbonara disponible à la table 1 du Restaurant Le Gourmet, statut à préparer
(2, 1, 'to prepare'), -- Tiramisu disponible à la table 1 du Restaurant Le Gourmet, statut à préparer
(3, 2, 'ready'),      -- Mojito disponible à la table 1 du Bar Central, statut prête
(4, 2, 'served'),     -- Pilsner Beer disponible à la table 1 du Bar Central, statut servie
(5, 4, 'to prepare'), -- Croissant disponible à la table 1 du Café de Paris, statut à préparer
(6, 4, 'to prepare'), -- Espresso disponible à la table 1 du Café de Paris, statut à préparer
(5, 5, 'ready'),      -- Croissant disponible à la table 2 du Café de Paris, statut prête
(6, 5, 'served');     -- Espresso disponible à la table 2 du Café de Paris, statut servie
