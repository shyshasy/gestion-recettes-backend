# API de Gestion des Recettes

## Endpoints

### 1. Récupérer toutes les recettes
   - **URL**: `/recipes`
   - **Méthode**: `GET`
   - **Réponse**: Liste des recettes.

### 2. Récupérer une recette par ID
   - **URL**: `/recipes/:id`
   - **Méthode**: `GET`
   - **Paramètres**: `id` (Requis)
   - **Réponse**: Détails d'une recette.

### 3. Créer une nouvelle recette
   - **URL**: `/recipes`
   - **Méthode**: `POST`
   - **Corps**: 
     ```json
     {
       "title": "Titre",
       "description": "Description",
       "date": "YYYY-MM-DD"
     }
     ```
   - **Réponse**: Nouvelle recette créée.

### 4. Mettre à jour une recette
   - **URL**: `/recipes/:id`
   - **Méthode**: `PUT`
   - **Paramètres**: `id` (Requis)
   - **Corps**: 
     ```json
     {
       "title": "Titre mis à jour",
       "description": "Description mise à jour",
       "date": "YYYY-MM-DD"
     }
     ```
   - **Réponse**: Recette mise à jour.

### 5. Supprimer une recette
   - **URL**: `/recipes/:id`
   - **Méthode**: `DELETE`
   - **Paramètres**: `id` (Requis)
   - **Réponse**: Recette supprimée.

---

## Codes de statut
- `200 OK`: Succès.
- `201 Créé`: Recette créée.
- `404 Non trouvé`: Recette non trouvée.
- `500 Erreur interne du serveur`: Problème serveur.

---

## Instructions
1. Installer les dépendances : `npm install`.
2. Configurer la base de données dans `config/db.js`.
3. Démarrer le serveur : `npm start`.
