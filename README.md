# gestion-recettes-backend

Cette API permet de gérer des recettes de cuisine, incluant la création, la lecture, la mise à jour et la suppression des recettes (opérations CRUD). L'API utilise une base de données MySQL pour stocker les recettes, et inclut des validations des données grâce à express-validator.

## Prérequis

- Node.js (version 14+ recommandée)
- MySQL (version 5.7+)
- Postman (pour les tester de l'API)
- Docker (pour la containerisation)

# Installation

1. Cloner le projet :

```bash
git clone https://github.com/shyshasy/gestion-recettes-backend.git
```

```bash
cd API_gestion_recette
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer la base de données :

- Mettre à jour les informations de connexion à la base de données (hôte, utilisateur, mot de passe, nom de la base de données).

4. Initialiser la base de données :

- Créez une base de données MySQL et assurez-vous que la table recipes existe avec la structure suivante :

```bash
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type TEXT NOT NULL,
  ingredients NOT NULL
);
```

5. Démarrer le serveur :

```bash
npm start
```

## Endpoints de l'API

1. Récupérer toutes les recettes

- URL : /recipes
- Méthode : GET
- Description : Renvoie la liste de toutes les recettes.
- Exemple de réponse :

[
{
"id": 1,
 
  "title": "Titre de la recette",
  "type": "entrèe",
  "ingredients": "piment",
 
  }
{
"id": 2,
 
  "title": "Titre de la recette",
  "type": "entrèe",
  "ingredients": "piment",
 
  }
]

2. Récupérer une recette par ID

- URL : /recipes/:id
- Méthode : GET
- Paramètres : id (Requis, entier)
- Description : Renvoie une recette spécifique par son ID.
- Exemple de réponse :
  {
  "id": 1,
  "title": "Lasagnes",

  "type": "entrèe",
  "ingredients": "piment",
  }

3. Créer une nouvelle recette

- URL : /recipes
- Méthode : POST
- Corps :
  {
  "title": "Titre de la recette",
  "type": "entrèe",
  "ingredients": "piment",
 
  }

4.  Mettre à jour une recette

- URL : /recipes/:id
- Méthode : PUT
- Paramètres : id (Requis, entier)
- Corps :

 {
  "title": "Titre de la recette",
  "type": "entrèe",
  "ingredients": "piment",
 
  }

- Exemple de réponse :

{
"message": "Recipe updated successfully"
}

5. Supprimer une recette

- URL : /recipes/:id
- Méthode : DELETE
- Paramètres : id (Requis, entier)
- Description : Supprime une recette spécifique par son ID.
- Exemple de réponse :

{
"message": "Recipe deleted successfully"
}

### Codes de Statut HTTP

- 200 OK : La requête a été traitée avec succès.
- 201 Created : Une nouvelle ressource a été créée.
- 400 Bad Request : Les données fournies ne sont pas valides.
- 404 Not Found : La ressource demandée n'a pas été trouvée.
- 500 Internal Server Error : Une erreur serveur est survenue.

## Lancer l'application

```bash
npm start
```

## Les étapes pour construire et lancer le conteneur Docker:

```bash
docker compose up 
```

```bash
docker exec -it gestion_recettes mysql -u root -p
```

## Execusion des tests unitaire

```bash
npm test
```

# Auteur

[Aichetou Taher Sy ](https://github.com/shyshasy)
