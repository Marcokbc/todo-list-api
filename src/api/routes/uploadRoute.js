const express = require("express");
const router = express.Router();
const { upload } = require("../../config/cloudinaryConfig");
const {
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/authMiddleware");
const User = require("../models/User");
const uploadController = require("../controller/uploadController");

/**
 * @swagger
 * /upload/{userId}:
 *   post:
 *     summary: Faz o upload de uma imagem para um usuário
 *     description: Envia uma imagem vinculada ao usuário especificado. A imagem deve ser enviada no corpo da requisição como form-data.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID do usuário para quem a imagem será enviada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem a ser enviada
 *     responses:
 *       200:
 *         description: Imagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Imagem enviada com sucesso"
 *                 imageUrl:
 *                   type: string
 *                   example: "https://example.com/images/filename.jpg"
 *       400:
 *         description: Erro na requisição, parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Parâmetros inválidos"
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido ou inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao processar a imagem"
 */

router.post(
  "/upload/:userId",
  isAuthenticated,
  upload.single("image"),
  uploadController.uploadImage
);

module.exports = router;
