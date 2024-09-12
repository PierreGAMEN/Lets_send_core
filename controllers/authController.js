const { Users } = require("../models");
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Contrôleur pour obtenir un utilisateur spécifique par nom d'utilisateur, mot de passe, et ID de l'entreprise
const getUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Rechercher l'utilisateur par nom d'utilisateur
    const user = await Users.findOne({
      where: { username },
    });

    // Si l'utilisateur est trouvé, comparer le mot de passe fourni avec le mot de passe haché
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Créer un token JWT
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            right: user.user_right,
            company_id: user.company_id,
          },
          secretKey,
          { expiresIn: "1h" } // Token valide pendant 1 heure
        );

        // Envoyer le token dans un cookie
        res.cookie("authToken", token, {
          httpOnly: false, // Empêche l'accès au cookie via JavaScript côté client
          secure: process.env.NODE_ENV === "production", // Active la sécurité en production
          maxAge: 3600000, // 1 heure en millisecondes
          sameSite: "Lax", // Protéger contre CSRF
        });

        // Envoyer les informations de l'utilisateur
        res.json({
          username: user.username,
          right: user.user_right,
          company_id: user.company_id,
          id: user.id
        });
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAllUsersByCompany = async (req, res) => {
  const { company_id, user_id } = req.body; // user_id correspond à l'ID de l'utilisateur à exclure
  console.log(company_id)
  console.log(user_id)
  try {
    const users = await Users.findAll({
      where: {
        company_id: company_id,
        id: { [Op.ne]: user_id } // Exclut l'utilisateur avec cet ID
      }
    });
    console.log(users)
    
    if (users) {
      res.status(201).json(users);
      
    } else {
      res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const createUser = async (req, res) => {
  const { username, role, company_id, password } = req.body;

  try {
    // Vérifier si le nom d'utilisateur existe déjà dans la même entreprise
    const existingUser = await Users.findOne({
      where: { username, company_id },
    });

    if (existingUser) {
      console.log("Utilisateur existant trouvé:", existingUser);
      return res.status(400).json({
        message: "Cet utilisateur existe déjà dans cette entreprise.",
      });
    }

    // Hacher le mot de passe avec bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const newUser = await Users.create({
      company_id,
      user_right: role,
      password: hashedPassword,
      username,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à mettre à jour
  const { username, role, company_id, password } = req.body;

  try {
    // Rechercher l'utilisateur par ID
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations utilisateur
    user.username = username || user.username;
    user.user_right = role || user.user_right;
    user.company_id = company_id || user.company_id;

    // Si un nouveau mot de passe est fourni, le hacher avant de le mettre à jour
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Sauvegarder les modifications dans la base de données
    await user.save();

    res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à supprimer

  try {
    // Rechercher l'utilisateur par ID
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Supprimer l'utilisateur
    await user.destroy();

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getUser,
  getAllUsersByCompany,
  createUser,
  updateUser,
  deleteUser,
};
