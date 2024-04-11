/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */

const mongoose = require('mongoose');
const Level = require('../model/Level'); 
const { populate } = require('../model/Deck');

/**
 * Create a new level.
 *
 * @param {Object} data - The data for the new level.
 * @returns {Promise<Level>} The created level.
 * @throws {Error} If there is an error while creating the level.
 */
const createLevel = async (data) => {
    try {
        const newLevel = new Level(data);
        await newLevel.save();
        return newLevel;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieve a level by its ID.
 *
 * @param {string} levelId - The ID of the level to retrieve.
 * @returns {Promise<Level|null>} The retrieved level or null if not found.
 * @throws {Error} If there is an error while retrieving the level.
 */
const getLevelById = async (levelId) => {
    try {
        const level = await Level.findById(levelId).populate('deck equipments');
        return level;
    } catch (error) {
        throw error;
    }
};

/**
 * getAllLevels
 * @returns {Promise<Level[]>} The retrieved levels.
 * @throws {Error} If there is an error while retrieving the levels.
 */
const getAllLevels = async () => {
    try {
        // populate the cards inside deck
        const levels = await Level.find()
            .populate('equipments deck')
            .populate({
                path: 'deck',
                populate: {
                    path: 'cards',
                    model: 'UserCard',
                },
            });
        return levels;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieve a level by its major and minor level number.
 * @param {string} levelInfo - The level info to retrieve.
 * @returns {Promise<Level|null>} The retrieved level or null if not found.
 * @throws {Error} If there is an error while retrieving the level.
 */
const findLevelByStringId = async (levelInfo) => {
    try {
        const majorLevel= levelInfo.split('-')[0];
        const minorLevel= levelInfo.split('-')[1];
        const level = await Level.findOne({majorLevel, minorLevel}).populate('deck equipments').populate({
            path: 'deck',
            populate: {
                path: 'cards',
                model: 'UserCard',
                populate : {
                    path: 'cardId',
                    model: 'Card'
                }
            }
        });
        return level;
    }
    catch (error) {
        throw error;
    }
}


/**
 * Update a level by its ID.
 *
 * @param {string} levelId - The ID of the level to update.
 * @param {Object} newData - The new data to update the level with.
 * @returns {Promise<Level|null>} The updated level or null if not found.
 * @throws {Error} If there is an error while updating the level.
 */
const updateLevelById = async (levelId, newData) => {
    try {
        const updatedLevel = await Level.findByIdAndUpdate(levelId, newData, { new: true });
        return updatedLevel;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a level by its ID.
 *
 * @param {string} levelId - The ID of the level to delete.
 * @throws {Error} If there is an error while deleting the level.
 */
const deleteLevelById = async (levelId) => {
    try {
        await Level.findByIdAndDelete(levelId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLevel,
    getAllLevels,
    getLevelById,
    findLevelByStringId,
    updateLevelById,
    deleteLevelById,
};
