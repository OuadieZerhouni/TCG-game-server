const mongoose = require('mongoose');
const Level = require('../models/Level'); // Adjust the import path as needed

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
 * Retrieve a level by its major and minor level number.
 * @param {string} levelInfo - The level info to retrieve.
 * @returns {Promise<Level|null>} The retrieved level or null if not found.
 * @throws {Error} If there is an error while retrieving the level.
 */
const findLevelByStringId = async (levelInfo) => {
    try {
        const {majorLevel, minorLevel} = levelInfo.split('-');
        const level = await Level.findOne({majorLevel, minorLevel}).populate('deck equipments');
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
        await Level.findByIdAndRemove(levelId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLevel,
    getLevelById,
    findLevelByStringId,
    updateLevelById,
    deleteLevelById,
};
