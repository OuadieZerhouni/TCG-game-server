const levelService = require('../services/levelService'); // Import your level service
const deckService = require('../services/deckService'); // Import your deck service

/**
 * Get a list of all levels.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const getAllLevels = async (req, res) => {
  try {
    const levels = await levelService.getAllLevels();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' + error});
  }
};

/**
 * Get a level by ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const getLevelById = async (req, res) => {
  const levelId = req.params.levelId;
  try {
    const level = await levelService.getLevelById(levelId);
    if (!level) {
      res.status(404).json({ error: 'Level not found' });
    } else {
      res.status(200).json(level);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' + error});
  }
};

/**
 * Create a new level.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const createLevel = async (req, res) => {
  const levelData = req.body;
  try {
    // create anb empty deck for the level
    const deck = await deckService.createDeck({cards: [], totalPower: 0});
    levelData.deck = deck._id;
    const newLevel = await levelService.createLevel(levelData);
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
};

/**
 * Update a level by ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const updateLevel = async (req, res) => {
  const levelId = req.params.levelId;
  const newData = req.body;
  try {
    const updatedLevel = await levelService.updateLevelById(levelId, newData);
    if (!updatedLevel) {
      res.status(404).json({ error: 'Level not found' });
    } else {
      res.status(200).json(updatedLevel);
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
};

/**
 * Delete a level by ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const deleteLevel = async (req, res) => {
  const levelId = req.params.levelId;
  try {
    await levelService.deleteLevelById(levelId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Level not found : ' + error });
    }
};

module.exports = {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
};
